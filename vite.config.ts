import path from 'path';
import { fileURLToPath } from 'node:url';
import type { IncomingMessage } from 'http';
import type { Connect } from 'vite';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { processImageEdit } from './lib/processImageEdit';

const rootDir = path.dirname(fileURLToPath(import.meta.url));

function readRawBody(req: IncomingMessage, maxBytes = 14 * 1024 * 1024): Promise<string> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    let total = 0;
    req.on('data', (c: Buffer) => {
      total += c.length;
      if (total > maxBytes) {
        reject(new Error('Body too large'));
        req.destroy();
        return;
      }
      chunks.push(c);
    });
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    req.on('error', reject);
  });
}

function localImageEditMiddleware(apiKey: string | undefined): Connect.NextHandleFunction {
  return async (req, res, next) => {
    const url = req.url?.split('?')[0] ?? '';
    if (url !== '/api/image-edit') {
      return next();
    }

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
      res.statusCode = 204;
      res.end();
      return;
    }

    if (req.method !== 'POST') {
      res.statusCode = 405;
      res.setHeader('Allow', 'POST, OPTIONS');
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.end(JSON.stringify({ error: 'Method not allowed' }));
      return;
    }

    let raw: string;
    try {
      raw = await readRawBody(req);
    } catch {
      res.statusCode = 413;
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.end(JSON.stringify({ error: 'Request body too large' }));
      return;
    }

    let parsed: unknown;
    try {
      parsed = JSON.parse(raw);
    } catch {
      res.statusCode = 400;
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.end(JSON.stringify({ error: 'Invalid JSON body' }));
      return;
    }

    const result = await processImageEdit(parsed, apiKey);
    if (result.ok === false) {
      res.statusCode = result.status;
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.end(JSON.stringify(result.json));
      return;
    }

    res.statusCode = 200;
    res.setHeader('Content-Type', result.contentType);
    res.setHeader('Cache-Control', 'no-store');
    res.end(result.buffer);
  };
}

function sendJson(
  res: Parameters<Connect.NextHandleFunction>[1],
  status: number,
  body: unknown
) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.end(JSON.stringify(body));
}

function buildCosmeticPrompt(body: Record<string, unknown>) {
  const context = Array.isArray(body.contextSnippets)
    ? body.contextSnippets.slice(0, 8).join('\n\n---\n\n')
    : '';
  const recommendations = Array.isArray(body.recommendations)
    ? body.recommendations
        .slice(0, 3)
        .map((item: any, index: number) => `${index + 1}. ${item.title} - $${item.price}; ${item.reason || ''}`)
        .join('\n')
    : '';

  return `
你是一个专业美妆推荐助手。请用中文回答。
根据用户问题、识别出的面部特征、RAG 检索知识和候选商品，给出完整、实用、不要省略号截断的建议。

用户问题：
${body.query || ''}

识别特征：
${JSON.stringify(body.profile || {}, null, 2)}

RAG 知识：
${context}

候选商品：
${recommendations}

回答结构：
1. 先直接回答用户问题。
2. 说明匹配逻辑。
3. 简要解释 3 个推荐商品为什么适合。
`.trim();
}

function localCosmeticChatMiddleware(
  apiKey: string | undefined,
  model: string
): Connect.NextHandleFunction {
  return async (req, res, next) => {
    const url = req.url?.split('?')[0] ?? '';
    if (url !== '/api/cosmetic-chat') {
      return next();
    }

    if (req.method === 'OPTIONS') {
      res.statusCode = 204;
      res.end();
      return;
    }

    if (req.method !== 'POST') {
      sendJson(res, 405, { error: 'Method not allowed' });
      return;
    }

    if (!apiKey) {
      sendJson(res, 501, { error: 'DASHSCOPE_API_KEY is not configured' });
      return;
    }

    let parsed: Record<string, unknown>;
    try {
      parsed = JSON.parse(await readRawBody(req));
    } catch {
      sendJson(res, 400, { error: 'Invalid JSON body' });
      return;
    }

    try {
      const llmRes = await fetch('https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model,
          messages: [
            { role: 'system', content: '你是一个专业、可靠、实用的美妆顾问。' },
            { role: 'user', content: buildCosmeticPrompt(parsed) },
          ],
          temperature: 0.4,
        }),
      });

      const data = await llmRes.json().catch(async () => ({ raw: await llmRes.text() }));
      if (!llmRes.ok) {
        sendJson(res, llmRes.status, {
          error: 'DashScope request failed',
          status: llmRes.status,
          details: JSON.stringify(data).slice(0, 800),
        });
        return;
      }

      const answer = data?.choices?.[0]?.message?.content;
      sendJson(res, 200, {
        answer: typeof answer === 'string' ? answer : '',
        provider: 'dashscope-qwen',
        model,
      });
    } catch (error) {
      sendJson(res, 504, {
        error: 'DashScope request timed out or failed',
        details: error instanceof Error ? error.message : 'Request failed',
      });
    }
  };
}

export default defineConfig(({ mode }) => {
  const fileEnv = loadEnv(mode, rootDir, '');
  const apiKey =
    (fileEnv.STABILITY_API_KEY || process.env.STABILITY_API_KEY || '')
      .trim() || undefined;
  const dashscopeApiKey =
    (fileEnv.DASHSCOPE_API_KEY || process.env.DASHSCOPE_API_KEY || '')
      .trim() || undefined;
  const dashscopeModel =
    (fileEnv.DASHSCOPE_MODEL || process.env.DASHSCOPE_MODEL || 'qwen3-max')
      .trim();

  return {
    server: {
      port: 3000,
      host: '0.0.0.0',
    },
    plugins: [
      react(),
      {
        name: 'local-image-edit-api',
        configureServer(server) {
          server.middlewares.use(localImageEditMiddleware(apiKey));
          server.middlewares.use(localCosmeticChatMiddleware(dashscopeApiKey, dashscopeModel));
        },
      },
    ],
    resolve: {
      alias: {
        '@': rootDir,
      },
    },
  };
});

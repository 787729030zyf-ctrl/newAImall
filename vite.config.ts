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

export default defineConfig(({ mode }) => {
  const fileEnv = loadEnv(mode, rootDir, 'STABILITY_');
  const apiKey =
    (fileEnv.STABILITY_API_KEY || process.env.STABILITY_API_KEY || '')
      .trim() || undefined;

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

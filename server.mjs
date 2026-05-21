import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(rootDir, 'dist');
const port = Number(process.env.PORT || 3000);

const STABILITY_URL = 'https://api.stability.ai/v2beta/stable-image/generate/sd3';
const STABILITY_INPAINT_URL = 'https://api.stability.ai/v2beta/stable-image/edit/inpaint';

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
};

function sendJson(res, status, body) {
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  });
  res.end(JSON.stringify(body));
}

function readRawBody(req, maxBytes = 14 * 1024 * 1024) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let total = 0;

    req.on('data', (chunk) => {
      total += chunk.length;
      if (total > maxBytes) {
        reject(new Error('Request body too large'));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    req.on('error', reject);
  });
}

async function loadImageBuffer(imageInput) {
  const trimmed = String(imageInput || '').trim();
  if (trimmed.startsWith('data:')) {
    const match = trimmed.match(/^data:([^;]+);base64,(.+)$/);
    if (!match) throw new Error('Invalid data URL');
    return { buffer: Buffer.from(match[2], 'base64'), mime: match[1] };
  }

  if (trimmed.startsWith('https://')) {
    const response = await fetch(trimmed);
    if (!response.ok) throw new Error(`Failed to fetch image: HTTP ${response.status}`);
    return {
      buffer: Buffer.from(await response.arrayBuffer()),
      mime: response.headers.get('content-type')?.split(';')[0]?.trim() || 'image/jpeg',
    };
  }

  if (trimmed.startsWith('http://')) {
    throw new Error('Only HTTPS image URLs are allowed');
  }

  return { buffer: Buffer.from(trimmed, 'base64'), mime: 'image/jpeg' };
}

async function processImageEdit(body, apiKey) {
  if (!apiKey) {
    return {
      ok: false,
      status: 500,
      json: { error: 'STABILITY_API_KEY is not configured on the server' },
    };
  }

  let originalImage;
  let maskImage;
  let editPrompt;
  let negativePrompt;
  let strength;

  try {
    const parsed = typeof body === 'string' ? JSON.parse(body) : body;
    originalImage = parsed?.original_image;
    maskImage = typeof parsed?.mask_image === 'string' && parsed.mask_image.trim()
      ? parsed.mask_image
      : undefined;
    editPrompt = typeof parsed?.edit_prompt === 'string' ? parsed.edit_prompt.trim() : '';
    negativePrompt = typeof parsed?.negative_prompt === 'string' ? parsed.negative_prompt.trim() : undefined;
    strength = parsed?.strength;
  } catch {
    return { ok: false, status: 400, json: { error: 'Invalid JSON body' } };
  }

  if (!originalImage || !editPrompt) {
    return {
      ok: false,
      status: 400,
      json: { error: 'original_image and edit_prompt are required' },
    };
  }

  const strengthValue =
    typeof strength === 'number' && !Number.isNaN(strength)
      ? Math.min(1, Math.max(0, strength))
      : 0.55;

  let image;
  let mask;
  try {
    image = await loadImageBuffer(originalImage);
    if (maskImage) mask = await loadImageBuffer(maskImage);
  } catch (error) {
    return {
      ok: false,
      status: 400,
      json: { error: error instanceof Error ? error.message : 'Invalid image' },
    };
  }

  if (image.buffer.length > 15 * 1024 * 1024) {
    return { ok: false, status: 400, json: { error: 'Image too large (max ~15 MB)' } };
  }
  if (mask && mask.buffer.length > 8 * 1024 * 1024) {
    return { ok: false, status: 400, json: { error: 'Mask image too large (max ~8 MB)' } };
  }

  const imageExt = image.mime.includes('png')
    ? 'png'
    : image.mime.includes('webp')
      ? 'webp'
      : 'jpg';
  const form = new FormData();
  form.append('image', new Blob([image.buffer], { type: image.mime || 'image/jpeg' }), `input.${imageExt}`);
  form.append('prompt', editPrompt);
  form.append('output_format', 'png');

  if (negativePrompt) form.append('negative_prompt', negativePrompt);

  if (mask) {
    const maskExt = mask.mime.includes('webp')
      ? 'webp'
      : mask.mime.includes('jpg') || mask.mime.includes('jpeg')
        ? 'jpg'
        : 'png';
    form.append('mask', new Blob([mask.buffer], { type: mask.mime || 'image/png' }), `mask.${maskExt}`);
  } else {
    form.append('mode', 'image-to-image');
    form.append('strength', String(strengthValue));
  }

  const controller = new AbortController();
  const kill = setTimeout(() => controller.abort(), 90_000);
  let stabilityResponse;
  try {
    stabilityResponse = await fetch(mask ? STABILITY_INPAINT_URL : STABILITY_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        Accept: 'image/*',
      },
      body: form,
      signal: controller.signal,
    });
  } catch (error) {
    clearTimeout(kill);
    return {
      ok: false,
      status: 504,
      json: {
        error: 'Stability request timed out or failed',
        details: error instanceof Error ? error.message : 'Request failed',
      },
    };
  } finally {
    clearTimeout(kill);
  }

  if (!stabilityResponse.ok) {
    const details = await stabilityResponse.text();
    console.error('Stability error', stabilityResponse.status, details);
    return {
      ok: false,
      status:
        stabilityResponse.status >= 400 && stabilityResponse.status < 500
          ? stabilityResponse.status
          : 502,
      json: {
        error: 'Stability API request failed',
        status: stabilityResponse.status,
        details: details.slice(0, 800),
      },
    };
  }

  return {
    ok: true,
    buffer: Buffer.from(await stabilityResponse.arrayBuffer()),
    contentType: stabilityResponse.headers.get('content-type') || 'image/png',
  };
}

async function handleImageEdit(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST, OPTIONS');
    sendJson(res, 405, { error: 'Method not allowed' });
    return;
  }

  let raw;
  try {
    raw = await readRawBody(req);
  } catch {
    sendJson(res, 413, { error: 'Request body too large' });
    return;
  }

  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch {
    sendJson(res, 400, { error: 'Invalid JSON body' });
    return;
  }

  const result = await processImageEdit(parsed, process.env.STABILITY_API_KEY);
  if (result.ok === false) {
    sendJson(res, result.status, result.json);
    return;
  }

  res.writeHead(200, {
    'Content-Type': result.contentType,
    'Cache-Control': 'no-store',
  });
  res.end(result.buffer);
}

async function serveStatic(req, res) {
  const requestUrl = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`);
  const decodedPath = decodeURIComponent(requestUrl.pathname);
  const safePath = path.normalize(decodedPath).replace(/^(\.\.[/\\])+/, '');
  const filePath = path.join(distDir, safePath === '/' ? 'index.html' : safePath);

  try {
    const file = await readFile(filePath);
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, {
      'Content-Type': mimeTypes[ext] || 'application/octet-stream',
      'Cache-Control': ext === '.html' ? 'no-store' : 'public, max-age=31536000, immutable',
    });
    res.end(file);
  } catch {
    try {
      const index = await readFile(path.join(distDir, 'index.html'));
      res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-store',
      });
      res.end(index);
    } catch {
      sendJson(res, 500, { error: 'Build output not found. Run npm run build first.' });
    }
  }
}

createServer(async (req, res) => {
  try {
    const pathname = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`).pathname;
    if (pathname === '/api/image-edit') {
      await handleImageEdit(req, res);
      return;
    }
    await serveStatic(req, res);
  } catch (error) {
    console.error(error);
    sendJson(res, 500, { error: 'Internal server error' });
  }
}).listen(port, '0.0.0.0', () => {
  console.log(`Lumina Beauty AI listening on port ${port}`);
});

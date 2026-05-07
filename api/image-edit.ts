import type { VercelRequest, VercelResponse } from '@vercel/node';
import { processImageEdit } from '../lib/processImageEdit';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '12mb',
    },
  },
};

function setCors(res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  setCors(res);

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST, OPTIONS');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  let parsed: unknown;
  try {
    parsed = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  } catch {
    setCors(res);
    return res.status(400).json({ error: 'Invalid JSON body' });
  }

  const result = await processImageEdit(parsed, process.env.STABILITY_API_KEY);

  if (result.ok === false) {
    setCors(res);
    return res.status(result.status).json(result.json);
  }

  res.setHeader('Content-Type', result.contentType);
  res.setHeader('Cache-Control', 'no-store');
  return res.send(result.buffer);
}

const STABILITY_URL =
  'https://api.stability.ai/v2beta/stable-image/generate/sd3';
const STABILITY_INPAINT_URL =
  'https://api.stability.ai/v2beta/stable-image/edit/inpaint';

export type ImageEditErrorBody = {
  error: string;
  details?: string;
  status?: number;
};

export type ImageEditResult =
  | { ok: true; buffer: Buffer; contentType: string }
  | { ok: false; status: number; json: ImageEditErrorBody };

async function loadImageBuffer(
  imageInput: string
): Promise<{ buffer: Buffer; mime: string }> {
  const trimmed = imageInput.trim();
  if (trimmed.startsWith('data:')) {
    const match = trimmed.match(/^data:([^;]+);base64,(.+)$/);
    if (!match) throw new Error('Invalid data URL');
    const mime = match[1];
    const b64 = match[2];
    return { buffer: Buffer.from(b64, 'base64'), mime };
  }
  if (trimmed.startsWith('https://')) {
    const r = await fetch(trimmed);
    if (!r.ok) throw new Error(`Failed to fetch image: HTTP ${r.status}`);
    const mime =
      r.headers.get('content-type')?.split(';')[0]?.trim() || 'image/jpeg';
    const buf = Buffer.from(await r.arrayBuffer());
    return { buffer: buf, mime };
  }
  if (trimmed.startsWith('http://')) {
    throw new Error('Only HTTPS image URLs are allowed');
  }
  return { buffer: Buffer.from(trimmed, 'base64'), mime: 'image/jpeg' };
}

/**
 * Shared Stability SD3 image-to-image pipeline for Vercel and local Vite dev.
 * If mask_image is supplied, this switches to Stability inpaint so only the
 * masked areas are edited.
 */
export async function processImageEdit(
  body: unknown,
  apiKey: string | undefined
): Promise<ImageEditResult> {
  if (!apiKey) {
    return {
      ok: false,
      status: 500,
      json: { error: 'STABILITY_API_KEY is not configured on the server' },
    };
  }

  let original_image: string;
  let mask_image: string | undefined;
  let edit_prompt: string;
  let negative_prompt: string | undefined;
  let strength: number | undefined;
  try {
    const b =
      typeof body === 'string' ? JSON.parse(body) : (body as Record<string, unknown>);
    original_image = b?.original_image as string;
    mask_image =
      typeof b?.mask_image === 'string' && b.mask_image.trim()
        ? b.mask_image
        : undefined;
    edit_prompt =
      typeof b?.edit_prompt === 'string' ? b.edit_prompt.trim() : '';
    negative_prompt =
      typeof b?.negative_prompt === 'string' ? b.negative_prompt.trim() : undefined;
    strength = b?.strength as number | undefined;
  } catch {
    return {
      ok: false,
      status: 400,
      json: { error: 'Invalid JSON body' },
    };
  }

  if (!original_image || !edit_prompt) {
    return {
      ok: false,
      status: 400,
      json: { error: 'original_image and edit_prompt are required' },
    };
  }

  const strengthVal =
    typeof strength === 'number' && !Number.isNaN(strength)
      ? Math.min(1, Math.max(0, strength))
      : 0.55;

  let img: { buffer: Buffer; mime: string };
  let mask: { buffer: Buffer; mime: string } | undefined;
  try {
    img = await loadImageBuffer(original_image);
    if (mask_image) {
      mask = await loadImageBuffer(mask_image);
    }
  } catch (e) {
    return {
      ok: false,
      status: 400,
      json: { error: e instanceof Error ? e.message : 'Invalid image' },
    };
  }

  if (img.buffer.length > 15 * 1024 * 1024) {
    return {
      ok: false,
      status: 400,
      json: { error: 'Image too large (max ~15 MB)' },
    };
  }
  if (mask && mask.buffer.length > 8 * 1024 * 1024) {
    return {
      ok: false,
      status: 400,
      json: { error: 'Mask image too large (max ~8 MB)' },
    };
  }

  const ext = img.mime.includes('png')
    ? 'png'
    : img.mime.includes('webp')
      ? 'webp'
      : 'jpg';
  const form = new FormData();
  const bytes = new Uint8Array(
    img.buffer.buffer,
    img.buffer.byteOffset,
    img.buffer.byteLength
  );
  form.append(
    'image',
    new Blob([bytes], { type: img.mime || 'image/jpeg' }),
    `input.${ext}`
  );
  form.append('prompt', edit_prompt);
  form.append('output_format', 'png');

  if (negative_prompt) {
    form.append('negative_prompt', negative_prompt);
  }

  if (mask) {
    const maskExt = mask.mime.includes('webp')
      ? 'webp'
      : mask.mime.includes('jpg') || mask.mime.includes('jpeg')
        ? 'jpg'
        : 'png';
    const maskBytes = new Uint8Array(
      mask.buffer.buffer,
      mask.buffer.byteOffset,
      mask.buffer.byteLength
    );
    form.append(
      'mask',
      new Blob([maskBytes], { type: mask.mime || 'image/png' }),
      `mask.${maskExt}`
    );
  } else {
    form.append('mode', 'image-to-image');
    form.append('strength', String(strengthVal));
  }

  const controller = new AbortController();
  const kill = setTimeout(() => controller.abort(), 90_000);

  let stabilityRes: Response;
  try {
    stabilityRes = await fetch(mask ? STABILITY_INPAINT_URL : STABILITY_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        Accept: 'image/*',
      },
      body: form,
      signal: controller.signal,
    });
  } catch (e) {
    clearTimeout(kill);
    const msg = e instanceof Error ? e.message : 'Request failed';
    return {
      ok: false,
      status: 504,
      json: { error: 'Stability request timed out or failed', details: msg },
    };
  } finally {
    clearTimeout(kill);
  }

  if (!stabilityRes.ok) {
    const errText = await stabilityRes.text();
    console.error('Stability error', stabilityRes.status, errText);
    return {
      ok: false,
      status:
        stabilityRes.status >= 400 && stabilityRes.status < 500
          ? stabilityRes.status
          : 502,
      json: {
        error: 'Stability API request failed',
        status: stabilityRes.status,
        details: errText.slice(0, 800),
      },
    };
  }

  const outBuf = Buffer.from(await stabilityRes.arrayBuffer());
  return {
    ok: true,
    buffer: outBuf,
    contentType: stabilityRes.headers.get('content-type') || 'image/png',
  };
}

/**
 * Calls the Vercel serverless route `/api/image-edit`, which forwards
 * the request to Stability (SD3 image-to-image).
 */
export async function editImageWithStability(
  originalDataUrl: string,
  editPrompt: string,
  options?: { strength?: number }
): Promise<string> {
  const res = await fetch('/api/image-edit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      original_image: originalDataUrl,
      edit_prompt: editPrompt,
      strength: options?.strength,
    }),
  });

  if (!res.ok) {
    let msg = res.statusText;
    try {
      const j = (await res.json()) as { error?: string; details?: string };
      if (j.error) msg = j.details ? `${j.error}: ${j.details}` : j.error;
    } catch {
      /* ignore */
    }
    throw new Error(msg);
  }

  const blob = await res.blob();
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onloadend = () => resolve(r.result as string);
    r.onerror = () => reject(new Error('Failed to read image'));
    r.readAsDataURL(blob);
  });
}

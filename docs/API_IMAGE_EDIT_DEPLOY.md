# AI Image Edit API Deployment Guide (Vercel + Stability)

This project exposes a server-side image editing endpoint for AI makeup trials and general photo edits. The frontend calls this endpoint, and the endpoint forwards the request to Stability AI.

## 1. Environment Variables

In Vercel, open **Project Settings -> Environment Variables** and add:

| Name | Required | Description |
| --- | --- | --- |
| `STABILITY_API_KEY` | Yes | Stability AI API key from https://platform.stability.ai/keys. Keep it server-side only. |

Configure the key for both **Production** and **Preview** if you use preview deployments. Redeploy after changing environment variables.

For local development, create `.env.local`:

```env
STABILITY_API_KEY=sk-...
```

Restart `npm run dev` after editing `.env.local`.

## 2. HTTP Contract

| Item | Value |
| --- | --- |
| Path | `/api/image-edit` |
| Method | `POST` |
| Content-Type | `application/json` |
| Response | PNG binary on success |

The endpoint also supports `OPTIONS` for CORS preflight.

### Request Body

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `original_image` | `string` | Yes | Original image as a Data URL, HTTPS image URL, or bare Base64 string. |
| `edit_prompt` | `string` | Yes | Natural-language edit request, such as `apply glossy red lipstick and subtle blush`. |
| `mask_image` | `string` | No | Optional black/white mask image. White areas are edited; black areas are preserved. When supplied, the server uses Stability inpaint instead of full image-to-image. |
| `negative_prompt` | `string` | No | Optional text describing what should be avoided, such as identity or background changes. |
| `strength` | `number` | No | Image-to-image strength from `0` to `1`. Default is `0.55`; higher values change the original image more. |

Example:

```json
{
  "original_image": "data:image/png;base64,iVBORw0KGgo...",
  "mask_image": "data:image/png;base64,iVBORw0KGgo...",
  "edit_prompt": "apply glossy red lipstick and subtle warm blush, keep identity unchanged",
  "negative_prompt": "changed identity, changed background, distorted mouth",
  "strength": 0.55
}
```

Request limits:

- Vercel JSON body limit: about 12 MB.
- Decoded image limit in this project: about 15 MB.
- Only HTTPS remote image URLs are accepted.

### Success Response

- HTTP `200`
- `Content-Type: image/png` or another image content type returned by Stability
- Body is binary image data

The frontend converts the blob response into a Data URL for preview.

### Error Response

Non-200 responses are JSON:

```json
{
  "error": "Short error message",
  "details": "Optional upstream or validation details",
  "status": 502
}
```

Common statuses:

| Status | Meaning |
| --- | --- |
| `400` | Missing parameters, invalid JSON, unsupported URL, or oversized image. |
| `402` | Stability accepted the key but the account has insufficient credits. |
| `405` | Method is not `POST` or `OPTIONS`. |
| `500` | `STABILITY_API_KEY` is not configured. |
| `502` | Stability returned an error. |
| `504` | Stability request timed out or failed before a response. |

## 3. Upstream Behavior

The shared server logic calls:

```text
POST https://api.stability.ai/v2beta/stable-image/generate/sd3
POST https://api.stability.ai/v2beta/stable-image/edit/inpaint
```

Without `mask_image`, the server sends the uploaded image, prompt, `image-to-image` mode, strength, and requests PNG output.

With `mask_image`, the server sends the uploaded image, mask, prompt, optional negative prompt, and requests PNG output through inpaint. This is the preferred path for precise makeup trials because it limits edits to lips, eyelids, cheeks, or skin zones.

The frontend now builds a local makeup mask before calling the API:

- Face region is detected with the browser `FaceDetector` API when available.
- If browser detection is unavailable, a centered selfie face estimate is used.
- Selected zones generate soft masks for lips, eyeshadow, blush, and optional foundation.
- Product shade presets are inserted into the prompt so generated colors better match the chosen shade.
- Identity, hair, clothing, background, camera angle, and natural skin texture are protected through prompt and negative prompt constraints.

The Stability account must have available credits. If generation fails, inspect the JSON `details` field or the Vercel function logs.

## 4. Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create `.env.local` with `STABILITY_API_KEY`.

3. Start Vite:
   ```bash
   npm run dev
   ```

Vite includes a local middleware for `POST /api/image-edit`, so the local frontend can call the same path as production.

## 5. Vercel Notes

`vercel.json` sets `api/image-edit.ts` to `maxDuration: 60`. If requests often time out, reduce upload size, lower generation load, or upgrade the Vercel plan.

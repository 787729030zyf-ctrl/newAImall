<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Lumina Beauty AI

## Run locally

**Prerequisites:** Node.js

1. `npm install`
2. Copy `.env.example` → `.env.local`，填写 `STABILITY_API_KEY`（[Stability 控制台](https://platform.stability.ai/keys) 申请）。
3. 本地开发（默认 Vite 会挂载与线上一致的 `POST /api/image-edit`）：
   ```bash
   npm run dev
   ```
4. 若要与线上完全一致、使用 Vercel CLI 跑 Functions（需已 `vercel link` 等）：
   ```bash
   npm run dev:vercel
   ```

部署与接口说明见 [docs/API_IMAGE_EDIT_DEPLOY.md](docs/API_IMAGE_EDIT_DEPLOY.md)。

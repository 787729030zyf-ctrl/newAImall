<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Lumina Beauty AI

## Run locally

**Prerequisites:** Node.js

1. `npm install`
2. Copy `.env.example` to `.env.local`, then fill in `STABILITY_API_KEY` from the [Stability console](https://platform.stability.ai/keys).
3. Start local development. Vite mounts the same `POST /api/image-edit` API used in production:
   ```bash
   npm run dev
   ```
4. Optional: use Vercel CLI to run the serverless function locally, after linking the project:
   ```bash
   npm run dev:vercel
   ```

Deployment and API details are documented in [docs/API_IMAGE_EDIT_DEPLOY.md](docs/API_IMAGE_EDIT_DEPLOY.md).

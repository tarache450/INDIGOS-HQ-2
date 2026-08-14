import express from 'express';
import path from 'path';
import fs from 'fs';
import { apiRouter } from './src/server/api/routes';

// ─── createApp ────────────────────────────────────────────────────────────────
// Factory function: builds and returns an Express app with /api + SPA serving.
export function createApp() {
  const app = express();
  app.use(express.json());
  app.use('/api', apiRouter);

  const distPath = path.join(process.cwd(), 'dist');
  if (process.env.NODE_ENV === 'production' && fs.existsSync(distPath)) {
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      if (req.url.startsWith('/api/')) return;
      const filePath = path.join(distPath, req.url);
      if (req.url !== '/' && fs.existsSync(filePath)) {
        res.sendFile(filePath);
      } else {
        res.sendFile(path.join(distPath, 'index.html'));
      }
    });
  }

  return app;
}

// ─── Vercel serverless handler (default export) ───────────────────────────────
export default function handler(req, res) {
  const app = createApp();
  app(req, res);
}

// ─── Standalone local dev ─────────────────────────────────────────────────────
const isLocal =
  !process.env.VERCEL ||
  process.env.STANDALONE === 'true' ||
  process.env.NODE_ENV !== 'production';

if (isLocal) {
  const app = createApp();

  const start = async () => {
    if (process.env.NODE_ENV !== 'production') {
      const { createServer: createViteServer } = await import('vite');
      const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: 'spa',
      });
      app.use(vite.middlewares);
    }

    const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`[INDIGO HQ] System online on port ${PORT}`);
    });
  };

  start().catch((err) => {
    console.error('[INDIGO HQ] Failed to start:', err);
    process.exit(1);
  });
}

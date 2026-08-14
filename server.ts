import express from 'express';
import path from 'path';
import fs from 'fs';

// ─── createApp ────────────────────────────────────────────────────────────────
// Factory that returns an Express app with /api routes mounted.
// In production, also serves the static dist/ build so the SPA loads.
export function createApp() {
  const app = express();
  app.use(express.json());

  // Mount API routes — in production the esbuild bundle already has them
  let apiRouter;
  try {
    const bundled = require('../dist/server.cjs');
    if (typeof bundled.createApp === 'function') {
      return bundled.createApp();
    }
    apiRouter = bundled.apiRouter;
  } catch {
    apiRouter = require('./src/server/api/routes').apiRouter;
  }

  app.use('/api', apiRouter);

  const distPath = path.join(process.cwd(), 'dist');
  if (process.env.NODE_ENV === 'production' && fs.existsSync(distPath)) {
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  return app;
}

// ─── Vercel serverless handler ────────────────────────────────────────────────
// Vercel calls this default export for every request routed to server.ts
export default function vercelHandler(req, res) {
  const app = createApp();
  app(req, res);
}

// ─── Standalone entry (local dev / STANDALONE=1) ─────────────────────────────
const isStandalone =
  process.env.STANDALONE === 'true' ||
  !process.env.VERCEL ||
  process.env.NODE_ENV !== 'production';

if (isStandalone) {
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

import express from 'express';
import path from 'path';
import fs from 'fs';
import { apiRouter } from './src/server/api/routes';

// ─── Vercel serverless handler (default export) ───────────────────────────────
// Vercel execs server.ts for each request routed to it.
// Here we build the app and handle the request inline — no separate function file.
export default function vercelHandler(req, res) {
  const app = express();
  app.use(express.json());
  app.use('/api', apiRouter);

  // Serve static dist/ in production
  const distPath = path.join(process.cwd(), 'dist');
  if (process.env.NODE_ENV === 'production' && fs.existsSync(distPath)) {
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      if (req.url.startsWith('/api/')) return;
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app(req, res);
}

// ─── Standalone local dev (not in Vercel) ─────────────────────────────────────
const isStandalone =
  process.env.STANDALONE === 'true' ||
  !process.env.VERCEL ||
  process.env.NODE_ENV !== 'production';

if (isStandalone) {
  const app = express();
  app.use(express.json());
  app.use('/api', apiRouter);

  const start = async () => {
    if (process.env.NODE_ENV !== 'production') {
      const { createServer: createViteServer } = await import('vite');
      const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: 'spa',
      });
      app.use(vite.middlewares);
    }

    const distPath = path.join(process.cwd(), 'dist');
    if (process.env.NODE_ENV === 'production' && fs.existsSync(distPath)) {
      app.use(express.static(distPath));
      app.get('*', (req, res) => {
        if (req.url.startsWith('/api/')) return;
        res.sendFile(path.join(distPath, 'index.html'));
      });
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

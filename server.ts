import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import { apiRouter } from './src/server/api/routes';

function createApp() {
  const app = express();

  // JSON request body parser
  app.use(express.json());

  // Mount API endpoints
  app.use('/api', apiRouter);

  // In production, serve static build
  const distPath = path.join(process.cwd(), 'dist');
  if (process.env.NODE_ENV === 'production' && fs.existsSync(distPath)) {
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  return app;
}

// Vercel serverless export — the handler Vercel calls for every request
export default function vercelHandler(req, res) {
  const app = createApp();
  // Express app callable as (req, res, next)
  app(req, res);
}

// Local development / standalone mode
const isStandalone = process.env.STANDALONE === 'true' || !process.env.VERCEL;

if (isStandalone) {
  const app = createApp();

  async function startServer() {
    if (process.env.NODE_ENV !== 'production') {
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
  }

  startServer();
}

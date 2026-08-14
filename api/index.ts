import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import { apiRouter } from '../src/server/api/routes';

function createApp() {
  const app = express();
  app.use(express.json());
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

// This is the Vercel serverless function entry point.
// Vercel looks for api/index.ts and calls the default export.
export default function handler(req, res) {
  const app = createApp();
  app(req, res);
}

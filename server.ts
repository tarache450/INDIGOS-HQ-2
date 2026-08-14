import express from 'express';
import path from 'path';
import fs from 'fs';
import { apiRouter } from './src/server/api/routes';

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

export default function handler(req, res) {
  createApp()(req, res);
}

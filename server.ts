import express from 'express';
import path from 'path';
import fs from 'fs';
import { apiRouter } from './src/server/api/routes';

// ─── Express app singleton ────────────────────────────────────────────────────
// En Vercel serverless cada invocación recibe su propio require,
// pero dentro de una misma instancia caliente el módulo se reutiliza.
// Aquí creamos la app una sola vez por ejecución.

const app = express();
app.use(express.json());
app.use('/api', apiRouter);

// SPA estático en producción
const distPath = path.join(process.cwd(), 'dist');
if (process.env.NODE_ENV === 'production' && fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  // Catch-all SPA: cualquier ruta que no sea un fichero → index.html
  app.get('*', (req, res) => {
    // Si es una petición API, Express ya la manejó antes del catch-all
    if (req.url.startsWith('/api/')) return;
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

// ─── Handler por defecto (Vercel llama a esto) ────────────────────────────────
export default function handler(req, res) {
  app(req, res);
}

// ─── Modo standalone (dev local) ───────────────────────────────────────────────
const isStandalone =
  process.env.STANDALONE === 'true' ||
  !process.env.VERCEL ||
  process.env.NODE_ENV !== 'production';

if (isStandalone) {
  const start = async () => {
    // Vite middleware solo en dev (no en prod standalone)
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

import express from 'express';
import { apiRouter } from '../src/server/api/routes';

const app = express();
app.use(express.json());
app.use('/api', apiRouter);

export default function handler(req, res) {
  app(req, res);
}

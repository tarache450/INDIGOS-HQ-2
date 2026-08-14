import express from 'express';
import path from 'path';
import fs from 'fs';
import { apiRouter } from '../src/server/api/routes';

export default function handler(req, res) {
  const app = express();
  app.use(express.json());
  app.use('/api', apiRouter);
  app(req, res);
}

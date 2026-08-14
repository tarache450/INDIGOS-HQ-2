import { createApp } from '../dist/server.cjs';

export default function handler(req, res) {
  createApp()(req, res);
}

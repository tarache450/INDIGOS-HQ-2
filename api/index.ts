import express from 'express';
import path from 'path';
import fs from 'fs';
import { createApp } from '../dist/server.cjs';

export default function handler(req, res) {
  createApp()(req, res);
}

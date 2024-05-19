import { start } from '@notifications/server';
import express, { Express } from 'express';

const initialize = (): void => {
  const app: Express = express();
  start(app);
};

initialize();

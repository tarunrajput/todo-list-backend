import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morganMiddleware from '../middleware/morganMiddleware.js';

export default app => {
  app.use(
    express.json({
      limit: '1mb',
    }),
    express.urlencoded({
      limit: '1mb',
      extended: true,
    }),
    express.static('public'),

    cors({ exposedHeaders: 'Authorization', origin: true }),
    helmet(),
    morganMiddleware
  );
};

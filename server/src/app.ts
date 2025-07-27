import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import cookieParser from 'cookie-parser';

import config from '@/config/global.config';
import authRouter from '@/routes/auth.routes';
import profileRoute from '@/routes/profile.routes';
import { errorHandler, notFound } from '@/middlewares/errors.middleware';

const app = express();

app.use(cookieParser());
app.use(helmet());
app.use(morgan(config.nodeEnv === 'production' ? 'combined' : 'dev'));
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: config.clientUrl,
    credentials: true,
  })
);

app.get('/test', (_, res) => {
  res.json({ username: 'test', email: 'test@gmail.com' });
});

app.use('/api/auth', authRouter);
app.use('/api/profile', profileRoute);
app.all('*catchall', notFound);

app.use(errorHandler);

export default app;

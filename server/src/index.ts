import express, { Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';

import errorHandler from '@/middlewares/errorHandler';
import config from '@/config/config';
import { authRouter } from '@/routes/authRouter';

const app = express();

app
  .use(helmet())
  .use(morgan('dev'))
  .use(compression())
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(cors());

app.use('/api/auth', authRouter);

app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`Example app listening on port ${config.port}`);
});

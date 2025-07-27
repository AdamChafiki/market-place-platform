import Config from '@/types/config.type';
import dotenv from 'dotenv';

dotenv.config();

const config: Config = {
  port: Number(process.env.PORT) || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  databaseUrl: process.env.DATABASE_URL || 'error',
  authSecret: process.env.AUTH_SECRET || 'default_access_secret',
  authSecretExpiresIn: process.env.AUTH_SECRET_EXPIRES_IN || '15m',
  authRefreshSecret:
    process.env.AUTH_REFRESH_SECRET || 'default_refresh_secret',
  authRefreshSecretExpiresIn:
    process.env.AUTH_REFRESH_SECRET_EXPIRES_IN || '7d',
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
};

export default config;

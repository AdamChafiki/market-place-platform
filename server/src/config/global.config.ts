import dotenv from 'dotenv';

dotenv.config();

interface Config {
  port: number;
  nodeEnv: string;
  databaseUrl: string;
  authSecret: string;
  authSecretExpiresIn: number;
  authRefreshSecret: string;
  authRefreshSecretExpiresIn: number;
  clientUrl: string;
}

const config: Config = {
  port: Number(process.env.PORT) || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  databaseUrl: process.env.DATABASE_URL || 'error',
  authSecret: process.env.AUTH_SECRET || 'default_access_secret',
  authSecretExpiresIn: Number(process.env.AUTH_SECRET_EXPIRES_IN) || 15,
  authRefreshSecret:
    process.env.AUTH_REFRESH_SECRET || 'default_refresh_secret',
  authRefreshSecretExpiresIn:
    Number(process.env.AUTH_REFRESH_SECRET_EXPIRES_IN) || 7,
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
};

export default config;

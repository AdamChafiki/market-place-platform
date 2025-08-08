import Config from '@/types/config.type';
import dotenv from 'dotenv';

dotenv.config();

const config: Config = {
  port: Number(process.env.PORT) || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  databaseUrl: process.env.DATABASE_URL || 'error',
  authSecret: process.env.AUTH_SECRET || 'default_access_secret',
  authSecretExpiresIn: 7,
  authRefreshSecret:
    process.env.AUTH_REFRESH_SECRET || 'default_refresh_secret',
  authRefreshSecretExpiresIn: 15,
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
  cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME || '',
  cloudinaryApiKey: process.env.CLOUDINARY_API_KEY || '',
  cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET || '',
};

export default config;

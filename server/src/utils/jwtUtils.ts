import config from '@/config/config';
import jwt, { JwtPayload } from 'jsonwebtoken';

interface TokenPayload extends JwtPayload {
  userId: number;
}

export const generateAccessToken = (userId: number): string =>
  jwt.sign({ userId }, config.authSecret, {
    expiresIn: config.authSecretExpiresIn,
  });

export const generateRefreshToken = (userId: number): string =>
  jwt.sign({ userId }, config.authRefreshSecret, {
    expiresIn: config.authRefreshSecretExpiresIn,
  });

export const verifyAccessToken = (token: string): TokenPayload => {
  return jwt.verify(token, config.authSecret) as TokenPayload;
};

export const verifyRefreshToken = (token: string): TokenPayload => {
  return jwt.verify(token, config.authRefreshSecret) as TokenPayload;
};

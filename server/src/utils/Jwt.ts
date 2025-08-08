import config from '@/config/global.config';
import jwt, { JwtPayload, Secret, SignOptions } from 'jsonwebtoken';

interface TokenPayload extends JwtPayload {
  userId: number;
}

const authSecret: Secret = config.authSecret;
const authRefreshSecret: Secret = config.authRefreshSecret;

const accessTokenOptions: SignOptions = {
  expiresIn: config.authSecretExpiresIn,
};

const refreshTokenOptions: SignOptions = {
  expiresIn: config.authRefreshSecretExpiresIn,
};

export const generateAccessToken = (userId: number): string =>
  jwt.sign({ userId }, authSecret, accessTokenOptions);

export const generateRefreshToken = (userId: number): string =>
  jwt.sign({ userId }, authRefreshSecret, refreshTokenOptions);

export const verifyAccessToken = (token: string): TokenPayload =>
  jwt.verify(token, authSecret) as TokenPayload;

export const verifyRefreshToken = (token: string): TokenPayload =>
  jwt.verify(token, authRefreshSecret) as TokenPayload;

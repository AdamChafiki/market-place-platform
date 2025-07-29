import { AppError } from '@/utils/AppError';
import { verifyAccessToken } from '@/utils/Jwt';
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

const jwtMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    throw new AppError('No token provided', StatusCodes.UNAUTHORIZED);

  const token = authHeader.split(' ')[1];

  try {
    const decoded = verifyAccessToken(token);
    req.user = decoded;
    next();
  } catch (err) {
    throw new AppError('Invalid or expired token', StatusCodes.UNAUTHORIZED);
  }
};

export default jwtMiddleware;

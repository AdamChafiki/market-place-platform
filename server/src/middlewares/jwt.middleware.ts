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
  if (!authHeader) return res.status(401).json({ error: 'No token provided' });

  const token = authHeader.split(' ')[1];
  try {
    const decoded = verifyAccessToken(token);
    req.user = decoded;
    next();
  } catch (err) {
    res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ error: 'Invalid or expired token' });
  }
};

export default jwtMiddleware;

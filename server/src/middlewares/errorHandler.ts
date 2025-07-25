import { Request, Response, NextFunction } from 'express';

export interface AppError extends Error {
  status?: number;
}

const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction // ← obligatoire pour que Express détecte que c’est un middleware d’erreur
) => {
  console.error(err);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
  });
};

export default errorHandler;

import { Request, Response, NextFunction } from 'express';
import { z, ZodError } from 'zod';
import { StatusCodes } from 'http-status-codes';
import { AppError } from '@/utils/AppError';

export function validateData(schema: z.ZodObject<any, any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        // const errorMessages = error.issues.map((issue: any) => ({
        //   message: `${issue.path.join('.')} is ${issue.message}`,
        // }));
        throw new AppError('Invalid data', StatusCodes.BAD_REQUEST);
      } else {
        throw new AppError(
          'Internal Server Error',
          StatusCodes.INTERNAL_SERVER_ERROR
        );
      }
    }
  };
}

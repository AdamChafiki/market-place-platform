import { prisma } from '@/lib/prisma';
import { AppError } from '@/utils/AppError';
import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { User } from 'generated/prisma';
import { StatusCodes } from 'http-status-codes';

/**
 * @description profile User
 * @router /api/profile
 * @method GET
 * @access private
 */

const profile = asyncHandler(async (req: Request, res: Response) => {
  const { userId } = req.user;
  console.log(`Fetching profile for user ID: ${userId}`, req.user);

  const user: Pick<User, 'id' | 'username' | 'role'> | null =
    await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        username: true,
        role: true,
      },
    });

  if (!user) {
    throw new AppError('User not found', StatusCodes.NOT_FOUND);
  }

  res.status(StatusCodes.OK).json({ user });
});

export { profile };

import { prisma } from '@/lib/prisma';
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
  const userId = req.user.id;

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
    res.status(StatusCodes.NOT_FOUND);
    throw new Error('User not found');
  }

  res.status(StatusCodes.OK).json({ user });
});

export { profile };

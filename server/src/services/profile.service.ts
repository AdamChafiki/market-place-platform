import { prisma } from '@/lib/prisma';
import { AppError } from '@/utils/AppError';
import { StatusCodes } from 'http-status-codes';

export const getProfileService = async (userId: string) => {
  const user = await prisma.user.findUnique({
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

  return user;
};

export const updateProfileService = async (
  userId: string,
  data: { username?: string; email?: string }
) => {
  return await prisma.user.update({
    where: { id: userId },
    data,
    select: {
      id: true,
      username: true,
      email: true,
    },
  });
};

export const deleteProfileService = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { announcements: true },
  });

  if (!user) {
    throw new AppError('User not found', StatusCodes.NOT_FOUND);
  }

  await prisma.announcement.deleteMany({ where: { userId } });
  await prisma.user.delete({ where: { id: userId } });

  return true;
};

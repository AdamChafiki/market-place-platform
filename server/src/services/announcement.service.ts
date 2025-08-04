import { prisma } from '@/lib/prisma';
import { AnnouncementInterface } from '@/types/annoucement.type';
import { AppError } from '@/utils/AppError';
import { StatusCodes } from 'http-status-codes';
import { Announcement } from 'generated/prisma';
import { deleteImageToCloudinary } from '@/utils/Cloudinary';
import { getPublicIdFromUrl } from '@/utils/Helpers';
import { log } from 'node:console';

export const createAnnouncementService = async (
  data: AnnouncementInterface,
  userId: string
): Promise<Announcement> => {
  return await prisma.announcement.create({
    data: {
      ...data,
      hidePhone: Boolean(data.hidePhone),
      imageUrl: data.imageUrl ?? '',
      userId,
      price:
        typeof data.price === 'string' ? parseFloat(data.price) : data.price,
    },
  });
};

export const getAllAnnouncementsService = async (): Promise<Announcement[]> => {
  return await prisma.announcement.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      user: {
        select: {
          id: true,
          username: true,
        },
      },
    },
  });
};

export const getAnnouncementByIdService = async (
  id: string
): Promise<Announcement> => {
  const announcement = await prisma.announcement.findUnique({
    where: { id },
    include: {
      user: true,
    },
  });

  if (!announcement) {
    throw new AppError('Announcement not found', StatusCodes.NOT_FOUND);
  }

  return announcement;
};

export const updateAnnouncementService = async (
  id: string,
  userId: string,
  data: Partial<AnnouncementInterface>
): Promise<Announcement> => {
  console.log(data);

  const announcement = await prisma.announcement.findUnique({ where: { id } });

  if (!announcement) {
    throw new AppError('Announcement not found', StatusCodes.NOT_FOUND);
  }

  if (announcement.userId !== userId) {
    throw new AppError(
      'You are not authorized to update this post',
      StatusCodes.FORBIDDEN
    );
  }
  console.log(data.imageUrl);

  if (data.imageUrl && data.imageUrl !== announcement.imageUrl) {
    const oldPublicId = getPublicIdFromUrl(announcement.imageUrl);
    if (oldPublicId) {
      await deleteImageToCloudinary(oldPublicId);
    }
  }

  return await prisma.announcement.update({
    where: { id },
    data: {
      ...data,
      hidePhone: Boolean(data.hidePhone),
      price:
        typeof data.price === 'string' ? parseFloat(data.price) : data.price,
    },
  });
};

export const deleteAnnouncementService = async (
  id: string,
  userId: string
): Promise<void> => {
  const announcement = await prisma.announcement.findUnique({ where: { id } });

  if (!announcement) {
    throw new AppError('Announcement not found', StatusCodes.NOT_FOUND);
  }

  if (announcement.userId !== userId) {
    throw new AppError(
      'You are not authorized to delete this post',
      StatusCodes.FORBIDDEN
    );
  }

  const publicId = getPublicIdFromUrl(announcement.imageUrl);
  if (publicId) {
    await deleteImageToCloudinary(publicId);
  }

  await prisma.announcement.delete({ where: { id } });
};

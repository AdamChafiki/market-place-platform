import { prisma } from '@/lib/prisma';
import { AnnouncementInterface } from '@/types/annoucement.type';
import { AppError } from '@/utils/AppError';
import { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { Announcement } from 'generated/prisma';
import { StatusCodes } from 'http-status-codes';

/**
 * @description Create an announcement
 * @route POST /api/announce
 * @access Private
 */
export const createAnnouncement = expressAsyncHandler(
  async (req: Request<{}, {}, AnnouncementInterface>, res: Response) => {
    const { name, description, location, phoneNumber, hidePhone, imageUrl } =
      req.body;
    const { userId } = req.user;

    const announcement: Announcement = await prisma.announcement.create({
      data: {
        name,
        description,
        location,
        phoneNumber,
        hidePhone,
        imageUrl: imageUrl || '',
        userId,
      },
    });

    res.status(StatusCodes.CREATED).json({ announcement });
  }
);

/**
 * @description Get all announcements
 * @route GET /api/announce
 * @access Private
 */
export const getAllAnnouncements = expressAsyncHandler(
  async (_req: Request, res: Response) => {
    const announcements = await prisma.announcement.findMany({
      orderBy: { createdAt: 'desc' },
    });

    res.status(StatusCodes.OK).json({ announcements });
  }
);

/**
 * @description Get single announcement
 * @route GET /api/announce/:id
 * @access Private
 */
export const getAnnouncementById = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const announcement = await prisma.announcement.findUnique({
      where: { id },
    });

    if (!announcement) {
      throw new AppError('Announcement not found', StatusCodes.NOT_FOUND);
    }

    res.status(StatusCodes.OK).json({ announcement });
  }
);

/**
 * @description Update announcement
 * @route PUT /api/announce/:id
 * @access Private
 */
export const updateAnnouncement = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { userId } = req.user;

    const announcement = await prisma.announcement.findUnique({
      where: { id },
    });

    if (!announcement) {
      throw new AppError('Announcement not found', StatusCodes.NOT_FOUND);
    }

    if (announcement.userId !== userId) {
      throw new AppError(
        'You are not authorized to update this post',
        StatusCodes.FORBIDDEN
      );
    }

    const updated = await prisma.announcement.update({
      where: { id },
      data: req.body,
    });

    res.status(StatusCodes.OK).json({ announcement: updated });
  }
);

/**
 * @description Delete announcement
 * @route DELETE /api/announce/:id
 * @access Private
 */
export const deleteAnnouncement = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { userId } = req.user;

    const announcement = await prisma.announcement.findUnique({
      where: { id },
    });

    if (!announcement) {
      throw new AppError('Announcement not found', StatusCodes.NOT_FOUND);
    }

    if (announcement.userId !== userId) {
      throw new AppError(
        'You are not authorized to delete this post',
        StatusCodes.FORBIDDEN
      );
    }

    await prisma.announcement.delete({ where: { id } });

    res.status(StatusCodes.NO_CONTENT).send();
  }
);

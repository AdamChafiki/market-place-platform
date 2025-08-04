import expressAsyncHandler from 'express-async-handler';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { AnnouncementInterface } from '@/types/annoucement.type';
import {
  createAnnouncementService,
  getAllAnnouncementsService,
  getAnnouncementByIdService,
  updateAnnouncementService,
  deleteAnnouncementService,
} from '@/services/announcement.service';
import { uploadImageToCloudinary } from '@/utils/Cloudinary';

export const createAnnouncement = expressAsyncHandler(
  async (req: Request<{}, {}, AnnouncementInterface>, res: Response) => {
    const { userId } = req.user;

    let imageUrl: string | undefined;
    if (req.file) {
      const uploadResult = await uploadImageToCloudinary(
        `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`
      );
      imageUrl = uploadResult.secure_url;
    }

    const announcement = await createAnnouncementService(
      { ...req.body, imageUrl },
      userId
    );
    res.status(StatusCodes.CREATED).json({ announcement });
  }
);

export const getAllAnnouncements = expressAsyncHandler(
  async (_req: Request, res: Response) => {
    const announcements = await getAllAnnouncementsService();
    res.status(StatusCodes.OK).json({ announcements });
  }
);

export const getAnnouncementById = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const announcement = await getAnnouncementByIdService(req.params.id);
    res.status(StatusCodes.OK).json({ announcement });
  }
);

export const updateAnnouncement = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { userId } = req.user;

    let imageUrl: string | undefined;

    if (req.file) {
      const uploadResult = await uploadImageToCloudinary(
        `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`
      );
      imageUrl = uploadResult.secure_url;
    }

    const updated = await updateAnnouncementService(id, userId, {
      ...req.body,
      imageUrl,
    });

    res.status(StatusCodes.OK).json({ announcement: updated });
  }
);

export const deleteAnnouncement = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { userId } = req.user;
    console.log(id, userId);

    await deleteAnnouncementService(id, userId);
    res.status(StatusCodes.NO_CONTENT).send();
  }
);

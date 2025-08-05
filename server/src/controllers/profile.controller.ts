import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { StatusCodes } from 'http-status-codes';
import {
  getProfileService,
  updateProfileService,
  deleteProfileService,
} from '@/services/profile.service';

export const profile = asyncHandler(async (req: Request, res: Response) => {
  const { userId } = req.user;
  const user = await getProfileService(userId);
  res.status(StatusCodes.OK).json({ user });
});

export const updateProfile = asyncHandler(
  async (req: Request, res: Response) => {
    const { userId } = req.user;
    const { username, email } = req.body;

    const user = await updateProfileService(userId, {
      username,
      email,
    });
    res.status(StatusCodes.OK).json({ user });
  }
);

export const deleteProfile = asyncHandler(
  async (req: Request, res: Response) => {
    const { userId } = req.user;
    await deleteProfileService(userId);
    res.status(StatusCodes.NO_CONTENT).send();
  }
);

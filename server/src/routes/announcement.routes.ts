import express from 'express';

import {
  createAnnouncement,
  getAllAnnouncements,
  getAnnouncementById,
  updateAnnouncement,
  deleteAnnouncement,
} from '@/controllers/annoucement.controller';
import jwtMiddleware from '@/middlewares/jwt.middleware';
import { announcementSchema } from '@/shemas/announcement.shema';
import { validateData } from '@/middlewares/validation.middleware';
import { upload } from '@/middlewares/upload.middleware';

const router = express.Router();

router
  .route('/')
  .get(getAllAnnouncements)
  .post(upload.single('image'), jwtMiddleware, createAnnouncement);

router
  .route('/:id')
  .get(getAnnouncementById)
  .put(validateData(announcementSchema), jwtMiddleware, updateAnnouncement)
  .delete(jwtMiddleware, deleteAnnouncement);

export default router;

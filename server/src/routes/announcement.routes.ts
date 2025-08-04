import express from 'express';

import {
  createAnnouncement,
  getAllAnnouncements,
  getAnnouncementById,
  updateAnnouncement,
  deleteAnnouncement,
} from '@/controllers/annoucement.controller';
import jwtMiddleware from '@/middlewares/jwt.middleware';
import { validateData } from '@/middlewares/validation.middleware';
import { upload } from '@/middlewares/upload.middleware';

const router = express.Router();

router
  .route('/')
  .get(getAllAnnouncements)
  .post(jwtMiddleware, upload.single('image'), createAnnouncement);

router
  .route('/:id')
  .get(getAnnouncementById)
  .put(jwtMiddleware, upload.single('image'), updateAnnouncement)
  .delete(jwtMiddleware, deleteAnnouncement);

export default router;

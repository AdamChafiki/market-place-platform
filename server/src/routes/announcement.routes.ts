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

const router = express.Router();

router.use(jwtMiddleware);

router
  .route('/')
  .get(getAllAnnouncements)
  .post(validateData(announcementSchema), createAnnouncement);

router
  .route('/:id')
  .get(getAnnouncementById)
  .put(validateData(announcementSchema), updateAnnouncement)
  .delete(deleteAnnouncement);

export default router;

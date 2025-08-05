import express from 'express';
import {
  profile,
  updateProfile,
  deleteProfile,
} from '@/controllers/profile.controller';
import jwtMiddleware from '@/middlewares/jwt.middleware';

const router = express.Router();

router.use(jwtMiddleware);

router.get('/me', profile);
router.put('/', updateProfile);
router.delete('/', deleteProfile);

export default router;

import express from 'express';

import {
  login,
  logout,
  refreshToken,
  register,
} from '@/controllers/auth.controller';
import { validateData } from '@/middlewares/validation.middleware';
import { userLoginSchema, userRegistrationSchema } from '@/shemas/auth.shema';

const router = express.Router();

router.post('/register', validateData(userRegistrationSchema), register);
router.post('/login', validateData(userLoginSchema), login);
router.post('/logout', logout);
router.post('/refresh-token', refreshToken);

export default router;

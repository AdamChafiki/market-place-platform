import express from 'express';

import {
  login,
  logout,
  refreshToken,
  register,
} from '@/controllers/auth.controller';
import { validateData } from '@/middlewares/validation.middleware';
import { userLoginSchema, userRegistrationSchema } from '@/shemas/auth.shema';

const authRouter = express.Router();

authRouter.post('/register', validateData(userRegistrationSchema), register);
authRouter.post('/login', validateData(userLoginSchema), login);
authRouter.post('/logout', logout);
authRouter.post('/refresh-token', refreshToken);

export default authRouter;

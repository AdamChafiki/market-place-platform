import express from 'express';
import {
  login,
  profile,
  refreshToken,
  register,
} from '@/controllers/authController';
import { validateData } from '@/middlewares/validationMiddleware';
import { userLoginSchema, userRegistrationSchema } from '@/shemas/userSchemas';
import authMiddleware from '@/middlewares/jwtMiddleware';

const authRouter = express.Router();

authRouter.post('/register', validateData(userRegistrationSchema), register);
authRouter.post('/login', validateData(userLoginSchema), login);
authRouter.get('/profile', authMiddleware, profile);
authRouter.post('/refresh-token', refreshToken);

export default authRouter;

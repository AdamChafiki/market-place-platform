import express from 'express';
import { login, register } from '@/controllers/authController';
import { validateData } from '@/middlewares/validationMiddleware';
import { userLoginSchema, userRegistrationSchema } from '@/shemas/userSchemas';

const authRouter = express.Router();

authRouter.post('/register', validateData(userRegistrationSchema), register);
authRouter.post('/login', validateData(userLoginSchema), login);

export default authRouter;

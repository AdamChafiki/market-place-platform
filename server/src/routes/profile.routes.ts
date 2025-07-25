import express from 'express';

import jwtMiddleware from '@/middlewares/jwt.middleware';
import { profile } from '@/controllers/profile.controller';

const profileRoute = express.Router();

profileRoute.get('/', jwtMiddleware, profile);

export default profileRoute;

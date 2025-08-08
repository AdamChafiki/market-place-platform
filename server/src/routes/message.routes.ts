import express from 'express';
import {
  sendMessage,
  getMessagesForUser,
  getConversation,
} from '@/controllers/message.controller';
import jwtMiddleware from '@/middlewares/jwt.middleware';

const router = express.Router();

router
  .route('/')
  .post(jwtMiddleware, sendMessage)
  .get(jwtMiddleware, getMessagesForUser);

router.route('/conversation/:userId').get(jwtMiddleware, getConversation);

export default router;

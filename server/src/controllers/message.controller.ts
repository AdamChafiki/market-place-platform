import expressAsyncHandler from 'express-async-handler';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import {
  createMessageService,
  getMessagesByUserIdService,
  getConversationService,
  deleteMessageService,
} from '@/services/message.service';
import { AppError } from '@/utils/AppError';

export const sendMessage = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const senderId = req.user.userId;
    const { receiverId, content } = req.body;

    if (!receiverId || !content) {
      throw new AppError(
        'receiverId and content are required',
        StatusCodes.BAD_REQUEST
      );
    }

    const message = await createMessageService({
      senderId,
      receiverId,
      content,
    });

    res.status(StatusCodes.CREATED).json({ message });
  }
);

export const getMessagesForUser = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user.userId;

    const messages = await getMessagesByUserIdService(userId);

    res.status(StatusCodes.OK).json({ messages });
  }
);

export const getConversation = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user.userId;
    const otherUserId = req.params.userId;

    if (!otherUserId) {
      throw new AppError('User ID is required', StatusCodes.BAD_REQUEST);
    }

    const conversation = await getConversationService(userId, otherUserId);

    res.status(StatusCodes.OK).json({ conversation });
  }
);

export const deleteMessage = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user.userId;
    const messageId = req.params.id;

    if (!messageId) {
      throw new AppError('Message ID is required', StatusCodes.BAD_REQUEST);
    }

    await deleteMessageService(messageId, userId);

    res.status(StatusCodes.NO_CONTENT).send();
  }
);

import { prisma } from '@/lib/prisma';
import { AppError } from '@/utils/AppError';
import { Message } from 'generated/prisma';
import { StatusCodes } from 'http-status-codes';

type CreateMessageInput = {
  senderId: string;
  receiverId: string;
  content: string;
};

export const createMessageService = async (
  data: CreateMessageInput
): Promise<Message> => {

  const receiver = await prisma.user.findUnique({
    where: { id: data.receiverId },
  });

  if (!receiver) {
    throw new AppError('Receiver not found', StatusCodes.NOT_FOUND);
  }

  return await prisma.message.create({
    data: {
      senderId: data.senderId,
      receiverId: data.receiverId,
      content: data.content,
    },
  });
};

export const getMessagesByUserIdService = async (
  userId: string
): Promise<Message[]> => {
  return await prisma.message.findMany({
    where: {
      OR: [{ senderId: userId }, { receiverId: userId }],
    },
    orderBy: { createdAt: 'desc' },
    include: {
      sender: { select: { id: true, username: true } },
      receiver: { select: { id: true, username: true } },
    },
  });
};

export const getConversationService = async (
  userId1: string,
  userId2: string
): Promise<Message[]> => {
  return await prisma.message.findMany({
    where: {
      OR: [
        { senderId: userId1, receiverId: userId2 },
        { senderId: userId2, receiverId: userId1 },
      ],
    },
    orderBy: { createdAt: 'asc' },
  });
};

export const deleteMessageService = async (
  id: string,
  userId: string
): Promise<void> => {
  const message = await prisma.message.findUnique({ where: { id } });

  if (!message) {
    throw new AppError('Message not found', StatusCodes.NOT_FOUND);
  }

  if (message.senderId !== userId && message.receiverId !== userId) {
    throw new AppError(
      'Not authorized to delete this message',
      StatusCodes.FORBIDDEN
    );
  }

  await prisma.message.delete({ where: { id } });
};

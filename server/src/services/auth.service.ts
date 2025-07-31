import bcrypt from 'bcrypt';
import { prisma } from '@/lib/prisma';
import { User } from 'generated/prisma';
import { AppError } from '@/utils/AppError';
import { StatusCodes } from 'http-status-codes';
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from '@/utils/Jwt';
import RegisterUserInterface from '@/types/auth.type';

/**
 * @description Register new user
 */
export const registerUser = async (
  data: RegisterUserInterface
): Promise<User> => {
  const { username, email, password, role } = data;

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      username,
      email,
      role,
      password: hashedPassword,
    },
  });

  return user;
};

/**
 * @description Check if email already exists
 */
export const checkIfUserExists = async (email: string): Promise<boolean> => {
  const user = await prisma.user.findUnique({ where: { email } });
  return !!user;
};

/**
 * @description Authenticate and log in user
 */
export const loginUser = async (
  email: string,
  password: string
): Promise<{
  accessToken: string;
  refreshToken: string;
}> => {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new AppError('Invalid credentials', StatusCodes.BAD_REQUEST);
  }

  const accessToken = generateAccessToken(user.id);
  const refreshToken = generateRefreshToken(user.id);

  return { accessToken, refreshToken };
};

/**
 * @description Refresh access and refresh tokens
 */
export const refreshAccessToken = (
  token: string
): {
  accessToken: string;
  refreshToken: string;
} => {
  const payload = verifyRefreshToken(token) as { userId: number };

  const accessToken = generateAccessToken(payload.userId);
  const refreshToken = generateRefreshToken(payload.userId);

  return { accessToken, refreshToken };
};

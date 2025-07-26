import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcrypt';
import { StatusCodes } from 'http-status-codes';

import { prisma } from '@/lib/prisma';
import { User } from 'generated/prisma';

import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from '@/utils/Jwt';
import config from '@/config/global.config';
import { registerUser } from '@/services/auth.service';
import RegisterUserInterface from '@/types/register.type';
import { AppError } from '@/utils/AppError';

/**
 * @description Register User
 * @router /api/auth/register
 * @method POST
 * @access public
 */
export const register = asyncHandler(
  async (req: Request<{}, {}, RegisterUserInterface>, res: Response) => {
    const { username, email, role, password } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new AppError('Email already exists', StatusCodes.BAD_REQUEST);
    }

    const user = await registerUser({
      username,
      email,
      password,
      role,
    });

    res.status(StatusCodes.CREATED).json({
      user,
      message: 'User registered successfully',
    });
  }
);

/**
 * @description Login User
 * @router /api/auth/login
 * @method POST
 * @access public
 */
export const login = asyncHandler(
  async (
    req: Request<{}, {}, { email: string; password: string }>,
    res: Response
  ) => {
    const { email, password } = req.body;

    const user: User | null = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new AppError('Invalid credentials', StatusCodes.BAD_REQUEST);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new AppError('Invalid credentials', StatusCodes.BAD_REQUEST);
    }

    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: config.nodeEnv === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(StatusCodes.OK).json({ accessToken });
  }
);

/**
 * @description Refresh Token
 * @router /api/auth/refresh-token
 * @method POST
 * @access private
 */
export const refreshToken = asyncHandler(
  async (req: Request, res: Response) => {
    const token = req.cookies.refreshToken;

    if (!token) {
      throw new AppError('No refresh token provided', StatusCodes.UNAUTHORIZED);
    }

    const payload = verifyRefreshToken(token) as { userId: number };

    const newAccessToken = generateAccessToken(payload.userId);
    const newRefreshToken = generateRefreshToken(payload.userId);

    res.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      path: '/login',
    });

    res.status(StatusCodes.OK).json({ accessToken: newAccessToken });
  }
);

/**
 * @description Logout User
 * @router /api/auth/logout
 * @method POST
 * @access private
 */
export const logout = asyncHandler(async (req: Request, res: Response) => {
  res.clearCookie('refreshToken', { path: '/auth/refresh-token' });
  res.status(StatusCodes.OK).json({ message: 'Logged out successfully' });
});

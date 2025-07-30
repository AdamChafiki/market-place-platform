import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { StatusCodes } from 'http-status-codes';

import config from '@/config/global.config';
import {
  checkIfUserExists,
  loginUser,
  refreshAccessToken,
  registerUser,
} from '@/services/auth.service';
import RegisterUserInterface from '@/types/register.type';
import { AppError } from '@/utils/AppError';

/**
 * @description Register User
 */
export const register = asyncHandler(
  async (req: Request<{}, {}, RegisterUserInterface>, res: Response) => {
    const { username, email, role, password } = req.body;

    const exists = await checkIfUserExists(email);
    if (exists) {
      throw new AppError('Email already exists', StatusCodes.BAD_REQUEST);
    }

    const user = await registerUser({ username, email, password, role });

    res.status(StatusCodes.CREATED).json({
      user,
      message: 'User registered successfully',
    });
  }
);

/**
 * @description Login User
 */
export const login = asyncHandler(
  async (
    req: Request<{}, {}, { email: string; password: string }>,
    res: Response
  ) => {
    const { email, password } = req.body;

    const { accessToken, refreshToken } = await loginUser(email, password);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: config.nodeEnv === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(StatusCodes.OK).json({ accessToken });
  }
);

/**
 * @description Refresh Token
 */
export const refreshToken = asyncHandler(
  async (req: Request, res: Response) => {
    const token = req.cookies.refreshToken;

    if (!token) {
      throw new AppError('No refresh token provided', StatusCodes.UNAUTHORIZED);
    }

    const { accessToken, refreshToken: newRefreshToken } =
      refreshAccessToken(token);

    res.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: config.nodeEnv === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(StatusCodes.OK).json({ accessToken });
  }
);

/**
 * @description Logout User
 */
export const logout = asyncHandler(async (_req: Request, res: Response) => {
  res.clearCookie('refreshToken');
  res.status(StatusCodes.OK).json({ message: 'Logged out successfully' });
});

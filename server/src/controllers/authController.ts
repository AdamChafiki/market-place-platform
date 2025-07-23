import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

import { prisma } from '@/lib/prisma';
import { User } from 'generated/prisma';
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from '@/utils/jwtUtils';
import config from '@/config/config';

/**
 * @description Register User
 * @router /api/auth/register
 * @method POST
 * @access public
 */
const register = async (req: Request<{}, {}, User>, res: Response) => {
  const { username, email, role, password } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser)
      return res.status(400).json({ message: 'Email is already exists' });

    const user = await prisma.user.create({
      data: {
        username,
        email,
        role,
        password: await bcrypt.hash(password, 10),
      },
    });
    res.status(200).json({ user, message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * @description Login User
 * @router /api/auth/login
 * @method POST
 * @access public
 */

const login = async (
  req: Request<{}, {}, { email: string; password: string }>,
  res: Response
) => {
  const { email, password } = req.body;

  try {
    const user: User | null = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateAccessToken(user.id);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: config.nodeEnv === 'production', // HTTPS only in prod
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in ms
    });

    res.json({ accessToken });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * @description Refresh  Token
 * @router /api/auth/refresh-token
 * @method POST
 * @access private
 */

export const refreshToken = (req: Request, res: Response) => {
  const token = req.cookies.refreshToken;

  if (!token)
    return res.status(401).json({ message: 'No refresh token provided' });

  try {
    const payload = verifyRefreshToken(token) as { userId: number };

    // Generate new tokens
    const newAccessToken = generateAccessToken(payload.userId);
    const newRefreshToken = generateRefreshToken(payload.userId);

    // Set new refresh token cookie (rotate)
    res.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: '/auth/refresh-token',
    });

    res.json({ accessToken: newAccessToken });
  } catch (err) {
    return res.status(403).json({ message: 'Invalid refresh token' });
  }
};

/**
 * @description Logout User
 * @router /api/auth/logout
 * @method POST
 * @access private
 */

export const logout = (req: Request, res: Response) => {
  res.clearCookie('refreshToken', { path: '/auth/refresh-token' });
  res.status(200).json({ message: 'Logged out successfully' });
};

export { login, register };

import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

import { prisma } from '@/lib/prisma';
const register = async (req: Request, res: Response) => {
  const { username, email, role, password } = req.body;
  const user = await prisma.user.create({
    data: {
      username,
      email,
      role,
      password: await bcrypt.hash(password, 10),
    },
  });
  res.status(200).json({ user, message: 'User registered successfully' });
};

const login = async (req: Request, res: Response) => {
  res.status(200).json({ message: 'Login successful' });
};

export { login, register };

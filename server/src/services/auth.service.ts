import bcrypt from 'bcrypt';
import { prisma } from '@/lib/prisma';
import RegisterUserInterface from '@/types/register.type';
import { User } from 'generated/prisma';

export const registerUser = async (data: RegisterUserInterface) => {
  const { username, email, password, role } = data;

  const hashedPassword = await bcrypt.hash(password, 10);

  const user: User = await prisma.user.create({
    data: {
      username,
      email,
      role,
      password: hashedPassword,
    },
  });

  return user;
};

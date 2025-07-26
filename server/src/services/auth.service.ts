import bcrypt from 'bcrypt';
import { prisma } from '@/lib/prisma';
import RegisterUserInterface from '@/types/register.type';

export const registerUser = async (data: RegisterUserInterface) => {
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

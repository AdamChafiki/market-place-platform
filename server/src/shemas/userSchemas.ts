import { z } from 'zod';

export const userRegistrationSchema = z.object({
  username: z.string(),
  email: z.email(),
  password: z.string().min(6),
  role: z.enum(['buyer', 'seller']),
});

export const userLoginSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
});

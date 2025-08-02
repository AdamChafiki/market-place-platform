import { z } from 'zod';

export const announcementSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
  location: z.string().min(1, { message: 'Location is required' }),
  phoneNumber: z
    .string()
    .min(10, { message: 'Phone number must be at least 10 digits' })
    .max(20, { message: 'Phone number is too long' }),
  hidePhone: z
    .string()
    .transform((val) => val === 'true')
    .pipe(z.boolean())
    .optional()
    .default(false),
  price: z.number().min(0),
  userId: z.uuid({ message: 'Invalid user ID' }),
});

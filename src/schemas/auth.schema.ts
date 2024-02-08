import { z } from 'zod';

export const emailSchema = z
  .string()
  .email('auth.errors.email-invalid')
  .min(1, 'auth.errors.email-required');

export const signupSchema = z.object({
  email: emailSchema,
  password: z.string().min(8, 'auth.errors.password-invalid'),
  nickname: z.string().min(1, 'auth.errors.nickname-required'),
});

export const signInSchema = z.object({
  email: emailSchema,
  password: z.string().min(8, 'auth.errors.password-invalid'),
});

"use server";

import { prisma } from "@/lib/prisma";
import { compare, hash } from "bcryptjs";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
});

export async function loginUser(data: unknown) {
  const parsed = loginSchema.safeParse(data);
  if (!parsed.success) return { error: "Invalid input" };

  const { email, password } = parsed.data;
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || !user.hashedPassword) return { error: "Invalid credentials" };

  const isValid = await compare(password, user.hashedPassword);
  if (!isValid) return { error: "Invalid credentials" };

  return { user };
}

export async function registerUser(data: unknown) {
  const parsed = registerSchema.safeParse(data);
  if (!parsed.success) return { error: "Invalid input" };

  const { name, email, password } = parsed.data;
  const existing = await prisma.user.findUnique({ where: { email } });

  if (existing) return { error: "Email already in use" };

  const hashedPassword = await hash(password, 12);
  const user = await prisma.user.create({
    data: { name, email, hashedPassword, role: "PLAYER" },
  });

  return { user };
}

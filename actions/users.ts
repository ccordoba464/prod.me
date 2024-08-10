"use server";

import { prisma } from "@/lib/prisma";
import { User } from "@prisma/client";

export async function createUser(userId: string, email: string) {
  const user = await prisma.user.create({ data: { id: userId, email: email } });

  return user;
}

export async function getUserById(id: string) {
  try {
    const user = await prisma.user.findUnique({ where: { id: id } });
    return user;
  } catch (error) {
    return null;
  }
}

export async function updateUser(id: string, data: Partial<User>) {
  try {
    const user = await prisma.user.update({ where: { id }, data });
    return user;
  } catch (error) {
    return null;
  }
}

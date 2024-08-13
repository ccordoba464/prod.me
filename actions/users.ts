"use server";

import { prisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";
import { User } from "@prisma/client";

export async function createUser(userId: string, email: string) {
  const user = await prisma.user.create({ data: { id: userId, email: email } });

  return user;
}

export async function getCurrentUser() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const currentUser = await prisma.user.findUnique({ where: { id: user.id } });

  return currentUser;
}

export async function getUserById(id: string) {
  const user = await prisma.user.findUnique({ where: { id: id } });
  return user;
}

export async function updateUser(id: string, data: Partial<User>) {
  try {
    const user = await prisma.user.update({ where: { id }, data });
    return user;
  } catch (error) {
    return null;
  }
}

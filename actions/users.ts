"use server";

import { prisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";
import { User } from "@prisma/client";
import { redirect } from "next/navigation";

export async function createUser(
  userId: string,
  email: string,
  username: string
) {
  const user = await prisma.user.create({
    data: { id: userId, email: email, username: username },
  });

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

export async function updateUser(attributes: { [key: string]: string }) {
  const supabase = createClient();

  const { data, error } = await supabase.auth.updateUser(attributes);

  if (error || !data.user) {
    console.error("Failed to update user:", error);
    return null;
  }

  const updatedUser = await prisma.user.update({
    where: { id: data.user.id },
    data: attributes,
  });

  if (!updatedUser) {
    console.error("Failed to update user in Prisma");
    return null;
  }

  return updatedUser;
}

"use server";

import { prisma } from "@/lib/prisma";
import { User } from "@prisma/client";
import { currentUser } from "@clerk/nextjs/server";

export async function createUser(
  data: Omit<User, "id" | "created_at" | "updated_at">
) {
  try {
    const user = await prisma.user.create({ data });
    return user;
  } catch (error) {
    console.error("Error creating user", error);
    return null;
  }
}

export async function getUserById({ id }: { id: string }) {
  try {
    const user = await prisma.user.findUnique({ where: { id: id } });
    return user;
  } catch (error) {
    return null;
  }
}

export async function getUserByClerkId({ clerk_id }: { clerk_id: string }) {
  try {
    const user = await prisma.user.findUnique({
      where: { clerk_user_id: clerk_id },
    });
    return user;
  } catch (error) {
    console.error("Error fetching user by clerk id", error);
    return null;
  }
}

export async function getDbUserFromClerkUser(clerk_id: string) {
  try {
    const dbUser = await getUserByClerkId({ clerk_id: clerk_id });

    if (!dbUser) {
      throw new Error("No corresponding database user found");
    }

    return dbUser;
  } catch (error) {
    console.error("Error getting db user from clerk user", error);
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

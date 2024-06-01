import { prisma } from "@/lib/prisma";
import { User } from "@prisma/client";

export async function createUser(
  data: Omit<User, "id" | "created_at" | "updated_at">
) {
  try {
    const user = await prisma.user.create({ data });
    return user;
  } catch (error) {
    console.error("Error creating user", error);
    return { error };
  }
}

export async function getUserById({ id }: { id: string }) {
  try {
    const user = await prisma.user.findUnique({ where: { id: id } });
    return user;
  } catch (error) {
    return { error };
  }
}

export async function updateUser(id: string, data: Partial<User>) {
  try {
    const user = await prisma.user.update({ where: { id }, data });
    return user;
  } catch (error) {
    return { error };
  }
}

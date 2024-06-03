"use server";

import { prisma } from "../lib/prisma";
import { User } from "@prisma/client";
import { auth } from "@clerk/nextjs/server";
import { getDbUserFromClerkUser } from "./users";

export async function createProject() {
  try {
    const { userId } = auth();

    if (!userId) {
      throw new Error("No user found");
    }

    const dbUser = await getDbUserFromClerkUser(userId);

    if (!dbUser || !dbUser.id) {
      throw new Error("No corresponding database user found");
    }

    const projectData = {
      user_id: dbUser.id,
      title: "New Project",
      description: "",
      cover_image_url: "",
    };

    const project = await prisma.project.create({ data: projectData });

    return project;
  } catch (error) {
    console.error("Error creating project:", error);
    return { error };
  }
}

export async function fetchProjects(data: User) {
  try {
    const projects = await prisma.project.findMany({
      where: { user_id: data.clerk_user_id },
    });
    return projects;
  } catch (error) {
    console.error("Error fetching projects:", error);
    return { error };
  }
}

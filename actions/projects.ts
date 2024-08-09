"use server";

import { prisma } from "../lib/prisma";
import { User } from "@prisma/client";
import { auth } from "@clerk/nextjs/server";
import { getDbUserFromClerkUser } from "./users";

export async function createProject(
  title: string,
  description: string,
  image_path: string
) {
  try {
    const { userId } = auth();

    if (!userId) {
      throw new Error("No user found");
    }

    console.log("userId", userId);

    const dbUser = await getDbUserFromClerkUser(userId);

    if (!dbUser || !dbUser.id) {
      throw new Error("No corresponding database user found");
    }

    const projectData = {
      user_id: dbUser.id,
      title: title,
      description: description,
      image_path: image_path,
    };

    const project = await prisma.project.create({ data: projectData });

    return project;
  } catch (error) {
    console.error("Error creating project:", error);
    return null;
  }
}

export async function updateProject(
  projectId: string,
  title: string,
  description: string,
  image_path: string
) {
  try {
    await prisma.project.update({
      where: { id: projectId },
      data: { title, description, image_path },
    });

    return true;
  } catch (error) {
    console.error("Error updating project:", error);
    return false;
  }
}

export async function deleteProject(projectId: string) {
  try {
    await prisma.project.delete({ where: { id: projectId } });
    return true;
  } catch (error) {
    console.error("Error deleting project:", error);
    return false;
  }
}

export async function fetchProjects() {
  try {
    const { userId } = auth();

    if (!userId) {
      throw new Error("No user found");
    }

    const dbUser = await getDbUserFromClerkUser(userId);

    if (!dbUser || !dbUser.id) {
      throw new Error("No corresponding database user found");
    }

    const projects = await prisma.project.findMany({
      where: { user_id: dbUser.id },
    });
    return projects;
  } catch (error) {
    console.error("Error fetching projects:", error);
    return null;
  }
}

export async function getProject(projectId: string) {
  try {
    const projectData = await prisma.project.findUnique({
      where: { id: projectId },
    });

    return projectData;
  } catch (error) {
    console.error("Error fetching project:", error);
    return null;
  }
}

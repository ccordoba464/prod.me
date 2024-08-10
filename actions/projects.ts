"use server";

import { prisma } from "../lib/prisma";
import { createClient } from "@/lib/supabase/server";

export async function createProject(
  title: string,
  description: string,
  image_path: string
) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const projectData = {
    user_id: user.id,
    title: title,
    description: description,
    image_path: image_path,
  };

  const project = await prisma.project.create({ data: projectData });

  return project;
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
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const projects = await prisma.project.findMany({
    where: { user_id: user.id },
  });

  return projects;
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

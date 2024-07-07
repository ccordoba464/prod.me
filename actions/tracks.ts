"use server";

import { prisma } from "../lib/prisma";
import { User } from "@prisma/client";
import { auth } from "@clerk/nextjs/server";
import { getDbUserFromClerkUser } from "./users";

export async function createTrack(title: string = "Untitled Track") {
  try {
    const { userId } = auth();

    if (!userId) {
      throw new Error("No user found");
    }

    const dbUser = await getDbUserFromClerkUser(userId);

    if (!dbUser || !dbUser.id) {
      throw new Error("No corresponding database user found");
    }

    const trackData = {
      user_id: dbUser.id,
      title: title,
      description: "Fetch file name when uploading",
      genre: "N/A",
      cover_image_url: "",
    };

    const track = await prisma.track.create({ data: trackData });

    return track;
  } catch (error) {
    console.error("Error creating project:", error);
    return null;
  }
}

export async function fetchTracks(data: User) {
  try {
    const projects = await prisma.project.findMany({
      where: { user_id: data.clerk_user_id },
    });
    return projects;
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}

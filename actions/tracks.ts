"use server";

import { prisma } from "../lib/prisma";
import { User } from "@prisma/client";
import { auth } from "@clerk/nextjs/server";
import { getDbUserFromClerkUser } from "./users";
import { deleteProjectTrack } from "./project-tracks";

export async function createTrack(title: string, songPath: string) {
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
      song_path: songPath,
    };

    const track = await prisma.track.create({ data: trackData });

    return track;
  } catch (error) {
    console.error("Error creating project:", error);
    return null;
  }
}

export async function updateTrack(
  trackId: string,
  title: string,
  description: string
) {
  try {
    await prisma.track.update({
      where: { id: trackId },
      data: {
        title: title,
        description: description,
      },
    });

    return true;
  } catch (error) {
    console.error("Error updating track:", error);
    return false;
  }
}

export async function deleteTrack(trackId: string) {
  try {
    // First delete all related project tracks
    const deletedProjectTracks = await deleteProjectTrack(trackId);
    if (!deletedProjectTracks) {
      throw new Error("Failed to delete related project tracks");
    }

    // Then delete the track itself
    await prisma.track.delete({ where: { id: trackId } });
    return true;
  } catch (error) {
    console.error("Error deleting track:", error);
    return false;
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

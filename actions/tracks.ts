"use server";

import { prisma } from "../lib/prisma";
import { createClient } from "@/lib/supabase/server";
import { deleteProjectTrack } from "./project-tracks";

export async function createTrack(
  title: string,
  songPath: string,
  imagePath: string
) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const trackData = {
    user_id: user?.id,
    title: title,
    description: "Fetch file name when uploading",
    genre: "N/A",
    image_path: imagePath,
    song_path: songPath,
  };

  const track = await prisma.track.create({ data: trackData });

  return track;
}

export async function updateTrack(
  trackId: string,
  title: string,
  description: string
) {
  const updatedTrack = await prisma.track.update({
    where: { id: trackId },
    data: {
      title: title,
      description: description,
    },
  });

  return updatedTrack;
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

export async function fetchTracks() {
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

export async function fetchTrackWithId(trackId: string) {
  const track = await prisma.track.findUnique({
    where: { id: trackId },
  });

  return track;
}

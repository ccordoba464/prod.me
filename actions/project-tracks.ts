"use server";

import { prisma } from "@/lib/prisma";

export async function fetchProjectTracks(projectId: string) {
  try {
    const projectTracks = await prisma.project_track.findMany({
      where: { project_id: projectId },
      include: { track: true },
    });

    return projectTracks;
  } catch (error) {
    console.error("Error fetching project tracks:", error);
    return [];
  }
}

export async function createProjectTrack(projectId: string, trackId: string) {
  try {
    const projectTrackData = {
      project_id: projectId,
      track_id: trackId,
      position: 1,
    };

    const projectTrack = await prisma.project_track.create({
      data: projectTrackData,
    });

    return projectTrack;
  } catch (error) {
    console.error("Error creating project track:", error);
    return null;
  }
}

export async function deleteProjectTrack(trackId: string) {
  try {
    await prisma.project_track.deleteMany({ where: { track_id: trackId } });
    return true;
  } catch (error) {
    console.error("Error deleting project track:", error);
    return false;
  }
}

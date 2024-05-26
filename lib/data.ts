import { unstable_noStore as noStore } from "next/cache";
import { prisma } from "../prisma/prisma";

export async function fetchTracks() {
  try {
    const tracks = await prisma.track.findMany();
    return tracks;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch tracks data.");
  }
}

export async function fetchBeats() {
  noStore();
  try {
    const data = await sql<Beat>`SELECT * FROM beats`;
    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch beats data.");
  }
}

export async function getUser(userid: string) {
  noStore();
  try {
    const user = await sql<User>`SELECT * FROM users WHERE id=${userid}`;
    return user.rows[0];
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}

export async function getBeat(beatid: string) {
  noStore();
  try {
    const data = await sql<Beat>`SELECT * FROM beats WHERE id=${beatid}`;
    return data.rows[0];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch beat.");
  }
}

export async function getTrackWithVersions(trackid: string) {
  noStore();
  try {
    const trackPromise =
      await sql<Track>`SELECT * FROM tracks WHERE id=${trackid}`;
    const versionsPromise =
      await sql<Track_version>`SELECT * FROM track_versions WHERE track_id=${trackid} ORDER BY version_number DESC`;

    const [track, versions] = await Promise.all([
      trackPromise,
      versionsPromise,
    ]);
    return {
      track: track.rows[0],
      versions: versions.rows,
    };
  } catch (error) {
    console.error("Failed to fetch track:", error);
    throw new Error("Failed to fetch track.");
  }
}

export async function fetchUserTracks(userid: string) {
  noStore();
  try {
    const data = await sql<Track>`SELECT * FROM tracks WHERE user_id=${userid}`;
    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch user tracks.");
  }
}

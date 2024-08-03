import { supabase } from "@/lib/supabase/client";
import { prisma } from "@/lib/prisma";
import uniqid from "uniqid";

export async function uploadAudioToSupabase(file: File) {
  const uniqueID = uniqid();
  const { data, error } = await supabase.storage
    .from("songs")
    .upload(`song-${file.name}-${uniqueID}`, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    throw new Error("Failed to upload song");
  }

  return data;
}

export async function uploadImageToSupabase(file: File) {
  const uniqueID = uniqid();
  const { data, error } = await supabase.storage
    .from("images")
    .upload(`image-${file.name}-${uniqueID}`, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    throw new Error("Failed to upload image");
  }

  return data;
}

import { supabase } from "@/lib/supabase/client";

export const useLoadImage = (image_path: string) => {
  if (!image_path) {
    console.log("No image path");
    return null;
  }

  const { data: imageData } = supabase.storage
    .from("images")
    .getPublicUrl(image_path);

  return imageData.publicUrl;
};

import { loadTrackFromSupabase } from "@/actions/supabase-actions";
import { supabase } from "@/lib/supabase/client";

export const useLoadTrackUrl = (trackPath: string) => {
  if (!trackPath) {
    return null;
  }

  const { data: trackData } = supabase.storage
    .from("songs")
    .getPublicUrl(trackPath);

  return trackData.publicUrl;
};

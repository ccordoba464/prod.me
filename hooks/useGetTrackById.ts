import { fetchTrackWithId } from "@/actions/tracks";
import { Track } from "@prisma/client";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";

export const useGetSongById = (id?: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [track, setSong] = useState<Track | undefined>(undefined);

  useEffect(() => {
    if (!id) {
      return;
    }

    setIsLoading(true);

    const fetchSong = async () => {
      const track = await fetchTrackWithId(id);

      if (!track) {
        setIsLoading(false);
        return toast.error("Track not found");
      }

      setSong(track);
      setIsLoading(false);
    };

    fetchSong();
  }, [id]);

  return useMemo(
    () => ({
      isLoading,
      track,
    }),
    [isLoading, track]
  );
};

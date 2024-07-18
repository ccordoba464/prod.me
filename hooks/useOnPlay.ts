import { usePlayer } from "@/hooks/usePlayer";
import { Track } from "@prisma/client";

export const useOnPlay = (tracks: Track[]) => {
  const player = usePlayer();

  const onPlay = (id: string) => {
    player.setId(id);
    player.setIds(tracks.map(track => track.id));
  };

  return onPlay;
};

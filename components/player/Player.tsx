"use client";

import { usePlayer } from "@/hooks/usePlayer";
import PlayerContent from "./PlayerContent";
import { useGetSongById } from "@/hooks/useGetTrackById";
import { useLoadTrackUrl } from "@/hooks/useLoadTrackUrl";
import { useLoadImage } from "@/hooks/useLoadImage";

const Player = () => {
  const player = usePlayer();
  const { track } = useGetSongById(player.activeId);
  const trackUrl = useLoadTrackUrl(track?.song_path!);
  const imageUrl = useLoadImage(track?.image_path!);

  if (!track || !trackUrl || !imageUrl || !player.activeId) {
    return null;
  }

  return (
    <div className="fixed bottom-0 flex w-full py-6 items-center justify-center text-white font-bold">
      <PlayerContent track={track} trackUrl={trackUrl} imageUrl={imageUrl} />
    </div>
  );
};

export default Player;

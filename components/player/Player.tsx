"use client";

import { useEffect, useState } from "react";
import { usePlayer } from "@/hooks/usePlayer";
import PlayerContent from "./PlayerContent";
import { useGetSongById } from "@/hooks/useGetTrackById";
import { useLoadTrackUrl } from "@/hooks/useLoadTrackUrl";
import { useLoadImage } from "@/hooks/useLoadImage";
import { getUserById } from "@/actions/users";
import { User } from "@prisma/client";

const Player = () => {
  const player = usePlayer();
  const { track } = useGetSongById(player.activeId);
  const trackUrl = useLoadTrackUrl(track?.song_path!);
  const imageUrl = useLoadImage(track?.image_path!);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function fetchUser() {
      if (track?.user_id) {
        const fetchedUser = await getUserById(track.user_id);
        setUser(fetchedUser);
      }
    }
    fetchUser();
  }, [track?.user_id]);

  if (!track || !trackUrl || !imageUrl || !player.activeId || !user) {
    return null;
  }

  return (
    <div className="fixed bottom-0 flex w-full py-4 items-center justify-center text-white font-bold border-t">
      <PlayerContent
        track={track}
        trackUrl={trackUrl}
        imageUrl={imageUrl}
        user={user}
      />
    </div>
  );
};

export default Player;

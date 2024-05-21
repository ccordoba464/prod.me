"use client";

import { usePlayer } from "@/context/PlayerContext";

interface PlayerButtonProps {
  fileUrl: string;
}

export const PlayerControls = ({ fileUrl }: PlayerButtonProps) => {
  const { playTrack } = usePlayer();

  return (
    <button
      className="bg-red-500 px-6 py-1 rounded-lg text-white "
      onClick={() => playTrack(fileUrl)}
    >
      Play
    </button>
  );
};

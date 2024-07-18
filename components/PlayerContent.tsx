"use client";

import { usePlayer } from "@/hooks/usePlayer";

interface PlayerButtonProps {
  fileUrl: string;
}

export const PlayerControls = ({ fileUrl }: PlayerButtonProps) => {
  const player = usePlayer();

  return (
    <button className="bg-red-500 px-6 py-1 rounded-lg text-white " onClick={}>
      Play
    </button>
  );
};

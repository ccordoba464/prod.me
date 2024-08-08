"use client";

import { useEditTrackModal } from "@/hooks/useEditTrackModal";
import { usePlayer } from "@/hooks/usePlayer";
import { Track } from "@prisma/client";
import { SlOptions } from "react-icons/sl";

interface ProjectTrackItemProps {
  projectTrack: {
    project_id: string;
    track_id: string;
    position: number;
    track: Track;
  };
}

export default function ProjectTrackItem({
  projectTrack,
}: ProjectTrackItemProps) {
  const { project_id, track_id, position, track } = projectTrack;

  const editTrackModal = useEditTrackModal();
  const player = usePlayer();

  const onClick = async () => {
    editTrackModal.onOpen(track);
  };

  const handleClick = () => {
    return player.setId(track_id);
  };

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onClick();
  };

  return (
    <li
      className="flex justify-between items-center hover:border px-4 py-2 rounded-lg cursor-pointer"
      onClick={handleClick}
    >
      <div>
        <p>
          {position}. {track?.title}
        </p>
        <p className="text-zinc-400">May 7, 2024</p>
      </div>
      <button
        className="
        text-white w-8 h-6 rounded-lg flex items-center 
        justify-center hover:bg-zinc-900 z-10"
        onClick={handleButtonClick}
      >
        <SlOptions />
      </button>
    </li>
  );
}

"use client";

import uniqid from "uniqid";
import { useRef } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

import { createTrack } from "@/actions/tracks";
import { createProjectTrack } from "@/actions/project-tracks";
import { uploadAudioToSupabase } from "@/actions/supabase-actions";
import { SlOptions } from "react-icons/sl";
import { IoAdd } from "react-icons/io5";
import { BsPlayFill } from "react-icons/bs";
import { usePlayer } from "@/hooks/usePlayer";
import { Project_track, Track } from "@prisma/client";

interface PlayProjectButtonProps {
  projectTracks: (Project_track & { track: Track })[];
}

export default function PlayProjectButton({
  projectTracks,
}: PlayProjectButtonProps) {
  const player = usePlayer();

  const handleClick = () => {
    player.reset();
    const trackIds = projectTracks.map(projectTrack => projectTrack.track_id);
    if (trackIds.length > 0) {
      player.setIds(trackIds);
      player.setId(trackIds[0]);
      toast.success("Playing the first track in the project!");
    } else {
      toast.error("No tracks available to play.");
    }
  };

  return (
    <>
      <div
        onClick={handleClick}
        className="rounded-full bg-red-500 size-10 flex items-center justify-center cursor-pointer"
      >
        <BsPlayFill size={26} />
      </div>
    </>
  );
}

"use client";

import uniqid from "uniqid";
import { useRef } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

import { BsPlayFill } from "react-icons/bs";
import { usePlayer } from "@/hooks/usePlayer";
import { Project_track, Track } from "@prisma/client";
import { Button } from "../ui/button";

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
    <Button
      onClick={handleClick}
      className="rounded-full"
      variant={"outline"}
      size="icon"
    >
      <BsPlayFill size={24} />
    </Button>
  );
}

"use client";

import uniqid from "uniqid";
import { useRef } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

import { createTrack } from "@/actions/tracks";
import { createProjectTrack } from "@/actions/project-tracks";
import { supabase } from "@/lib/supabase/client";

export default function CreateTrackButton({
  projectid,
}: {
  projectid: string;
}) {
  const hiddenFileInput = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  const handleClick = () => {
    if (hiddenFileInput.current) {
      hiddenFileInput.current.click();
    }
  };
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await uploadAudio(file);
    }
  };

  const uploadAudio = async (ProjectTrackFile: File) => {
    const uniqueID = uniqid();

    const { data: songData, error: songError } = await supabase.storage
      .from("songs")
      .upload(`song-${ProjectTrackFile.name}-${uniqueID}`, ProjectTrackFile, {
        cacheControl: "3600",
        upsert: false,
      });

    if (songError) {
      return toast.error("Failed song upload");
    }

    const track = await createTrack(ProjectTrackFile.name);

    if (!track) {
      return toast.error("Failed to create track");
    }

    const projectTrack = await createProjectTrack(projectid, track.id);

    if (!projectTrack) {
      return toast.error("Failed to create track");
    }

    router.refresh();
    toast.success("Song created!");
  };

  return (
    <>
      <button
        className="px-4 py-2 mb-10 rounded-lg bg-red-500 text-white font-bold"
        onClick={handleClick}
      >
        + Add tracks
      </button>
      <input
        type="file"
        onChange={handleChange}
        ref={hiddenFileInput}
        accept="audio/*"
        hidden
      />
    </>
  );
}

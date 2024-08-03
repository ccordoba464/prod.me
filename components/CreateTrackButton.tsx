"use client";

import uniqid from "uniqid";
import { useRef } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

import { createTrack } from "@/actions/tracks";
import { createProjectTrack } from "@/actions/project-tracks";
import { uploadAudioToSupabase } from "@/actions/supabase-actions";

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
    const trackData = await uploadAudioToSupabase(ProjectTrackFile);

    if (!trackData) {
      return toast.error("Failed to upload track");
    }

    console.log(trackData);

    toast.success("Track uploaded!");

    const track = await createTrack(ProjectTrackFile.name);

    if (!track) {
      return toast.error("Failed to create track");
    }

    const projectTrack = await createProjectTrack(projectid, track.id);

    if (!projectTrack) {
      return toast.error("Failed to create project track");
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

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

export default function CreateTrackButton({
  projectid,
}: {
  projectid: string;
}) {
  const hiddenFileInput = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  const handleClick = () => {
    hiddenFileInput.current!.click();
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

    const track = await createTrack(ProjectTrackFile.name, trackData.path);

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
      <div
        onClick={handleClick}
        className="rounded-full bg-red-500 size-10 flex items-center justify-center cursor-pointer"
      >
        <IoAdd size={26} />
      </div>
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

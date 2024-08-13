"use client";

import uniqid from "uniqid";
import { useRef } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

import { createTrack } from "@/actions/tracks";
import { createProjectTrack } from "@/actions/project-tracks";
import { uploadAudioToSupabase } from "@/actions/supabase-actions";
import { IoAdd } from "react-icons/io5";
import { Project } from "@prisma/client";
import { Button } from "../ui/button";

export default function CreateTrackButton({ project }: { project: Project }) {
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

    toast.success("Track uploaded!");

    const track = await createTrack(
      ProjectTrackFile.name,
      trackData.path,
      project.image_path
    );

    if (!track) {
      return toast.error("Failed to create track");
    }

    const projectTrack = await createProjectTrack(project.id, track.id);

    if (!projectTrack) {
      return toast.error("Failed to create project track");
    }

    router.refresh();
    toast.success("Track created!");
  };

  return (
    <>
      <Button
        onClick={handleClick}
        className="rounded-full "
        variant={"outline"}
        size="icon"
      >
        <IoAdd size={20} />
      </Button>
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

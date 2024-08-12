"use client";

import { Button } from "@/components/ui/button";
import { SlOptions } from "react-icons/sl";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Project } from "@prisma/client";
import { deleteProject } from "@/actions/projects";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import {
  deleteProjectTrack,
  fetchProjectTracks,
} from "@/actions/project-tracks";
import { loadTrackFromSupabase } from "@/actions/supabase-actions";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useLoadImage } from "@/hooks/useLoadImage";
import Image from "next/image";

interface MediaProps {
  project: Project;
}

export default function MediaItem({ project }: MediaProps) {
  const router = useRouter();

  const imageUrl = useLoadImage(project?.image_path);

  if (!imageUrl) {
  }

  const handleExport = async () => {
    if (project) {
      try {
        const projectTracks = await fetchProjectTracks(project.id);
        const zip = new JSZip();

        for (const projectTrack of projectTracks) {
          const data = await loadTrackFromSupabase(
            projectTrack.track?.song_path!
          );
          zip.file(`${projectTrack.track.title}.mp3`, data, { binary: true });
        }

        const zipContent = await zip.generateAsync({ type: "blob" });
        saveAs(zipContent, `${project.title}_tracks.zip`);

        toast.success("Tracks downloaded successfully");
      } catch (error) {
        toast.error("Failed to download tracks");
      }
    } else {
      toast.error("Project not found");
    }
  };

  const handleDelete = async () => {
    const projectTracks = await fetchProjectTracks(project.id);

    for (const projectTrack of projectTracks) {
      const data = await deleteProjectTrack(projectTrack.track_id);
      if (!data) {
        toast.error("Failed to delete project track");
        return;
      }
    }

    const data = await deleteProject(project.id);

    if (data) {
      toast.success("Project deleted");
      router.refresh();
    } else {
      toast.error("Failed to delete project");
    }
  };

  return (
    <div className="flex flex-col w-[180px]">
      <Link href={`/project/${project.id}`}>
        <div className="w-[180px] h-[180px] overflow-hidden bg-[#3b4045] rounded-md">
          {imageUrl === "" ? (
            <span className="text-white">Change Cover Art</span>
          ) : (
            <Image
              className="object-cover w-full h-full"
              src={imageUrl!}
              width={384}
              height={384}
              alt="cover art"
            />
          )}
        </div>{" "}
      </Link>

      <div className="flex justify-between mt-2">
        <div className="text-white">{project.title}</div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="p-0 size-6 z-1" variant="outline" size="icon">
              <SlOptions />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="top" align="center">
            <DropdownMenuItem onClick={handleExport}>
              Export Project
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleDelete}>
              Delete Project
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

import { Suspense } from "react"; // Use this if you have a skeleton component
import { SlOptions } from "react-icons/sl";
import { ModeToggle } from "@/components/ModeToggle";
import { useProjectModal } from "@/hooks/useProjectModal";
import { fetchProjects, createProject } from "@/actions/projects";
import { toast } from "react-hot-toast";

import MediaItem from "@/components/MediaItem";
import { Project } from "@prisma/client";
import { CreateProjectButton } from "@/components/project/CreateProjectButton";

//import { RevenueChartSkeleton } from "@/app/ui/skeletons"; // This is a skeleton component, replace the loading... fallback

export default async function Home() {
  //const { data, error } = fetchCardData();

  const projects = await fetchProjects();

  return (
    <div className="text-neutral-400  w-full h-screen overflow-hidden overflow-y-auto p-2">
      <div className="mt-2 mb-7 px-6">
        <div className="flex justify-between items-center">
          <h1 className="text-white text-4xl font-semibold">Newest Songs</h1>
          <ModeToggle />
          <CreateProjectButton />
        </div>
      </div>
      <div className="p-6 flex gap-10">
        {projects?.map((project: Project) => (
          <MediaItem key={project.id} project={project} />
        ))}
      </div>
      test
    </div>
  );
}

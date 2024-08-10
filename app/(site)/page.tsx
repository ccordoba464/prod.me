import { Suspense } from "react"; // Use this if you have a skeleton component
import { ModeToggle } from "@/components/ModeToggle";
import { fetchProjects } from "@/actions/projects";

import MediaItem from "@/components/MediaItem";
import { Project } from "@prisma/client";
import { CreateProjectButton } from "@/components/project/CreateProjectButton";

import { createClient } from "@/lib/supabase/server";

//import { RevenueChartSkeleton } from "@/app/ui/skeletons"; // This is a skeleton component, replace the loading... fallback

export default async function Home() {
  const projects = await fetchProjects();

  return (
    <div className="text-neutral-400 flex flex-col w-full h-full overflow-hidden overflow-y-auto">
      <div className="mt-2 mb-7 px-6">
        <div className="flex justify-between items-center">
          <h1 className="text-white text-4xl font-semibold">Projects</h1>
          <ModeToggle />
          <CreateProjectButton />
        </div>
      </div>
      <div className="p-6 flex flex-wrap gap-10  justify-start items-start">
        {projects?.map((project: Project) => (
          <>
            <MediaItem key={project.id} project={project} />
          </>
        ))}
      </div>
    </div>
  );
}

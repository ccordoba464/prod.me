import {
  InsightCard,
  TrackInsightCard,
  BeatInsightCard,
} from "@/components/InsightCard";
import { ProjectCard } from "@/components/ProjectCard";
import { Suspense } from "react";
import { Divider } from "@chakra-ui/react";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

interface LibraryProps {
  params: {
    userid: string;
  };
}

export default async function Library({ params }: LibraryProps) {
  const [tracks, beats, projects] = await Promise.all([
    await prisma.track.findMany({ where: { user_id: params.userid } }),
    await prisma.beat.findMany({ where: { user_id: params.userid } }),
    await prisma.project.findMany({ where: { user_id: params.userid } }),
  ]);

  return (
    <div className="flex flex-col gap-4 mb-20">
      <div className="">
        <div className="text-lg mb-2">Continue working</div>
        <Suspense fallback={<div>TESTING</div>}>
          <div className="flex w-full justify-between"></div>
        </Suspense>
      </div>

      <Divider />

      <div className="">
        <div className="text-xl mb-2">Projects</div>
        <div className="flex w-full justify-between">
          {projects.map((project: any) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>

      <Divider />

      <div className="">
        <div className="text-xl mb-2">Tracks</div>
        <Suspense fallback={<div>TESTING</div>}>
          {false &&
            tracks.map((track: any) => (
              <TrackInsightCard key={track.id} track={track} />
            ))}
        </Suspense>
      </div>

      <Divider />

      <div className="">
        <div className="text-xl mb-2">Beats</div>
        <Suspense fallback={<div>TESTING</div>}>
          {false &&
            beats.map((beat: any) => (
              <BeatInsightCard key={beat.id} beat={beat} />
            ))}
        </Suspense>
      </div>

      <Divider />

      <div className="">
        <div className="text-xl mb-2">Opens</div>
        <Suspense fallback={<div>TESTING</div>}>
          {false &&
            tracks.map((track: any) => (
              <InsightCard key={track.id} track={track} />
            ))}
        </Suspense>
      </div>
    </div>
  );
}

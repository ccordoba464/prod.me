import { InsightCard, TrackInsightCard } from "@/components/InsightCard";
import { ProjectCard } from "@/components/ProjectCard";
import { fetchTracks, fetchBeats } from "@/lib/data";
import { Suspense } from "react";
import { Divider } from "@chakra-ui/react";

interface LibraryProps {
  params: {
    userid: string;
  };
}

export default async function Library({ params }: LibraryProps) {
  const tracks = await fetchTracks();
  const beats = await fetchBeats();

  return (
    <div className="flex flex-col gap-4 mb-20">
      <div className="">
        <div className="text-lg mb-2">Continue working</div>
        <Suspense fallback={<div>TESTING</div>}>
          <div className="flex w-full justify-between">
            <ProjectCard />
            <ProjectCard />
            <ProjectCard />
            <ProjectCard />
            <ProjectCard />
            <ProjectCard />
          </div>
        </Suspense>
      </div>

      <Divider />

      <div className="">
        <div className="text-xl mb-2">Tracks</div>
        <Suspense fallback={<div>TESTING</div>}>
          {tracks.map(track => (
            <InsightCard key={track.id} track={track} />
          ))}
        </Suspense>
      </div>

      <Divider />

      <div className="">
        <div className="text-xl mb-2">Beats</div>
        <Suspense fallback={<div>TESTING</div>}>
          {tracks.map(track => (
            <InsightCard key={track.id} track={track} />
          ))}
        </Suspense>
      </div>

      <Divider />

      <div className="">
        <div className="text-xl mb-2">Opens</div>
        <Suspense fallback={<div>TESTING</div>}>
          {tracks.map(track => (
            <InsightCard key={track.id} track={track} />
          ))}
        </Suspense>
      </div>
    </div>
  );
}

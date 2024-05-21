import {
  InsightCard,
  TrackInsightCard,
  BeatInsightCard,
} from "@/components/InsightCard";
import { fetchBeats, fetchTracks } from "@/lib/data";
import { Suspense } from "react";

interface LibraryProps {
  params: {
    userid: string;
  };
}

export default async function Library({ params }: LibraryProps) {
  const beats = await fetchBeats();

  return (
    <div className="flex flex-col gap-4 mb-20">
      <Suspense fallback={<div>TESTING</div>}>
        {beats.map(beat => (
          <BeatInsightCard key={beat.id} beat={beat} />
        ))}
      </Suspense>
    </div>
  );
}

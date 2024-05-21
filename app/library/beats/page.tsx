import { InsightCard, TrackInsightCard } from "@/components/InsightCard";
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
          <InsightCard key={beat.id} track={beat} />
        ))}
      </Suspense>
    </div>
  );
}

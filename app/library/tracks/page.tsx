import { InsightCard, TrackInsightCard } from "@/components/InsightCard";
import { fetchTracks } from "@/lib/data";
import { Suspense } from "react";

interface LibraryProps {
  params: {
    userid: string;
  };
}

export default async function Library({ params }: LibraryProps) {
  const tracks = await fetchTracks();

  return (
    <div className="flex flex-col gap-4 mb-20">
      <Suspense fallback={<div>TESTING</div>}>
        {tracks.map(track => (
          <InsightCard key={track.id} track={track} />
        ))}
      </Suspense>
    </div>
  );
}

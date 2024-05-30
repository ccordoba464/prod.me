import { InsightCard, TrackInsightCard } from "@/components/InsightCard";
import { Suspense } from "react";
import { prisma } from "@/prisma/prisma";

interface LibraryProps {
  params: {
    userid: string;
  };
}

export default async function Tracks({ params }: LibraryProps) {
  const tracks = await prisma.track.findMany({
    where: { user_id: params.userid },
  });

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

import {
  InsightCard,
  TrackInsightCard,
  BeatInsightCard,
} from "@/components/library/InsightCard";
import { prisma } from "@/lib/prisma";
import { Suspense } from "react";

interface LibraryProps {
  params: {
    userid: string;
  };
}

export default async function Library({ params }: LibraryProps) {
  const beats = await prisma.beat.findMany({
    where: { user_id: params.userid },
  });
  return (
    <div className="flex flex-col gap-4 mb-20">
      <Suspense fallback={<div>TESTING</div>}>
        {beats.map((beat: any) => (
          <BeatInsightCard key={beat.id} beat={beat} />
        ))}
      </Suspense>
    </div>
  );
}

import {
  InsightCard,
  TrackInsightCard,
} from "@/components/library/InsightCard";
import { Suspense } from "react";
import { prisma } from "@/lib/prisma";

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
      <Suspense fallback={<div>TESTING</div>}></Suspense>
    </div>
  );
}

import { InsightCard, TrackInsightCard } from "@/components/InsightCard";
import { Suspense } from "react";

interface LibraryProps {
  params: {
    userid: string;
  };
}

export default async function Library({ params }: LibraryProps) {
  return (
    <div className="flex flex-col gap-4 mb-20">
      <Suspense fallback={<div>TESTING</div>}>Import projects</Suspense>
    </div>
  );
}

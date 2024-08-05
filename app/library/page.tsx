import {
  InsightCard,
  TrackInsightCard,
  BeatInsightCard,
} from "@/components/library/InsightCard";
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
        <div className="flex w-full justify-between"></div>
      </div>

      <Divider />

      <div className="">
        <div className="text-xl mb-2">Tracks</div>
        <Suspense fallback={<div>TESTING</div>}></Suspense>
      </div>

      <Divider />

      <div className="">
        <div className="text-xl mb-2">Beats</div>
        <Suspense fallback={<div>TESTING</div>}></Suspense>
      </div>

      <Divider />

      <div className="">
        <div className="text-xl mb-2">Opens</div>
        <Suspense fallback={<div>TESTING</div>}></Suspense>
      </div>
    </div>
  );
}

"use client";

import SongWrapper from "@/components/SongWrapper";
import { Suspense } from "react"; // Use this if you have a skeleton component
import { AiOutlinePlus } from "react-icons/ai";
import { useUploadModal } from "@/hooks/useUploadModal";

//import { RevenueChartSkeleton } from "@/app/ui/skeletons"; // This is a skeleton component, replace the loading... fallback

export default function Home() {
  //const { data, error } = fetchCardData();
  const uploadModal = useUploadModal();

  const onClick = () => {
    return uploadModal.onOpen();
  };
  return (
    <div className="flex px-6 py-6 mx-auto w-[1200px] mt-14">
      <div className="flex flex-col w-full mr-6">
        <Suspense fallback={<div>FSPEIJFSPEIJFPSEIJFPISEJFPIESFJ</div>}>
          <SongWrapper />
          <SongWrapper />
          <SongWrapper />
          <SongWrapper />
        </Suspense>
      </div>
      <div className="w-[600px] bg-blue-500">
        <AiOutlinePlus
          className="text-neutral-400 cursor-pointer hover:text-white transition"
          onClick={onClick}
          size={20}
        />
        <div>
          <h2>Popular Artists</h2>
        </div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

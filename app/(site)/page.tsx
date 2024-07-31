"use client";

import SongWrapper from "@/components/SongWrapper";
import { Suspense } from "react"; // Use this if you have a skeleton component
import { AiOutlinePlus } from "react-icons/ai";
import { useUploadModal } from "@/hooks/useUploadModal";
import { Button } from "@/components/ui/button";
import { SlOptions } from "react-icons/sl";
import { ModeToggle } from "@/components/ModeToggle";

//import { RevenueChartSkeleton } from "@/app/ui/skeletons"; // This is a skeleton component, replace the loading... fallback

export default function Home() {
  //const { data, error } = fetchCardData();
  const uploadModal = useUploadModal();

  const onClick = () => {
    return uploadModal.onOpen();
  };

  return (
    <div className="text-neutral-400  w-full h-full overflow-hidden overflow-y-auto p-2">
      <div className="mt-2 mb-7 px-6">
        <div className="flex justify-between items-center">
          <h1 className="text-white text-4xl font-semibold">Newest Songs</h1>
        </div>
      </div>
      <ModeToggle />
      <div className="p-6">
        <div className="flex flex-col w-[160px]">
          <div className="w-[160px] h-[160px] overflow-hidden bg-[#3b4045] rounded-md"></div>
          <div className="flex justify-between mt-2">
            <div className="text-white">untitled project</div>
            <Button className="p-0 size-6" variant="outline" size="icon">
              <SlOptions />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

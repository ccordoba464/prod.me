import SongWrapper from "@/components/SongWrapper";
import { Suspense } from "react"; // Use this if you have a skeleton component
//import { RevenueChartSkeleton } from "@/app/ui/skeletons"; // This is a skeleton component, replace the loading... fallback

export default function Home() {
  //const { data, error } = fetchCardData();
  return (
    <div className="flex px-6 py-6 mx-auto w-[1200px] ">
      <div className="flex flex-col w-full mr-6">
        <Suspense fallback={<div>FSPEIJFSPEIJFPSEIJFPISEJFPIESFJ</div>}>
          <SongWrapper />
          <SongWrapper />
          <SongWrapper />
          <SongWrapper />
        </Suspense>
      </div>
      <div className="w-[600px] bg-blue-500">
        <div>
          <h2>Popular Artists</h2>
        </div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

import Link from "next/link";

const InsightCard = () => {
  return (
    <Link href="/artist/song">
      <div className="flex flex-col">
        <div className="flex items-center justify-between shadow-md rounded-sm w-full bg-red-00 border">
          <div className="flex">
            <div className="w-[160px] h-[160px] overflow-hidden mr-10 rounded-sm bg-[#3b4045]"></div>
            <div className="flex flex-col justify-center">
              <div className="text-xl font-bold ">Song Title</div>
              <div className="text-sm font-bold text-gray-500">Artist name</div>
            </div>
          </div>
          <div className="flex gap-14">
            <div className="flex flex-col items-center">
              <div className="text-lg font-bold">B Major</div>
              <div className="text-sm font-bold text-gray-500">Key</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-lg font-bold">130</div>
              <div className="text-sm font-bold text-gray-500">BPM</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-lg font-bold">Hip Hop</div>
              <div className="text-sm font-bold text-gray-500">Genre</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-lg font-bold">2:23</div>
              <div className="text-sm font-bold text-gray-500">Length</div>
            </div>
          </div>
          <div className="mr-6">Play</div>
        </div>
      </div>
    </Link>
  );
};

export default InsightCard;

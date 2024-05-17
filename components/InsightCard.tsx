import Link from "next/link";

const InsightCard = ({ track }: { track: any }) => {
  return (
    <Link href={`/track/${track.id}`}>
      <div className="flex flex-col w-[1120px]">
        <div className="flex items-center justify-between shadow-md rounded-sm w-full bg-red-00 border">
          <div className="flex">
            <div className="w-[140px] h-[140px] overflow-hidden rounded-sm bg-[#3b4045]"></div>
            <div className="flex flex-col justify-center ml-8 w-[200px]">
              <div className="text-xl font-bold ">{track.title}</div>
              <div className="text-sm font-bold text-gray-500">
                {track.artist}
              </div>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="flex flex-col items-center justify-center w-[120px]">
              <div className="text-lg font-bold">{track.key}</div>
              <div className="text-sm font-bold text-gray-500">Key</div>
            </div>
            <div className="flex flex-col items-center justify-center w-[120px]">
              <div className="text-lg font-bold">{track.bpm}</div>
              <div className="text-sm font-bold text-gray-500">BPM</div>
            </div>
            <div className="flex flex-col items-center justify-center w-[120px]">
              <div className="text-lg font-bold">{track.genre}</div>
              <div className="text-sm font-bold text-gray-500">Genre</div>
            </div>
            <div className="flex flex-col items-center justify-center w-[120px]">
              <div className="text-lg font-bold">{track.duration}</div>
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

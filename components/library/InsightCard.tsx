import { Track } from "@prisma/client";
import Link from "next/link";

export const InsightCard = (track: Track) => {
  return (
    <Link href={`/track/${track.id}`}>
      <div className="flex flex-col w-[1120px]">
        <div className="flex items-center justify-between shadow-md rounded-sm w-full bg-red-00 border">
          <div className="flex">
            <div className="w-[140px] h-[140px] overflow-hidden rounded-sm bg-[#3b4045]"></div>
            <div className="flex flex-col justify-center ml-8 w-[200px]">
              <div className="text-xl font-bold ">{track.title}</div>
              <div className="text-sm font-bold text-gray-500">
                {track.user_id}
              </div>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="flex flex-col items-center justify-center w-[100px]">
              <div className="text-lg font-bold">{"N/A"}</div>
              <div className="text-sm font-bold text-gray-500">Key</div>
            </div>
            <div className="flex flex-col items-center justify-center w-[100px]">
              <div className="text-lg font-bold">{"N/A"}</div>
              <div className="text-sm font-bold text-gray-500">BPM</div>
            </div>
            <div className="flex flex-col items-center justify-center w-[100px]">
              <div className="text-lg font-bold">{}</div>
              <div className="text-sm font-bold text-gray-500">Genre</div>
            </div>
            <div className="flex flex-col items-center justify-center w-[100px]">
              <div className="text-lg font-bold">{"N/A"}</div>
              <div className="text-sm font-bold text-gray-500">Length</div>
            </div>
          </div>
          <div className="mr-6">Play</div>
        </div>
      </div>
    </Link>
  );
};

export const TrackInsightCard = (track: Track) => {
  return (
    <Link href={`/track/${track.id}`}>
      <div className="flex flex-col w-[1120px]">
        <div className="flex items-center justify-between shadow-md rounded-sm w-full bg-red-00 border">
          <div className="flex">
            <div className="w-[140px] h-[140px] overflow-hidden rounded-sm bg-[#3b4045]"></div>
            <div className="flex flex-col justify-center ml-8 w-[200px]">
              <div className="text-xl font-bold ">{track.title}</div>
              <div className="text-sm font-bold text-gray-500">
                {track.user_id}
              </div>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="flex flex-col items-center justify-center w-[100px]">
              <div className="text-lg font-bold">{"N/A"}</div>
              <div className="text-sm font-bold text-gray-500">Plays</div>
            </div>
            <div className="flex flex-col items-center justify-center w-[100px]">
              <div className="text-lg font-bold">{"N/A"}</div>
              <div className="text-sm font-bold text-gray-500">Likes</div>
            </div>
            <div className="flex flex-col items-center justify-center w-[100px]">
              <div className="text-lg font-bold">{}</div>
              <div className="text-sm font-bold text-gray-500">Adds</div>
            </div>
          </div>
          <div className="mr-6">Play</div>
        </div>
      </div>
    </Link>
  );
};

interface BeatInsightCardProps {
  beat: {
    id: string;
    user_id: string;
    title: string;
    description: string;
    genre: string;
    key: string;
    bpm: number;
    duration: string;
    cover_image_url: string;
    file_url: string;
    created_at: Date;
    updated_at: Date;
  };
}

export const BeatInsightCard = ({ beat }: BeatInsightCardProps) => {
  return (
    <Link href={`/beat/${beat.id}`}>
      <div className="flex items-center justify-between shadow-md rounded-sm w-full bg-red-00 border">
        <div className="flex">
          <div className="w-[100px] h-[100px] overflow-hidden rounded-sm bg-[#3b4045]"></div>
          <div className="flex flex-col justify-center ml-8">
            <div className="text-xl font-bold ">{beat.title}</div>
            <div className="text-sm">
              <button className="w-6 h-6 bg-black mr-2">Details</button>
              <button className="w-6 h-6 bg-black mr-2">Submissions</button>
              <button className="w-6 h-6 bg-black mr-2">Options</button>
            </div>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex flex-col items-center justify-center w-[100px]">
            <div className="text-sm font-bold text-gray-500">Key</div>
            <div className="text-lg font-bold">{beat.key || "N/A"}</div>
          </div>
          <div className="flex flex-col items-center justify-center w-[100px]">
            <div className="text-sm font-bold text-gray-500">BPM</div>
            <div className="text-lg font-bold">{beat.bpm || "N/A"}</div>
          </div>
          <div className="flex flex-col items-center justify-center w-[100px]">
            <div className="text-sm font-bold text-gray-500">Genre</div>
            <div className="text-lg font-bold">{beat.genre}</div>
          </div>
          <div className="flex flex-col items-center justify-center w-[100px]">
            <div className="text-sm font-bold text-gray-500">Duration</div>

            <div className="text-lg font-bold">{beat.duration}</div>
          </div>
          <div className="flex flex-col items-center justify-center w-[100px]">
            <div className="text-sm font-bold text-gray-500">Likes</div>
            <div className="text-lg font-bold">12</div>
          </div>
          <div className="flex flex-col items-center justify-center w-[100px]">
            <div className="text-sm font-bold text-gray-500">Views</div>
            <div className="text-lg font-bold">327</div>
          </div>
        </div>
        <div className="mr-6">Play</div>
      </div>
    </Link>
  );
};

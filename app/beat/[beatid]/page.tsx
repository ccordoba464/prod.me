import Image from "next/image";
import { getBeat, getUser } from "@/lib/data";
import Link from "next/link";
import { InsightCard, TrackInsightCard } from "@/components/InsightCard";

interface BeatProps {
  params: {
    beatid: string;
  };
}

export default async function Beat({ params }: BeatProps) {
  const { beatid } = params;
  const beatData = await getBeat(beatid);
  const user = await getUser(beatData.user_id);

  return (
    <div className="flex flex-col h-screen px-6 py-6 mx-auto w-[1200px]">
      <div className="flex mb-4">
        <div className="flex flex-col mr-6">
          <div className="w-[360px] h-[360px] overflow-hidden bg-[#3b4045] rounded-md"></div>
        </div>
        <div className="flex flex-col w-full py-4">
          <div className="font-bold text-4xl uppercase">{beatData.title}</div>

          <div className="font-bold text-3xl text-red-500 mb-1">
            <Link href={`/artist/${user.id}`}>{user.username}</Link>
          </div>

          <div className="flex gap-1 mb-6">
            <span className="font-bold">Open</span> •
            <span className="font-bold">
              {new Date(beatData.created_at).getFullYear()}
            </span>
          </div>

          <div className="flex mb-8 gap-2 text-lg font-bold">
            <button className="bg-red-500 px-10 py-2 rounded-lg text-white ">
              Play
            </button>
            <button className="bg-red-500 px-10 py-2 rounded-lg text-white ">
              + Add
            </button>
          </div>

          <div className="flex mb-8">
            <div className="flex flex-col items-center shadow-md px-10 py-4 mr-4 border rounded-sm">
              <div className="text-2xl font-bold">{beatData.genre}</div>
              <div className="text-md font-bold text-gray-500">Genre</div>
            </div>
            <div className="flex flex-col items-center shadow-md px-10 py-4 mr-4 border rounded-sm">
              <div className="text-2xl font-bold">{beatData.key || ""}</div>
              <div className="text-md font-bold text-gray-500">Key</div>
            </div>
            <div className="flex flex-col items-center shadow-md px-10 py-4 mr-4 border rounded-sm">
              <div className="text-2xl font-bold">{beatData.bpm || ""}</div>
              <div className="text-md font-bold text-gray-500">BPM</div>
            </div>
            <div className="flex flex-col items-center shadow-md px-10 py-4 mr-4 border rounded-sm">
              <div className="text-2xl font-bold">
                {beatData.duration || ""}
              </div>
              <div className="text-md font-bold text-gray-500">Duration</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

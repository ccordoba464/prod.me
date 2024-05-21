import Image from "next/image";
import { getBeat, getUser } from "@/lib/data";
import Link from "next/link";
import { InsightCard, TrackInsightCard } from "@/components/InsightCard";
import CommentComponent from "@/components/Comment";
import { Divider } from "@chakra-ui/react";

interface BeatProps {
  params: {
    beatid: string;
  };
}

export default async function Beat({ params }: BeatProps) {
  const { beatid } = params;
  const beatData = await getBeat(beatid);
  const user = await getUser(beatData.user_id);
  // const comments = await getComments(track.id);

  const comments = ["comment1", "comment2", "comment3"];

  return (
    <div className="flex flex-col h-screen px-6 py-6 mx-auto w-[1200px]">
      <div className="flex mb-4">
        <div className="flex flex-col mr-6">
          <div className="w-[320px] h-[320px] overflow-hidden bg-[#3b4045] rounded-md"></div>
        </div>
        <div className="flex flex-col w-full py-4">
          <div className="font-bold text-4xl uppercase">{beatData.title}</div>

          <div className="font-bold text-3xl text-red-500 mb-1">
            <Link href={`/artist/${user.id}`}>{user.username}</Link>
          </div>

          <div className="flex gap-1 mb-6">
            <span className="font-bold">Beat</span> •
            <span className="font-bold">
              {new Date(beatData.created_at).getFullYear()}
            </span>
          </div>

          <div className="flex mb-6 gap-2 text-lg font-bold">
            <button className="bg-red-500 px-6 py-1 rounded-lg text-white ">
              Play
            </button>
            <button className="bg-red-500 px-6 py-1 rounded-lg text-white ">
              + Add
            </button>
            <button className="bg-red-500 px-6 py-1 rounded-lg text-white ">
              Edit
            </button>
          </div>

          <div className="flex mb-6 mt-auto">
            <div className="flex flex-col items-center shadow-md px-12 py-4 mr-4 border rounded-sm">
              <div className="text-2xl font-bold">{beatData.genre}</div>
              <div className="text-md font-bold text-gray-500">Genre</div>
            </div>
            <div className="flex flex-col items-center shadow-md px-12 py-4 mr-4 border rounded-sm">
              <div className="text-2xl font-bold">{beatData.key || ""}</div>
              <div className="text-md font-bold text-gray-500">Key</div>
            </div>
            <div className="flex flex-col items-center shadow-md px-12 py-4 mr-4 border rounded-sm">
              <div className="text-2xl font-bold">{beatData.bpm || ""}</div>
              <div className="text-md font-bold text-gray-500">BPM</div>
            </div>
            <div className="flex flex-col items-center shadow-md px-12 py-4 mr-4 border rounded-sm">
              <div className="text-2xl font-bold">
                {beatData.duration || ""}
              </div>
              <div className="text-md font-bold text-gray-500">Duration</div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex rounded-lg p-4">
        <div className="flex flex-col  rounded-lg mr-4">
          <div className="flex text-sm justify-between mb-2">
            <div className="flex">
              <div className="p-1 hover:bg-gray-200 mr-2 rounded-md">
                Plays: 3223
              </div>
              <div className="p-1 hover:bg-gray-200 mr-2 rounded-md">
                Likes: 32
              </div>
              <div className="p-1 hover:bg-gray-200 mr-2 rounded-md">
                Projects: 21
              </div>
            </div>

            <div className="flex items-center text-sm">
              <button className="bg-red-500 text-white font-bold rounded-md px-2 mr-1">
                Like
              </button>
              <button className="bg-red-500 text-white font-bold rounded-md px-2 mr-1">
                Share
              </button>
              <button className="bg-red-500 text-white font-bold rounded-md px-2 mr-1">
                Add to Queue
              </button>
            </div>
          </div>

          <Divider />

          <div className="text-sm my-2 mb-4">
            {beatData.description != null && <div>{beatData.description}</div>}
          </div>

          <div className="flex flex-col text-sm">
            <div className="flex justify-between mb-2">
              <span>{comments.length + " Comments"}</span>
              <button className="bg-red-500 text-white font-bold rounded-md px-2 mr-1">
                Sort by
              </button>
            </div>
            <Divider />

            <div className="mt-4">
              <CommentComponent />
              <CommentComponent />
              <CommentComponent />
              <CommentComponent />
            </div>
          </div>
        </div>

        <Divider orientation="vertical" />

        <div className="flex flex-col px-4">
          <div className="mb-2">Submissions</div>
        </div>
      </div>
    </div>
  );
}

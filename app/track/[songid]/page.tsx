import Image from "next/image";
import { getTrackWithVersions, getUser } from "@/lib/data";
import Link from "next/link";
import { Divider, Input } from "@chakra-ui/react";
import CommentSection from "@/components/CommentSection";
import { PlayerControls } from "@/components/PlayerControls";

interface TrackProps {
  params: {
    songid: string;
  };
}

export default async function Track({ params }: TrackProps) {
  const { songid } = params;
  const { track, versions } = await getTrackWithVersions(songid);
  const user = await getUser(track.user_id);
  // const comments = await getComments(track.id);
  const comments = ["comment1", "comment2", "comment3"];

  //const { playTrack } = usePlayer();

  return (
    <div className="flex flex-col px-6 py-6 mx-auto w-[1200px]">
      <div className="flex mb-4">
        <div className="flex flex-col mr-6">
          <div className="w-[320px] h-[320px] overflow-hidden bg-[#3b4045] rounded-md"></div>
        </div>
        <div className="flex flex-col w-full pt-4">
          <div className="font-bold text-4xl uppercase">{track.title}</div>

          <div className="font-bold text-3xl text-red-500 mb-1">
            <Link href={`/artist/${user.id}`}>{user.username}</Link>
          </div>

          <div className="flex flex-row gap-1 mb-6">
            <span className="font-bold">Track</span> •
            <span className="font-bold">
              {new Date(track.created_at).getFullYear()}
            </span>
          </div>

          <div className="flex mb-6 gap-2 text-lg font-bold">
            <PlayerControls fileUrl={versions[0].file_url} />
            <button className="bg-red-500 px-6 py-1 rounded-lg text-white ">
              + Add
            </button>
            <button className="bg-red-500 px-6 py-1 rounded-lg text-white ">
              Edit
            </button>
          </div>

          <div className="flex mb-6 mt-auto">
            <div className="flex flex-col items-center shadow-md px-12 py-4 mr-4 border rounded-sm">
              <div className="text-2xl font-bold">{track.genre}</div>
              <div className="text-md font-bold text-gray-500">Genre</div>
            </div>
            <div className="flex flex-col items-center shadow-md px-12 py-4 mr-4 border rounded-sm">
              <div className="text-2xl font-bold">{versions[0].key || ""}</div>
              <div className="text-md font-bold text-gray-500">Key</div>
            </div>
            <div className="flex flex-col items-center shadow-md px-12 py-4 mr-4 border rounded-sm">
              <div className="text-2xl font-bold">{versions[0].bpm || ""}</div>
              <div className="text-md font-bold text-gray-500">BPM</div>
            </div>
            <div className="flex flex-col items-center shadow-md px-12 py-4 mr-4 border rounded-sm">
              <div className="text-2xl font-bold">
                {versions[0].duration || ""}
              </div>
              <div className="text-md font-bold text-gray-500">Duration</div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex rounded-lg p-4 mb-40 h-[1200px]">
        <div className="flex flex-col rounded-lg px-2">
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
              <button className="bg-red-500 text-white font-bold rounded-md p-1 mr-1 text-sm">
                Like
              </button>
              <button className="bg-red-500 text-white font-bold rounded-md p-1 mr-1 text-sm">
                Share
              </button>
              <button className="bg-red-500 text-white font-bold rounded-md p-1 mr-1 text-sm">
                Add to Queue
              </button>
            </div>
          </div>

          <Divider />

          <div className="text-sm my-2 mb-4">
            {track.description != null && <div>{track.description}</div>}
          </div>

          <CommentSection comments={comments} />
        </div>

        <div className="px-2">
          <Divider orientation="vertical" />
        </div>

        <div className="flex flex-col px-2">
          <div className="mb-2">Versions</div>
          {versions.map(version => (
            <button
              key={version.id}
              className="flex items-center shadow-md rounded-md w-full hover:bg-red-600 bg-red-500 text-white font-bold p-2 cursor-pointer mb-2 text-xs"
            >
              <div className="px-4">{version.version_number}</div>
              <div className="mr-4 text-md text-ellipsis">
                {version.file_url}
              </div>
              <div className="text-xs mr-4">
                {new Date(version.created_at).toLocaleString()}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

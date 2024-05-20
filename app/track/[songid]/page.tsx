import Image from "next/image";
import { getTrackWithVersions, getUser } from "@/lib/data";
import Link from "next/link";

interface TrackProps {
  params: {
    songid: string;
  };
}

export default async function Track({ params }: TrackProps) {
  const { songid } = params;
  const { track, versions } = await getTrackWithVersions(songid);
  const user = await getUser(track.user_id);

  return (
    <div className="flex flex-col h-screen px-6 py-6 mx-auto w-[1200px]">
      <div className="flex mb-4">
        <div className="flex flex-col mr-6">
          <div className="w-[360px] h-[360px] overflow-hidden bg-[#3b4045] rounded-md"></div>
        </div>
        <div className="flex flex-col w-full py-4">
          <div className="font-bold text-4xl uppercase">{track.title}</div>

          <div className="font-bold text-3xl text-red-500 mb-1">
            <Link href={`/artist/${user.id}`}>{user.username}</Link>
          </div>

          <div className="flex gap-1 mb-6">
            <span className="font-bold">Open</span> •
            <span className="font-bold">
              {new Date(track.created_at).getFullYear()}
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
              <div className="text-2xl font-bold">{track.genre}</div>
              <div className="text-md font-bold text-gray-500">Genre</div>
            </div>
            <div className="flex flex-col items-center shadow-md px-10 py-4 mr-4 border rounded-sm">
              <div className="text-2xl font-bold">{versions[0].key || ""}</div>
              <div className="text-md font-bold text-gray-500">Key</div>
            </div>
            <div className="flex flex-col items-center shadow-md px-10 py-4 mr-4 border rounded-sm">
              <div className="text-2xl font-bold">{versions[0].bpm || ""}</div>
              <div className="text-md font-bold text-gray-500">BPM</div>
            </div>
            <div className="flex flex-col items-center shadow-md px-10 py-4 mr-4 border rounded-sm">
              <div className="text-2xl font-bold">
                {versions[0].duration || ""}
              </div>
              <div className="text-md font-bold text-gray-500">Duration</div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col px-10 gap-2 text-white text-lg font-bold">
        {versions.map(version => (
          <button
            key={version.id}
            className="flex items-center shadow-md rounded-md w-full hover:bg-red-600 bg-red-500 p-2 cursor-pointer"
          >
            <div className="px-4">{version.version_number}</div>
            <div className="mr-4 text-md">{version.file_url}</div>
            <div className="text-sm mr-4">
              {new Date(version.created_at).toLocaleString()} •
              {version.time || "N/A"}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

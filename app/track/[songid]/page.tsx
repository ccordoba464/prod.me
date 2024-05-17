export default function Song({ params }: { params: any }) {
  return (
    <div className="flex flex-col h-screen px-6 py-6 mx-auto w-[1200px]">
      <div className="flex mb-4">
        <div className="flex flex-col mr-6">
          <div className="w-[360px] h-[360px] overflow-hidden bg-[#3b4045] rounded-md"></div>
        </div>
        <div className="flex flex-col w-full py-4">
          <div className="font-bold text-4xl uppercase">{params.songid}</div>

          <div className="font-bold text-3xl text-red-500 mb-1">
            {params.artistid}
          </div>

          <div className="flex gap-1 mb-6">
            <span className="font-bold">Open </span> •
            <span className="font-bold">2024</span>
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
              <div className="text-2xl font-bold">Hip Hop</div>
              <div className="text-md font-bold text-gray-500">Genre</div>
            </div>
            <div className="flex flex-col items-center shadow-md px-10 py-4 mr-4 border rounded-sm">
              <div className="text-2xl font-bold">B Major</div>
              <div className="text-md font-bold text-gray-500">Key</div>
            </div>
            <div className="flex flex-col items-center shadow-md px-10 py-4 mr-4 border rounded-sm">
              <div className="text-2xl font-bold">130</div>
              <div className="text-md font-bold text-gray-500">BPM</div>
            </div>
            <div className="flex flex-col items-center shadow-md px-10 py-4 mr-4 border rounded-sm">
              <div className="text-2xl font-bold">2:23</div>
              <div className="text-md font-bold text-gray-500">Duration</div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col px-10 gap-2 text-white text-lg font-bold">
        <div className="flex items-center shadow-md rounded-md w-full bg-red-500 p-2">
          <div className="px-4">1</div>
          <div className="mr-4 text-md">Active Version</div>
          <div className="text-sm mr-4">May 24, 2024 • 6:43PM</div>
          <div className="self-end ml-auto px-4 flex items-center">
            Download
          </div>
        </div>
        <div className="flex items-center shadow-md rounded-md w-full bg-red-500 p-2">
          <div className=" px-4">2</div>
          <div className="mr-4 text-md">SONG V2</div>
          <div className="text-sm mr-4">May 24, 2024 • 6:43PM</div>

          <div className="self-end ml-auto px-4 flex items-center">
            Download
          </div>
        </div>
        <div className="flex items-center shadow-md rounded-md w-full bg-red-500 p-2">
          <div className=" px-4">3</div>
          <div className="mr-4 text-md">SONG V1</div>
          <div className="text-sm mr-4">May 24, 2024 • 6:43PM</div>
          <div className="self-end ml-auto px-4 flex items-center">
            Download
          </div>
        </div>
      </div>
    </div>
  );
}

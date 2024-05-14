export default function Song({ params }: { params: any }) {
  return (
    <div className="flex flex-col h-screen px-6 py-6 mx-auto w-[1200px]">
      <div className="flex mb-4">
        <div className="flex flex-col mr-6">
          <div className="w-[360px] h-[360px] overflow-hidden bg-[#3b4045] rounded-md"></div>
        </div>
        <div className="flex flex-col w-full py-2">
          <div className="font-bold text-4xl uppercase">{params.songid}</div>

          <div className="font-bold text-3xl text-red-500 mb-1">
            {params.artistid}
          </div>

          <div className="flex gap-1 mb-8">
            <span className="font-bold">Album </span> •
            <span className="font-bold">2024</span>
          </div>

          <div className="flex mb-8 gap-2">
            <button className="bg-red-500 px-10 py-2 rounded-lg text-white text-lg font-bold">
              Play
            </button>
            <button className="bg-red-500 px-10 py-2 rounded-lg text-white text-lg font-bold">
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

      <div className="flex flex-col px-10 gap-2 text-white">
        <div className="flex items-center shadow-md rounded-md w-full bg-red-500 p-2">
          <div className="text-lg font-bold px-4">1</div>
          <div className="text-lg font-bold ">Song Title</div>
        </div>
        <div className="flex items-center shadow-md rounded-md w-full bg-red-500 p-2">
          <div className="text-lg font-bold px-4">2</div>
          <div className="text-lg font-bold ">Song Title</div>
        </div>
        <div className="flex items-center shadow-md rounded-md w-full bg-red-500 p-2">
          <div className="text-lg font-bold px-4">3</div>
          <div className="text-lg font-bold ">Song Title</div>
        </div>
      </div>
    </div>
  );
}

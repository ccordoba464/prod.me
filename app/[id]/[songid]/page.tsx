export default function Song({ params }: { params: any }) {
  return (
    <div className="flex h-screen px-6 py-6 mx-auto justify-center items-center w-[1400px]">
      <div className="flex gap-8">
        <div className="flex flex-col gap-2">
          <div className="w-[400px] h-[400px] overflow-hidden bg-[#3b4045] rounded-md"></div>
          <button className="bg-blue-500 w-full p-2 rounded-lg">
            Download
          </button>
        </div>
        <div className="flex flex-col">
          <div className="font-bold text-3xl uppercase">Title</div>
          <div>BPM: </div>
          <div>Key: </div>
          <div>Notes:</div>
        </div>
      </div>
    </div>
  );
}

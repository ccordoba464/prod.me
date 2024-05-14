export default function MusicList() {
  return (
    <div className="flex flex-col py-6">
      <h2 className="font-bold text-2xl mb-2">Recently Played</h2>
      <div className="flex gap-4">
        <div className="flex flex-col">
          <div className="w-[160px] h-[160px] overflow-hidden bg-[#3b4045] rounded-md"></div>
        </div>
        <div className="flex flex-col">
          <div className="w-[160px] h-[160px] overflow-hidden bg-[#3b4045] rounded-md"></div>
        </div>
        <div className="flex flex-col">
          <div className="w-[160px] h-[160px] overflow-hidden bg-[#3b4045] rounded-md"></div>
        </div>
        <div className="flex flex-col">
          <div className="w-[160px] h-[160px] overflow-hidden bg-[#3b4045] rounded-md"></div>
        </div>
        <div className="flex flex-col">
          <div className="w-[160px] h-[160px] overflow-hidden bg-[#3b4045] rounded-md"></div>
        </div>
      </div>
    </div>
  );
}

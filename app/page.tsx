import MusicList from "@/components/MusicList";

export default function Home() {
  return (
    <div className="flex px-6 py-6 mx-auto w-[1200px] ">
      <div className="flex flex-col w-full mr-6">
        <MusicList />
        <MusicList />
        <MusicList />
        <MusicList />
      </div>
      <div className="w-[600px] bg-blue-500">
        <div>
          <h2>Popular Artists</h2>
        </div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

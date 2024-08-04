import { usePlayer } from "@/hooks/usePlayer";
import { Track } from "@prisma/client";

interface PlayerContentProps {
  track: Track;
  trackUrl: string;
}

export default function PlayerContent({ track, trackUrl }: PlayerContentProps) {
  const player = usePlayer();
  const [volume, setVolume] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="bg-red-500 flex p-1 rounded-lg">
      <div className="flex mr-4">
        <div className="w-[50px] h-[50px] overflow-hidden bg-[#3b4045] rounded-md mr-2"></div>
        <div className="flex flex-col text-sm justify-center">
          <div>{"Current Track"}</div>
          <div>Artist</div>
        </div>
      </div>

      <div className="flex gap-2 mr-4 ">
        <button>Restart</button>
        <button>Play</button>
        <button>Skip</button>
      </div>

      <div className="flex items-center relative">
        <div className="flex justify-center">Volume</div>
        <div className="absolute bottom-[60px] bg-red-500 p-2 rounded-md left-1/2 transform -translate-x-1/2 hidden"></div>
      </div>
    </div>
  );
}

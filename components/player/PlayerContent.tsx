import { usePlayer } from "@/hooks/usePlayer";
import { Track, User } from "@prisma/client";
import { useEffect, useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

import useSound from "use-sound";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";
import Image from "next/image";
import { getUserById } from "@/actions/users";
import toast from "react-hot-toast";
import { Slider } from "./Slider";

interface PlayerContentProps {
  track: Track;
  trackUrl: string;
  imageUrl: string;
  user: User;
}

export default function PlayerContent({
  track,
  trackUrl,
  imageUrl,
  user,
}: PlayerContentProps) {
  const player = usePlayer();

  const [volume, setVolume] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);

  const Icon = isPlaying ? BsPauseFill : BsPlayFill;
  const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave;

  const onPlayNext = () => {
    if (player.ids.length === 0) {
      return;
    }

    const currentIndex = player.ids.findIndex(id => id === player.activeId);
    const nextSong = player.ids[currentIndex + 1];

    if (!nextSong) {
      return player.setId(player.ids[0]);
    }

    player.setId(nextSong);
  };

  const onPlayPrevious = () => {
    if (player.ids.length === 0) {
      return;
    }

    const currentIndex = player.ids.findIndex(id => id === player.activeId);
    const previousSong = player.ids[currentIndex - 1];

    if (!previousSong) {
      return player.setId(player.ids[player.ids.length - 1]);
    }

    player.setId(previousSong);
  };

  const toggleMute = () => {
    if (volume === 0) {
      setVolume(1);
    } else {
      setVolume(0);
    }
  };

  const [play, { pause, sound }] = useSound(trackUrl, {
    volume: volume,
    onplay: () => setIsPlaying(true),
    onend: () => {
      setIsPlaying(false);
      onPlayNext();
    },
    onpause: () => setIsPlaying(false),
    format: ["mp3"],
  });

  useEffect(() => {
    sound?.play();

    return () => {
      sound?.unload();
    };
  }, [sound]);

  const handlePlay = () => {
    if (!isPlaying) {
      play();
    } else {
      pause();
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-x-10 h-vh">
      <div className="flex w-full justify-start">
        <div className="flex items-center gap-x-4">
          <div className="flex items-center gap-x-3 cursor-pointer  w-full p-2 rounded-md">
            <div className="relative rounded-md min-h-[60px] min-w-[60px] overflow-hidden">
              <Image
                fill
                src={imageUrl || ""}
                alt="MediaItem"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col gap-y-1 overflow-hidden">
              <p className="text-white truncate">{track.title}</p>
              <p className="text-neutral-400 text-sm truncate">
                {user.username}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex md:hidden col-auto w-full justify-end items-center">
        <div
          onClick={handlePlay}
          className="h-10 w-10 flex items-center justify-center rounded-full bg-white p-1 cursor-pointer"
        >
          <Icon size={30} className="text-black" />
        </div>
      </div>

      <div className="hidden h-full md:flex justify-center items-center w-full max-w-[722px] gap-x-6">
        <AiFillStepBackward
          onClick={onPlayPrevious}
          size={30}
          className="text-neutral-400 cursor-pointer hover:text-white transition"
        />
        <div
          onClick={handlePlay}
          className="flex items-center justify-center h-10 w-10 rounded-full bg-white p-1 cursor-pointer"
        >
          <Icon size={30} className="text-black" />
        </div>
        <AiFillStepForward
          onClick={onPlayNext}
          size={30}
          className="text-neutral-400 cursor-pointer hover:text-white transition"
        />
      </div>

      <div className="hidden md:flex w-full pr-2">
        <div className="flex items-center gap-x-2 w-[160px]">
          <VolumeIcon
            onClick={toggleMute}
            className="cursor-pointer"
            size={30}
          />
          <Slider value={volume} onChange={value => setVolume(value)} />
        </div>
      </div>
    </div>
  );
}

import Image from "next/image";
import { Button } from "../ui/button";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";

export default function ProfileTrackItem() {
  return (
    <div className="h-18 flex items-center border rounded-md p-2">
      <div className="flex items-center gap-x-3 cursor-pointer  w-full rounded-md">
        <div className="relative rounded-md size-14 overflow-hidden">
          <Image
            fill
            src="/profilepic.JPG" // Use the correct path here
            alt="MediaItem"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col gap-y-1 overflow-hidden">
          <div className="text-white truncate">Track Title</div>
          <div className="flex text-neutral-400 gap-1 text-sm truncate">
            <div>User</div> • <div>2024</div>
          </div>
        </div>
      </div>

      <div>
        <BsPlayFill size={26} className="mr-2" />
      </div>
    </div>
  );
}

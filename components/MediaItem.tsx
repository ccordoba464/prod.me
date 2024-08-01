import { Button } from "@/components/ui/button";
import { SlOptions } from "react-icons/sl";
import Link from "next/link";

interface MediaProps {
  id: string;
  title: string;
}

export default function MediaItem({ id, title }: MediaProps) {
  return (
    <Link href={`/project/${id}`}>
      <div className="flex flex-col w-[160px]">
        <div className="w-[160px] h-[160px] overflow-hidden bg-[#3b4045] rounded-md"></div>
        <div className="flex justify-between mt-2">
          <div className="text-white">{title}</div>
          <Button className="p-0 size-6" variant="outline" size="icon">
            <SlOptions />
          </Button>
        </div>
      </div>
    </Link>
  );
}

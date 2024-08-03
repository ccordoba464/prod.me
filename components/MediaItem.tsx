import { Button } from "@/components/ui/button";
import { SlOptions } from "react-icons/sl";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface MediaProps {
  id: string;
  title: string;
}

export default function MediaItem({ id, title }: MediaProps) {
  return (
    <div className="flex flex-col w-[160px]">
      <Link href={`/project/${id}`}>
        <div className="w-[160px] h-[160px] overflow-hidden bg-[#3b4045] rounded-md"></div>{" "}
      </Link>

      <div className="flex justify-between mt-2">
        <div className="text-white">{title}</div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="p-0 size-6 z-1" variant="outline" size="icon">
              <SlOptions />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="top" align="center">
            <DropdownMenuItem>Export Project</DropdownMenuItem>
            <DropdownMenuItem>Delete Project</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

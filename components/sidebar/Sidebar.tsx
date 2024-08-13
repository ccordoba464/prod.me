"use client";

import { twMerge } from "tailwind-merge";
import { HiHome } from "react-icons/hi";
import { BsFileMusic } from "react-icons/bs";
import { BiSearch } from "react-icons/bi";
import { MdLibraryMusic } from "react-icons/md";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { usePlayer } from "@/hooks/usePlayer";
import SidebarItem from "./SidebarItem";
import { logout } from "@/app/login/actions";
import { Button } from "../ui/button";
import { ModeToggle } from "../ModeToggle";
import { RiDashboardHorizontalFill } from "react-icons/ri";
import { RiFolderMusicFill } from "react-icons/ri";
import { TbActivity } from "react-icons/tb";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getCurrentUser } from "@/actions/users";
import { User } from "@prisma/client";

export default function Sidebar({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const player = usePlayer();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function fetchUser() {
      const userData = await getCurrentUser();
      setUser(userData);
      console.log(userData);
    }
    fetchUser();
  }, []);

  const routes = useMemo(
    () => [
      {
        icon: HiHome,
        label: "Home",
        active: pathname === "/",
        href: "/",
      },
      {
        icon: RiDashboardHorizontalFill,
        label: "Dashboard",
        active: pathname === "/dashboard",
        href: "/dashboard",
      },
      {
        icon: TbActivity,
        label: "Activity",
        active: pathname === "/activity",
        href: "/activity",
      },
      {
        icon: RiFolderMusicFill,
        label: "Projects",
        active: pathname === "/projects",
        href: "/projects",
      },
      {
        icon: BiSearch,
        label: "Search",
        active: pathname === "/search",
        href: "/search",
      },
      {
        icon: MdLibraryMusic,
        label: "Library",
        active: pathname === "/library",
        href: "/library",
      },
    ],
    [pathname]
  );

  return (
    <div
      className={twMerge(
        `flex h-full  `,
        player.activeId && "h-[calc(100svh-108px)]"
      )}
    >
      <div className="hidden md:flex flex-col justify-between gap-y-2 w-[280px] p-6 border-r">
        <div>
          <div className="text-white flex items-center text-4xl gap-2 mb-4">
            <BsFileMusic size={30} />
            prod.me
          </div>
          <div className="flex flex-col gap-y-4 py-4">
            {routes.map(item => (
              <SidebarItem key={item.label} {...item} />
            ))}
          </div>
        </div>

        <ModeToggle />

        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="flex items-center">
              <Avatar className="size-12">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="flex flex-1 flex-col items-start justify-center ml-2 text-sm">
                <span className="text-white">{user?.email}</span>
                <span className="text-neutral-400">Admin</span>
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="right" align="end">
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>
              <form action={logout} className="flex w-full">
                <button type="submit" className="w-full text-left">
                  Logout
                </button>
              </form>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex w-svh flex-1 px-10 py-6 overflow-y-auto">
        {children}
      </div>
    </div>
  );
}

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
import { RiDashboardHorizontalFill } from "react-icons/ri";
import { RiFolderMusicFill } from "react-icons/ri";
import { TbActivity } from "react-icons/tb";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getCurrentUser } from "@/actions/users";
import Link from "next/link";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";

export default function Sidebar({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const router = useRouter();
  const player = usePlayer();
  const { user, setUser, reset } = useUser();

  useEffect(() => {
    async function fetchUser() {
      const userData = await getCurrentUser();
      setUser(userData);
      console.log(userData);
    }
    fetchUser();
  }, [setUser]);

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

  const handleLogout = async () => {
    await logout();
    reset();
    router.refresh();
  };

  return (
    <div
      className={twMerge(
        `flex h-full  `,
        player.activeId && "h-[calc(100svh-108px)]"
      )}
    >
      <div className="hidden md:flex flex-col justify-between gap-y-2 w-[300px] p-6 border-r">
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

        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="flex items-center hover:bg-accent p-2 rounded-md">
              <Avatar className="size-10 rounded-md">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="flex flex-1 flex-col items-start justify-center ml-2 text-sm">
                <span className="text-white">{user?.username}</span>
                <span className="text-neutral-400 text-xs">{user?.email}</span>
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="right" align="end">
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/settings" className="flex w-full">
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <form action={handleLogout} className="flex w-full">
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

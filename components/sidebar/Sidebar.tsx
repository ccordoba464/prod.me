"use client";

import { twMerge } from "tailwind-merge";
import { HiHome } from "react-icons/hi";
import { BsFileMusic } from "react-icons/bs";
import { BiSearch } from "react-icons/bi";
import { MdLibraryMusic } from "react-icons/md";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { usePlayer } from "@/hooks/usePlayer";
import SidebarItem from "./SidebarItem";
import { logout } from "@/app/login/actions";
import { Button } from "../ui/button";
import { ModeToggle } from "../ModeToggle";

export default function Sidebar({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const player = usePlayer();

  const routes = useMemo(
    () => [
      {
        icon: HiHome,
        label: "Home",
        active: pathname === "/",
        href: "/",
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
      <div className="hidden md:flex flex-col justify-between gap-y-2 w-[260px] p-6 border-r">
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

        <form action={logout} className="flex gap-2">
          <ModeToggle />
          <Button type="submit" variant={"outline"} className="flex-1">
            Logout
          </Button>
        </form>
      </div>
      <div className="flex w-svh flex-1 px-10 py-6 overflow-y-auto">
        {children}
      </div>
    </div>
  );
}

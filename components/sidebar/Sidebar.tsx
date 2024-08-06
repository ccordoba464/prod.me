"use client";

import { twMerge } from "tailwind-merge";
import { HiHome } from "react-icons/hi";
import { BsFileMusic } from "react-icons/bs";
import { BiSearch } from "react-icons/bi";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { usePlayer } from "@/hooks/usePlayer";
import SidebarItem from "./SidebarItem";

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
        icon: HiHome,
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
        `flex h-screen  `,
        player.activeId && "h-[calc(100%-80px)]"
      )}
    >
      <div className="hidden md:flex flex-col gap-y-2  h-full w-[280px] p-2">
        <div>
          <div className="text-white px-5 py-4 flex items-center text-3xl gap-2">
            <BsFileMusic size={30} />
            prod.me
          </div>

          <div className="flex flex-col gap-y-4 px-5 py-4">
            {routes.map(item => (
              <SidebarItem key={item.label} {...item} />
            ))}
          </div>
        </div>
      </div>
      <div className="h-full flex-1 overflow-y-auto">{children}</div>
    </div>
  );
}

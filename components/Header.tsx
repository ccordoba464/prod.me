"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home" },
    { href: "/library", label: "Library" },
    { href: "/artist/410544b2-4001-4271-9855-fec4b6a6442a", label: "Artist" },
  ];

  return (
    <header className="fixed w-screen top-0 z-[1000] bg-red-500 font-bold text-white">
      <div className="flex items-center w-full justify-evenly">
        <div>CHORDPLAY</div>
        <nav>
          <ul className="flex gap-3 p-4">
            {links.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`${pathname === href ? "text-red-300" : ""}`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <div>Saved</div>
          <div>Notifications</div>
          <Link href={"/Artist"}>
            <div className="w-[40px] h-[40px] overflow-hidden bg-[#3b4045] rounded-full mr-2"></div>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;

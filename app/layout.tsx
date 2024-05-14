import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import Link from "next/link";
import "./globals.css";
import Playbar from "../components/playbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const links = [
    { href: "/", label: "Home" },
    { href: "/artist", label: "Artist" },
    { href: "/artist/song", label: "Song" },
  ];

  return (
    <html lang="en">
      <body className={inter.className}>
        <main>
          <Providers>
            <header className="fixed w-screen top-0 z-[1000] bg-red-500">
              <div className="flex items-center w-full justify-evenly">
                <div>LOGO</div>
                <nav>
                  <ul className="flex gap-3 p-4">
                    {links.map(({ href, label }) => (
                      <li key={href}>
                        <Link href={href}>{label}</Link>
                      </li>
                    ))}
                  </ul>
                </nav>
                <div className="flex items-center gap-2">
                  <div>Saved</div>
                  <div>Notifications</div>
                  <div className="w-[40px] h-[40px] overflow-hidden bg-[#3b4045] rounded-full mr-2"></div>
                </div>
              </div>
            </header>
            <div className="mt-14">{children}</div>
            <Playbar />
          </Providers>
        </main>
      </body>
    </html>
  );
}

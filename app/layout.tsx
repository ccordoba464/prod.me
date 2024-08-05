import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Player from "../components/player/Player";
import Sidebar from "@/components/sidebar/Sidebar";
import { ModalProvider } from "@/providers/ModalProvider";
import ToasterProvider from "@/providers/ToasterProvider";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/providers/ThemeProvider";

const font = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Yousic",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ClerkProvider>
            <ModalProvider />
            <ToasterProvider />
            <Sidebar>{children}</Sidebar>
            <Player />
          </ClerkProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

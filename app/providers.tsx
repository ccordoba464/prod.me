"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { PlayerProvider } from "@/context/PlayerContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider>
      <PlayerProvider>{children}</PlayerProvider>
    </ChakraProvider>
  );
}

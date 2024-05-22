"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { PlayerProvider } from "@/context/PlayerContext";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <ChakraProvider>
        <PlayerProvider>{children}</PlayerProvider>
      </ChakraProvider>
    </ClerkProvider>
  );
}

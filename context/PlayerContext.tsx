"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface PlayerContextProps {
  currentTrack: string | null;
  playTrack: (trackUrl: string) => void;
}

const PlayerContext = createContext<PlayerContextProps | undefined>(undefined);

export const PlayerProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentTrack, setCurrentTrack] = useState<string | null>(null);

  useEffect(() => {
    // Load the current track from local storage if available
    const savedTrack = localStorage.getItem("currentTrack");
    if (savedTrack) {
      setCurrentTrack(savedTrack);
    }
  }, []);

  const playTrack = (trackUrl: string) => {
    setCurrentTrack(trackUrl);
    localStorage.setItem("currentTrack", trackUrl);
  };

  return (
    <PlayerContext.Provider value={{ currentTrack, playTrack }}>
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (context === undefined) {
    throw new Error("usePlayer must be used within a PlayerProvider");
  }
  return context;
};

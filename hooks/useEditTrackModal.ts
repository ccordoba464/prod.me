import { Track } from "@prisma/client";
import { create } from "zustand";

interface EditTrackModalStore {
  isOpen: boolean;
  track: Track | null;
  onOpen: (track: Track) => void;
  onClose: () => void;
}

export const useEditTrackModal = create<EditTrackModalStore>(set => ({
  isOpen: false,
  track: null,
  onOpen: (track: Track) => set({ isOpen: true, track }),
  onClose: () => set({ isOpen: false, track: null }),
}));

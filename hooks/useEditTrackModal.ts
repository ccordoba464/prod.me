import { create } from "zustand";

interface EditTrackModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useEditTrackModal = create<EditTrackModalStore>(set => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

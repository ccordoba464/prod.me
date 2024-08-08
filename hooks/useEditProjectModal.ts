import { Project } from "@prisma/client";
import { create } from "zustand";

interface EditProjectModalStore {
  isOpen: boolean;
  project: Project | null;
  onOpen: (project: Project) => void;
  onClose: () => void;
}

export const useEditProjectModal = create<EditProjectModalStore>(set => ({
  isOpen: false,
  project: null,
  onOpen: (project: Project) => set({ isOpen: true, project }),
  onClose: () => set({ isOpen: false, project: null }),
}));

"use client";

import { Project } from "@prisma/client";
import { useEditProjectModal } from "@/hooks/useEditProjectModal";
import { SlOptions } from "react-icons/sl";

interface EditProjectButtonProps {
  project: Project;
}

export default function EditProjectButton({ project }: EditProjectButtonProps) {
  const editProjectModal = useEditProjectModal();

  const handleClick = () => {
    editProjectModal.onOpen(project);
  };

  return (
    <>
      <div
        onClick={handleClick}
        className="rounded-full bg-red-500 size-10 flex items-center justify-center cursor-pointer"
      >
        <SlOptions size={20} />
      </div>
    </>
  );
}

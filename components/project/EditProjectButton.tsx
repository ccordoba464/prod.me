"use client";

import { Project } from "@prisma/client";
import { useEditProjectModal } from "@/hooks/useEditProjectModal";
import { SlOptions } from "react-icons/sl";
import { Button } from "../ui/button";

interface EditProjectButtonProps {
  project: Project;
}

export default function EditProjectButton({ project }: EditProjectButtonProps) {
  const editProjectModal = useEditProjectModal();

  const handleClick = () => {
    editProjectModal.onOpen(project);
  };

  return (
    <Button
      onClick={handleClick}
      className="rounded-full "
      variant={"outline"}
      size="icon"
    >
      <SlOptions size={18} />
    </Button>
  );
}

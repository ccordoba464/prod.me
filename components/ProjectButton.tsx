"use client";

import { toast } from "react-hot-toast";

import { createProject } from "@/actions/projects";
import { Button } from "@/components/ui/button";
import { useProjectModal } from "@/hooks/useProjectModal";

export function ProjectButton() {
  const projectModal = useProjectModal();

  const onClick = async () => {
    projectModal.onOpen();
  };

  return (
    <Button variant="outline" onClick={onClick}>
      Create Project
    </Button>
  );
}

"use client";

import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
} from "@chakra-ui/react";
import { prisma } from "@/lib/prisma";
import { createProject, createProjectTrack } from "@/actions/projects";
import { createTrack } from "@/actions/tracks";
import { FormEvent } from "react";

interface ProjectFormProps {
  isOverlayOpen: boolean;
  handleClose: () => void;
  file: File | null;
}

export default function ProjectForm({
  isOverlayOpen,
  handleClose,
  file,
}: ProjectFormProps) {
  //   const projects = await prisma.project.findMany({
  //     where: { user_id: params.userid },
  //   });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Creating project");
    const project = await createProject();
    console.log("Creating Track in project", project);
    const track = await createTrack(file?.name);
    const projectTrack = await createProjectTrack(project?.id, track?.id);
    console.log("Create Project Track link", projectTrack);

    handleClose();
  };

  return (
    <Modal isOpen={isOverlayOpen} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Choose a project</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit}>
            <FormControl>
              <Button type="submit">Create New Project</Button>
            </FormControl>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

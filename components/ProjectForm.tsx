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
import { createProject } from "@/actions/projects";
import { FormEvent } from "react";

interface ProjectFormProps {
  isOverlayOpen: boolean;
  handleClose: () => void;
}

export default function ProjectForm({
  isOverlayOpen,
  handleClose,
}: ProjectFormProps) {
  //   const projects = await prisma.project.findMany({
  //     where: { user_id: params.userid },
  //   });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Creating project");
    await createProject();
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

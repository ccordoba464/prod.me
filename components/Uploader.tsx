"use client";

import { upload } from "@vercel/blob/client";
import { useRef, ChangeEvent, useState } from "react";
import { Button } from "@chakra-ui/react";
import ProjectForm from "./ProjectForm";

export default function Uploader() {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [isOverlayOpen, setIsOverlayOpen] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  async function uploadAudio(file: File) {
    try {
      setIsOverlayOpen(true);
      await upload(file.name, file, {
        access: "public",
        handleUploadUrl: "/api/upload",
      });
    } catch (error) {
      console.error("Failed to upload audio", error);
    }
  }

  const handleButtonClick = () => {
    if (inputFileRef.current) {
      inputFileRef.current.click();
    }
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await uploadAudio(file);
    }
  };

  const handleProjectSelect = async () => {
    const file = inputFileRef.current?.files?.[0];
    if (file && selectedProject) {
      await uploadAudio(file);
    }
  };

  const handleClose = () => {
    setIsOverlayOpen(false);
  };

  return (
    <>
      <Button onClick={handleButtonClick}> + Create </Button>
      <input
        type="file"
        id="audio"
        name="audio"
        accept="audio/*"
        ref={inputFileRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      <ProjectForm isOverlayOpen={isOverlayOpen} handleClose={handleClose} />
    </>
  );
}

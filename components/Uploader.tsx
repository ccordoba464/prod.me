"use client";

import { upload } from "@vercel/blob/client";
import { useRef, ChangeEvent } from "react";
import { Button } from "@chakra-ui/react";

export default function Uploader() {
  const inputFileRef = useRef<HTMLInputElement>(null);

  async function uploadAudio(file: File) {
    try {
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
    </>
  );
}

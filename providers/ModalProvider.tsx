"use client";

import { useState, useEffect } from "react";

import UploadModal from "@/components/modals/UploadModal";
import ProjectModal from "@/components/modals/ProjectModal";
import EditTrackModal from "@/components/modals/EditTrackModal";

export function ModalProvider() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <UploadModal />
      <ProjectModal />
      <EditTrackModal />
    </>
  );
}

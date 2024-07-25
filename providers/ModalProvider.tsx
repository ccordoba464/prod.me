"use client";

import { useState, useEffect } from "react";

import UploadModal from "@/components/UploadModal";
import Modal from "@/components/Modal";

export function ModalProvider() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <UploadModal />
    </>
  );
}

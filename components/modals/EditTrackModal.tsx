import { useState } from "react";
import { useForm, FieldValues, SubmitHandler, set } from "react-hook-form";
import { toast } from "react-hot-toast";
import { supabase } from "@/lib/supabase/client";
import uniqid from "uniqid";
import { useRouter } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { createTrack } from "@/actions/tracks";

import { useEditTrackModal } from "@/hooks/useEditTrackModal";

import Modal from "./Modal";
import Input from "../Input";
import Button from "../Button";

export default function EditTrackModal() {
  const editTrackModal = useEditTrackModal();
  const track = editTrackModal.track;

  const router = useRouter();

  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: { title: "", author: "", song: null, image: null },
  });

  const onChange = (open: boolean) => {
    if (!open) {
      reset();
      editTrackModal.onClose();
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async values => {
    try {
      router.refresh();
      toast.success("Song created!");
      reset();
      editTrackModal.onClose();
    } catch (error) {
      editTrackModal.onClose();
    }
  };

  if (!track && editTrackModal.isOpen) {
    return toast.error("Track not found");
  }

  return (
    <Modal
      title={track?.title}
      description="Edit your track"
      isOpen={editTrackModal.isOpen}
      onChange={onChange}
    >
      <div>
        <ul className="flex flex-col gap-1">
          <li className="p-4 bg-neutral-700 rounded-t-lg cursor-pointer hover:bg-[#2c2b2b]">
            Edit track info
          </li>
          <li className="p-4 bg-neutral-700 cursor-pointer hover:bg-[#323131]">
            Add Notes
          </li>
          <li className="p-4 bg-neutral-700 cursor-pointer hover:bg-[#323131]">
            Replace audio
          </li>
          <li className="p-4 bg-neutral-700 cursor-pointer hover:bg-[#323131]">
            Export track
          </li>
          <li className="p-4 bg-neutral-700 rounded-b-lg cursor-pointer hover:bg-[#323131]">
            Delete Track
          </li>
        </ul>
      </div>
    </Modal>
  );
}

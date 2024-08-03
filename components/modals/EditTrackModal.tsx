import { useState } from "react";
import { useForm, FieldValues, SubmitHandler, set } from "react-hook-form";
import { toast } from "react-hot-toast";
import { supabase } from "@/lib/supabase/client";
import uniqid from "uniqid";
import { useRouter } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { createTrack, deleteTrack } from "@/actions/tracks";
import { deleteProjectTrack } from "@/actions/project-tracks";

import { useEditTrackModal } from "@/hooks/useEditTrackModal";

import Modal from "./Modal";
import Input from "../Input";
import Button from "../Button";
import { Track } from "@prisma/client";
import { loadTrackFromSupabase } from "@/actions/supabase-actions";

export default function EditTrackModal() {
  const [currentView, setCurrentView] = useState("main");
  const editTrackModal = useEditTrackModal();
  const track = editTrackModal.track;

  const router = useRouter();

  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: { title: "", author: "", song: null, image: null },
  });

  const handleDownload = async () => {
    if (track && track.song_path) {
      // FIGURE OUT WHAT IS GOING ON HERE AND WHY IT WORKS
      const data = await loadTrackFromSupabase(track.song_path);
      console.log(data);
      toast.success("Track downloaded");
      const url = URL.createObjectURL(data);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${track.title}.mp3`;
      a.click();
    } else {
      toast.error("Failed to download track");
    }
  };

  const onChange = (open: boolean) => {
    if (!open) {
      reset();
      setCurrentView("main");
      router.refresh();
      editTrackModal.onClose();
    }
  };

  const onDelete = async () => {
    if (track) {
      try {
        await deleteTrack(track.id);
        toast.success("Track deleted");
        router.refresh();
        editTrackModal.onClose();
      } catch (error) {
        toast.error("Failed to delete track");
      }
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

  const showMainView = () => setCurrentView("main");
  const showEditInfoView = () => setCurrentView("editInfo");
  const showAddNotesView = () => setCurrentView("addNotes");
  const showReplaceAudioView = () => setCurrentView("replaceAudio");
  const showDeleteTrackView = () => setCurrentView("deleteTrack");

  return (
    <Modal
      title={null}
      description={null}
      isOpen={editTrackModal.isOpen}
      onChange={onChange}
    >
      {currentView == "main" && (
        <div>
          <ul className="flex flex-col gap-1">
            <li
              className="p-4 bg-neutral-700 rounded-t-lg cursor-pointer hover:bg-[#2c2b2b]"
              onClick={showEditInfoView}
            >
              Edit track info
            </li>
            <li
              className="p-4 bg-neutral-700 cursor-pointer hover:bg-[#323131]"
              onClick={showAddNotesView}
            >
              Add Notes
            </li>
            <li
              className="p-4 bg-neutral-700 cursor-pointer hover:bg-[#323131]"
              onClick={showReplaceAudioView}
            >
              Replace audio
            </li>
            <li
              className="p-4 bg-neutral-700 cursor-pointer hover:bg-[#323131]"
              onClick={handleDownload}
            >
              Export track
            </li>
            <li
              className="p-4 bg-neutral-700 rounded-b-lg cursor-pointer hover:bg-[#323131]"
              onClick={showDeleteTrackView}
            >
              Delete Track
            </li>
          </ul>
        </div>
      )}
      {currentView == "editInfo" && (
        <div>
          <button onClick={showMainView} className="mb-4">
            Back
          </button>
        </div>
      )}
      {currentView == "replaceAudio" && <div></div>}
      {currentView == "deleteTrack" && (
        <div className="flex flex-col">
          <div
            className="text-2xl
                  text-center
                  font-bold
                  mb-6"
          >
            Delete track?
          </div>
          <button
            className="p-4 bg-zinc-900 rounded-md mb-2"
            onClick={onDelete}
          >
            Delete Track
          </button>
          <button className="p-4 bg-zinc-900 rounded-md" onClick={showMainView}>
            Cancel
          </button>
        </div>
      )}
    </Modal>
  );
}

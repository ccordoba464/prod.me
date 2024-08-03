import { useState, useEffect } from "react";
import { useForm, FieldValues, SubmitHandler, set } from "react-hook-form";
import { toast } from "react-hot-toast";
import { supabase } from "@/lib/supabase/client";
import uniqid from "uniqid";
import { useRouter } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { createTrack, deleteTrack, updateTrack } from "@/actions/tracks";
import { loadTrackFromSupabase } from "@/actions/supabase-actions";

import { useEditTrackModal } from "@/hooks/useEditTrackModal";

import Modal from "./Modal";
import Input from "../Input";
import Button from "../Button";
import { Track } from "@prisma/client";

export default function EditTrackModal() {
  const [currentView, setCurrentView] = useState("main");
  const [isLoading, setIsLoading] = useState(false);

  const editTrackModal = useEditTrackModal();
  const track = editTrackModal.track;
  const router = useRouter();

  const { register, handleSubmit, reset, setValue } = useForm<FieldValues>({
    defaultValues: { title: "", author: "", song: null, image: null },
  });

  useEffect(() => {
    if (track) {
      setValue("title", track.title);
      setValue("description", track.description);
    }
  }, [track, setValue]);

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
      setIsLoading(true);

      await updateTrack(track?.id!, values.title, values.description);
      toast.success("Song updated!");
      reset();
      setCurrentView("main");
      editTrackModal.onClose();
      router.refresh();
    } catch (error) {
      toast.error("Failed to update track");
      editTrackModal.onClose();
    } finally {
      setIsLoading(false);
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
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-y-4"
          >
            <Input
              id="title"
              disabled={isLoading}
              {...register("title", { required: true })}
              placeholder="Song title"
            />
            <Input
              id="description"
              disabled={isLoading}
              {...register("description", { required: true })}
              placeholder="Song description"
            />
            <Button disabled={isLoading} type="submit">
              Create
            </Button>
          </form>
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

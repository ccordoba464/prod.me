import { useState, useEffect } from "react";
import { useForm, FieldValues, SubmitHandler, set } from "react-hook-form";
import { toast } from "react-hot-toast";
import { supabase } from "@/lib/supabase/client";
import uniqid from "uniqid";
import { useRouter } from "next/navigation";

import { useEditProjectModal } from "@/hooks/useEditProjectModal";

import Modal from "./Modal";
import Input from "../customizable/Input";
import Button from "../customizable/Button";
import { deleteProject, updateProject } from "@/actions/projects";

export default function EditProjectModal() {
  const [currentView, setCurrentView] = useState("main");
  const [isLoading, setIsLoading] = useState(false);

  const editProjectModal = useEditProjectModal();
  const project = editProjectModal.project;
  const router = useRouter();

  const { register, handleSubmit, reset, setValue } = useForm<FieldValues>({
    defaultValues: { title: "", decription: "", image: null },
  });

  const onChange = (open: boolean) => {
    if (!open) {
      reset();
      setCurrentView("main");
      router.refresh();
      editProjectModal.onClose();
    }
  };

  const onDelete = async () => {
    if (project) {
      try {
        await deleteProject(project.id);
        toast.success("Project deleted");
        router.refresh();
        editProjectModal.onClose();
      } catch (error) {
        toast.error("Failed to delete track");
      }
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async values => {
    if (project) {
      try {
        setIsLoading(true);

        await updateProject(
          project.id,
          values.title,
          values.description,
          values.image
        );
        toast.success("Song updated!");
        reset();
        setCurrentView("main");
        editProjectModal.onClose();
        router.refresh();
      } catch (error) {
        toast.error("Failed to update track");
        editProjectModal.onClose();
      } finally {
        setIsLoading(false);
      }
    }
  };

  if (!project && editProjectModal.isOpen) {
    return toast.error("Project not found");
  }

  const showMainView = () => setCurrentView("main");
  const showEditInfoView = () => setCurrentView("editInfo");
  const showAddNotesView = () => setCurrentView("addNotes");
  const showReplaceAudioView = () => setCurrentView("replaceAudio");
  const showDeleteProjectView = () => setCurrentView("deleteProject");

  return (
    <Modal
      title={null}
      description={null}
      isOpen={editProjectModal.isOpen}
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
            <li className="p-4 bg-neutral-700 cursor-pointer hover:bg-[#323131]">
              Export track
            </li>
            <li
              className="p-4 bg-neutral-700 rounded-b-lg cursor-pointer hover:bg-[#323131]"
              onClick={showDeleteProjectView}
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
              placeholder="Project title"
            />
            <Input
              id="description"
              disabled={isLoading}
              {...register("description", { required: true })}
              placeholder="Project description"
            />
            <Input
              placeholder="Image"
              disabled={isLoading}
              type="file"
              accept=".JPG"
              id="image"
              {...register("image", { required: true })}
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

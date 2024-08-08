import { useState, useEffect } from "react";
import { useForm, FieldValues, SubmitHandler, set } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

import { useEditProjectModal } from "@/hooks/useEditProjectModal";

import Modal from "./Modal";
import Input from "../customizable/Input";
import Button from "../customizable/Button";
import { deleteProject, updateProject } from "@/actions/projects";
import {
  loadTrackFromSupabase,
  uploadImageToSupabase,
} from "@/actions/supabase-actions";
import { fetchProjectTracks } from "@/actions/project-tracks";
import JSZip from "jszip";
import saveAs from "file-saver";

export default function EditProjectModal() {
  const [currentView, setCurrentView] = useState("main");
  const [isLoading, setIsLoading] = useState(false);

  const editProjectModal = useEditProjectModal();
  const project = editProjectModal.project;
  const router = useRouter();

  const { register, handleSubmit, reset, setValue } = useForm<FieldValues>({
    defaultValues: { title: "", decription: "", image: null },
  });

  useEffect(() => {
    if (project) {
      setValue("title", project.title);
      setValue("description", project.description);
    }
  }, [project, setValue]);

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
        router.push("/");
        editProjectModal.onClose();
      } catch (error) {
        toast.error("Failed to delete project");
      }
    }
  };

  const handleExport = async () => {
    if (project) {
      try {
        const projectTracks = await fetchProjectTracks(project.id);
        const zip = new JSZip();

        for (const projectTrack of projectTracks) {
          const data = await loadTrackFromSupabase(
            projectTrack.track?.song_path!
          );
          zip.file(`${projectTrack.track.title}.mp3`, data, { binary: true });
        }

        const zipContent = await zip.generateAsync({ type: "blob" });
        saveAs(zipContent, `${project.title}_tracks.zip`);

        toast.success("Tracks downloaded successfully");
      } catch (error) {
        toast.error("Failed to download tracks");
      }
    } else {
      toast.error("Project not found");
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async values => {
    if (project) {
      try {
        setIsLoading(true);

        const imageFile = values.image?.[0];

        if (!imageFile) {
          toast.error("Missing fields");
        }
        const imageData = await uploadImageToSupabase(imageFile);

        await updateProject(
          project.id,
          values.title,
          values.description,
          imageData.path
        );
        toast.success("Project updated!");
        reset();
        setCurrentView("main");
        editProjectModal.onClose();
        router.refresh();
      } catch (error) {
        toast.error("Failed to update Project");
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
              Edit Project Info
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
              Move Project
            </li>
            <li
              className="p-4 bg-neutral-700 cursor-pointer hover:bg-[#323131]"
              onClick={handleExport}
            >
              Export Project
            </li>
            <li
              className="p-4 bg-neutral-700 rounded-b-lg cursor-pointer hover:bg-[#323131]"
              onClick={showDeleteProjectView}
            >
              Delete Project
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
              {...register("image")}
            />
            <Button disabled={isLoading} type="submit">
              Update Project
            </Button>
          </form>
        </div>
      )}
      {currentView == "replaceAudio" && <div></div>}
      {currentView == "deleteProject" && (
        <div className="flex flex-col">
          <div
            className="text-2xl
                  text-center
                  font-bold
                  mb-6"
          >
            Delete Project?
          </div>
          <button
            className="p-4 bg-zinc-900 rounded-md mb-2"
            onClick={onDelete}
          >
            Delete Project
          </button>
          <button className="p-4 bg-zinc-900 rounded-md" onClick={showMainView}>
            Cancel
          </button>
        </div>
      )}
    </Modal>
  );
}

import { useState } from "react";
import { useForm, FieldValues, SubmitHandler, set } from "react-hook-form";
import { toast } from "react-hot-toast";
import { supabase } from "@/lib/supabase/client";
import uniqid from "uniqid";
import { useRouter } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { createTrack } from "@/actions/tracks";

import Modal from "./Modal";
import Input from "./Input";
import Button from "./Button";
import { useProjectModal } from "@/hooks/useProjectModal";
import { createProject } from "@/actions/projects";

export default function ProjectModal() {
  const [isLoading, setIsLoading] = useState(false);
  const projectModal = useProjectModal();
  const router = useRouter();

  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: { title: "", description: "", song: null, image: null },
  });

  const onChange = (open: boolean) => {
    if (!open) {
      reset();
      projectModal.onClose();
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async values => {
    try {
      setIsLoading(true);

      const imageFile = values.image?.[0];
      const songFile = values.song?.[0];

      console.log(values, songFile);

      if (!imageFile || !songFile) {
        toast.error("Missing fields");
      }

      const uniqueID = uniqid();

      const { data: songData, error: songError } = await supabase.storage
        .from("songs")
        .upload(`song-${values.title}-${uniqueID}`, songFile, {
          cacheControl: "3600",
          upsert: false,
        });

      if (songError) {
        setIsLoading(false);
        return toast.error("Failed song upload");
      }

      const { data: imageData, error: imageError } = await supabase.storage
        .from("images")
        .upload(`image-${values.title}-${uniqueID}`, imageFile, {
          cacheControl: "3600",
          upsert: false,
        });

      if (imageError) {
        setIsLoading(false);
        return toast.error("Failed image upload");
      }

      const track = await createProject(values.title, values.description);

      if (!track) {
        return toast.error("Failed to create track");
      }

      router.refresh();
      setIsLoading(false);
      toast.success("Song created!");
      reset();
      projectModal.onClose();
    } catch (error) {
      projectModal.onClose();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title="Create a project"
      description="Fill out the form"
      isOpen={projectModal.isOpen}
      onChange={onChange}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
        <div>
          <div className="pb-1">Project Title</div>
          <Input
            id="title"
            disabled={isLoading}
            {...register("title", { required: true })}
            placeholder="Project title"
          />
        </div>
        <div>
          <div className="pb-1">Project description</div>
          <Input
            id="description"
            disabled={isLoading}
            {...register("description", { required: true })}
            placeholder="Description"
          />
        </div>
        <div>
          <div className="pb-1">Select a song file</div>
          <Input
            placeholder="test"
            disabled={isLoading}
            type="file"
            accept=".mp3, .wav"
            id="song"
            {...register("song", { required: true })}
          />
        </div>
        <div>
          <div className="pb-1">Select an image</div>
          <Input
            placeholder="test"
            disabled={isLoading}
            type="file"
            accept=".JPG"
            id="image"
            {...register("image", { required: true })}
          />
        </div>
        <Button disabled={isLoading} type="submit">
          Create
        </Button>
      </form>
    </Modal>
  );
}

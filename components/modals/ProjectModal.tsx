import { useState } from "react";
import { useForm, FieldValues, SubmitHandler, set } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Modal from "./Modal";
import Input from "../customizable/Input";
import Button from "../customizable/Button";
import { useProjectModal } from "@/hooks/useProjectModal";
import { createProject } from "@/actions/projects";
import { uploadImageToSupabase } from "@/actions/supabase-actions";

export default function ProjectModal() {
  const [isLoading, setIsLoading] = useState(false);
  const projectModal = useProjectModal();
  const router = useRouter();

  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: { title: "", description: "", image: null },
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

      if (!imageFile) {
        toast.error("Missing fields");
      }

      const imageData = await uploadImageToSupabase(imageFile);

      const project = await createProject(
        values.title,
        values.description,
        imageData.path
      );

      console.log("test");

      if (!project) {
        return toast.error("Failed to create project");
      }

      router.refresh();
      setIsLoading(false);
      toast.success("Project created!");
      reset();
      projectModal.onClose();
    } catch (error) {
      console.error("Error creating project:", error);
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
          <div className="pb-1">Project Description</div>
          <Input
            id="description"
            disabled={isLoading}
            {...register("description", { required: true })}
            placeholder="Description"
          />
        </div>
        <div>
          <div className="pb-1">Select Cover Art</div>
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

"use client";

import { useEffect, useState } from "react";
import { useForm, FieldValues, SubmitHandler, set } from "react-hook-form";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { updateUser } from "@/actions/users";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";

interface EditItemProps {
  title: string;
  attribute: string;
  value: string;
}

export default function EditItem({ title, attribute, value }: EditItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();
  const { setUser } = useUser();

  const { register, handleSubmit, reset, setValue } = useForm<FieldValues>({
    defaultValues: { [attribute]: value },
  });

  useEffect(() => {
    setValue(attribute, value);
  }, [isEditing, value, setValue, attribute]);

  const onSubmit: SubmitHandler<FieldValues> = async values => {
    const updatedValue = { [attribute]: values[attribute] };
    const updatedUser = await updateUser(updatedValue);
    if (!updatedUser) {
      return toast.error("Failed to update user");
    }
    setUser(updatedUser);
    toast.success("User updated");

    reset();
    router.refresh();
    setIsEditing(!isEditing);
  };

  return (
    <form
      className="flex py-6 items-start justify-between"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>{title}</div>
      {isEditing ? (
        <Input
          id={attribute}
          {...register(attribute, { required: true })}
          className="w-44"
        />
      ) : (
        <div>{value}</div>
      )}
      {isEditing ? (
        <div className="flex gap-2">
          <Button className="h-6" onClick={() => setIsEditing(!isEditing)}>
            Cancel
          </Button>

          <Button type="submit" className="h-6">
            Submit
          </Button>
        </div>
      ) : (
        <Button className="h-6" onClick={() => setIsEditing(!isEditing)}>
          Edit
        </Button>
      )}
    </form>
  );
}

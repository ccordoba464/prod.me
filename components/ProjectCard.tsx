interface ProjectCardProps {
  project: {
    id: string;
    user_id: string;
    title: string;
    description: string;
    cover_image_url: string;
    created_at: string;
    updated_at: string;
  };
}

export const ProjectCard = () => {
  return (
    <div className="flex flex-col text-xs font-bold">
      <div className="w-[160px] h-[160px] overflow-hidden rounded-sm bg-[#3b4045] mb-1"></div>
      <div className="">Project Name</div>
      <div className=" text-gray-500">3 tracks</div>
    </div>
  );
};

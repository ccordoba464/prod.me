import Image from "next/image";
import ellipses from "@/public/images/ellipsis-solid.svg";
import { getProject } from "@/actions/projects";
import { fetchProjectTracks } from "@/actions/project-tracks";
import { useForm, FieldValues, SubmitHandler, set } from "react-hook-form";
import { createTrack } from "@/actions/tracks";
import CreateTrackButton from "@/components/project/CreateTrackButton";
import ProjectTrackItem from "@/components/project/ProjectTrackItem";
import { Project_track, Track } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { SlOptions } from "react-icons/sl";
import { useLoadImage } from "@/hooks/useLoadImage";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { BsShuffle } from "react-icons/bs";
import { IoAdd } from "react-icons/io5";
import PlayProjectButton from "@/components/project/PlayProjectButton";

export default async function ProjectPage({
  params: { projectid },
}: {
  params: {
    projectid: string;
  };
}) {
  const projectData = getProject(projectid);
  const projectTracksData = fetchProjectTracks(projectid);

  const [project, projectTracks] = await Promise.all([
    projectData,
    projectTracksData,
  ]);

  const imageUrl = useLoadImage(project?.image_path!);

  if (!imageUrl) {
  }

  return (
    <div className="flex p-6 mx-auto w-full h-full mt-14">
      <div className="flex gap-8 w-full">
        <div className="flex">
          <div className="flex w-96 h-96 bg-gray-600 justify-center items-center rounded-md">
            {imageUrl === "" ? (
              <span className="text-white">Change Cover Art</span>
            ) : (
              <Image
                className="object-cover w-full h-full"
                src={imageUrl!}
                width={384}
                height={384}
                alt="cover art"
              />
            )}
          </div>
        </div>
        <div className="flex-1 flex-col">
          <div className="flex items-center justify-between mb-6">
            <div className="">
              <h1 className="text-4xl font-bold mb-1">{project?.title}</h1>
              <p className="text-zinc-700">
                <span>1 track</span> • <span>Created this day</span>
              </p>
            </div>
            <div className="flex gap-4">
              <div className="rounded-full bg-red-500 size-10 flex items-center justify-center cursor-pointer ">
                <PlayProjectButton projectTracks={projectTracks} />
              </div>
              <div className="rounded-full bg-red-500 size-10 flex items-center justify-center cursor-pointer">
                <CreateTrackButton projectid={projectid} />
              </div>
              <div className="rounded-full bg-red-500 size-10 flex items-center justify-center cursor-pointer">
                <SlOptions />
              </div>
            </div>
          </div>

          <div className="mb-6">{project?.description}</div>

          <div className="flex gap-2">
            <button className="px-4 py-2 mb-10 rounded-lg bg-red-500 text-white font-bold">
              Play
            </button>
            <button className="px-4 py-2 mb-10 rounded-lg bg-red-500 text-white font-bold">
              Shuffle
            </button>
          </div>

          <ul className="flex flex-col gap-2 pb-32 mb-4">
            {projectTracks.map(
              (projectTrack: Project_track & { track: Track }) => (
                <ProjectTrackItem
                  key={projectTrack.track_id}
                  projectTrack={projectTrack}
                />
              )
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

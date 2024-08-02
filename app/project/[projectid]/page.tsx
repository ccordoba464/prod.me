import Image from "next/image";
import ellipses from "@/public/images/ellipsis-solid.svg";
import { fetchProjectTracks, getProject } from "@/actions/projects";
import { useForm, FieldValues, SubmitHandler, set } from "react-hook-form";
import { createTrack } from "@/actions/tracks";
import CreateTrackButton from "@/components/CreateTrackButton";

export default async function ProjectPage({
  params: { projectid },
}: {
  params: {
    projectid: string;
  };
}) {
  console.log(typeof projectid);
  const projectData = getProject(projectid);
  const projectTracksData = fetchProjectTracks(projectid);

  const [project, projectTracks] = await Promise.all([
    projectData,
    projectTracksData,
  ]);

  return (
    <div className="flex p-6 mx-auto] w-full h-full mt-14">
      <div className="flex gap-8 w-full">
        <div className="flex">
          <div className="flex w-96 h-96 bg-gray-600 justify-center items-center rounded-md">
            <span className="text-white">Change Cover Art</span>
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
              <div className="p-2 rounded-full bg-red-500 w-12 h-12">
                <div className="w-12 h-12"></div>
              </div>
              <div className="p-2 rounded-full bg-red-500 w-12 h-12">
                <div className="w-12 h-12"></div>
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
            <CreateTrackButton projectid={projectid} />
          </div>

          <ul className="flex flex-col gap-2 pb-32 mb-4">
            {projectTracks.map((projectTrack: any) => (
              <li
                key={projectTrack.id}
                className="flex justify-between items-center hover:bg-gray-100 px-4 py-2 rounded-lg"
              >
                <div>
                  <p>
                    {projectTrack.position}. {projectTrack.track.title}
                  </p>
                  <p className="text-zinc-400">May 7, 2024</p>
                </div>
                <button className="hover:bg-gray-200 w-8 h-6 rounded-lg flex items-center justify-center">
                  <Image width={16} height={16} src={ellipses} alt="more" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

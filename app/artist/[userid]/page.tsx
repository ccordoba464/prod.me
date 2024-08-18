import { getUserById } from "@/actions/users";
import ProfileTrackItem from "@/components/artist/ProfileTrackItem";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface ProfileProps {
  params: {
    userid: string;
  };
}

export default async function Profile({ params }: ProfileProps) {
  const { userid } = params;

  const user = await getUserById(userid);

  return (
    <div className="flex flex-col w-full h-full ">
      <div className="flex">
        <div className="flex size-72 md:size-96 bg-gray-600 justify-center items-center rounded-md mr-10">
          {user?.profile_picture_url! ? (
            <Image
              className="object-cover w-full h-full"
              src={user?.profile_picture_url!}
              width={320}
              height={320}
              alt="cover art"
            />
          ) : (
            <span className="text-white">Change Cover Art</span>
          )}
        </div>

        <div className="flex flex-1 flex-col justify-between">
          <div className="flex flex-col">
            <div className="flex justify-between items-center mb-2">
              <div className="text-5xl">{user?.username}</div>
              <div className="flex gap-4">
                <Button variant="secondary">Listen</Button>
                <Button variant="outline">Follow</Button>
              </div>
            </div>
            <div className="text-lg">100 Monthly Listeners</div>
          </div>

          <div className="flex flex-col ">
            <div className="text-xl mb-2">Top songs</div>
            <div className="flex flex-1 items-end gap-3">
              <div className="flex-1 flex flex-col gap-2">
                <ProfileTrackItem />
                <ProfileTrackItem />
                <ProfileTrackItem />
              </div>
              <div className="flex-1 flex flex-col gap-2">
                <ProfileTrackItem />
                <ProfileTrackItem />
                <ProfileTrackItem />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex ">
        <div className="flex flex-col py-10 flex-1">
          <div className="flex justify-between flex-1">
            <div>Title</div>
            <div>See All</div>
          </div>
          <div className="flex">
            <div className="flex flex-col">
              <div className="w-[180px] h-[180px] overflow-hidden bg-[#3b4045] rounded-md"></div>

              <div className="flex">
                <div>Title</div>
                <div>Play Button</div>
              </div>
              <div className="flex">
                <div>Artist</div>
                <div>Length</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

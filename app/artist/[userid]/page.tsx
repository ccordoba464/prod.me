import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  TabIndicator,
} from "@chakra-ui/react";
import Image from "next/image";
import { TrackInsightCard, InsightCard } from "@/components/InsightCard";
import { prisma } from "@/prisma/prisma";
interface ProfileProps {
  params: {
    userid: string;
  };
}

export default async function Profile({ params }: ProfileProps) {
  const { userid } = params;
  const tracks = await prisma.track.findMany();
  const user = await prisma.user.findUnique({ where: { id: userid } });

  return (
    <div className="flex bg-white flex-col mx-auto w-[1200px] mt-14">
      <div className="flex p-20 bg-gray-600 items-center">
        <div className="w-[200px] h-[200px] overflow-hidden mr-10">
          <Image
            src="/profilepic.JPG"
            width={200}
            height={200}
            objectFit="cover"
            alt="Profile Picture"
          />
        </div>

        <div className="flex flex-col">
          <h1 className="text-white font-bold text-6xl uppercase">
            {user?.username}
          </h1>
          <h2>{user?.username}</h2>
        </div>
      </div>

      <div className="px-6 py-2">
        <Tabs colorScheme="red">
          <TabList>
            <Tab>All</Tab>
            <Tab>Tracks</Tab>
            <Tab>Beats</Tab>
            <Tab>Opens</Tab>
          </TabList>
          <TabIndicator mt="-1.5px" height="2px" borderRadius="1px" />
          <TabPanels>
            <TabPanel>
              <div className="flex flex-col gap-4 mb-20">
                {tracks.map(track => (
                  <InsightCard key={track.id} track={track} />
                ))}
              </div>
            </TabPanel>
            <TabPanel>
              <div className="flex flex-col gap-4 mb-20">
                {tracks.map(track => (
                  <TrackInsightCard key={track.id} track={track} />
                ))}
              </div>
            </TabPanel>
            <TabPanel>
              <div className="flex flex-col gap-4 mb-20">
                {tracks.map(track => (
                  <InsightCard key={track.id} track={track} />
                ))}
              </div>
            </TabPanel>
            <TabPanel>
              <div className="flex flex-col gap-4 mb-20">
                {tracks.map(track => (
                  <InsightCard key={track.id} track={track} />
                ))}
              </div>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </div>
  );
}

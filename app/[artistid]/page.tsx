import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  TabIndicator,
} from "@chakra-ui/react";
import Image from "next/image";
import OpenCard from "@/components/OpenCard";

export default function Profile({ params }: { params: any }) {
  return (
    <div className="flex bg-white flex-col mx-auto w-[1200px]">
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
            {params.artistid}
          </h1>
          <h2>{params.artistid}</h2>
        </div>
      </div>

      <div className="px-6 py-2">
        <Tabs position="relative" variant="unstyled">
          <TabList>
            <Tab>All</Tab>
            <Tab>Beats</Tab>
            <Tab>Opens</Tab>
            <Tab>Tracks</Tab>
          </TabList>
          <TabIndicator
            mt="-1.5px"
            height="2px"
            bg="blue.500"
            borderRadius="1px"
          />
          <TabPanels>
            <TabPanel>
              <div className="flex flex-col gap-4 mb-20">
                <OpenCard />
                <OpenCard />
                <OpenCard />
              </div>
            </TabPanel>
            <TabPanel>
              <div className="flex flex-col gap-4 mb-20">
                <OpenCard />
                <OpenCard />
                <OpenCard />
                <OpenCard />
              </div>
            </TabPanel>
            <TabPanel>
              <div className="flex flex-col gap-4 mb-20">
                <OpenCard />
                <OpenCard />
                <OpenCard />
                <OpenCard />
                <OpenCard />
              </div>
            </TabPanel>
            <TabPanel>
              <div className="flex flex-col gap-4 mb-20">
                <OpenCard />
                <OpenCard />
                <OpenCard />
                <OpenCard />
              </div>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </div>
  );
}

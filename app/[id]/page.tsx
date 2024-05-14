import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  TabIndicator,
} from "@chakra-ui/react";
import Image from "next/image";

export default function Profile({ params }: { params: any }) {
  return (
    <div className="flex bg-red-50 flex-col mx-auto w-[1300px]">
      <div className="flex p-20 bg-red-200 items-center">
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
            {params.id}
          </h1>
          <h2>{params.id}</h2>
        </div>
      </div>

      <div className="px-6 py-2">
        <Tabs position="relative" variant="unstyled">
          <TabList>
            <Tab>All</Tab>
            <Tab>Popular</Tab>
            <Tab>Unreleased</Tab>
            <Tab>Open</Tab>
          </TabList>
          <TabIndicator
            mt="-1.5px"
            height="2px"
            bg="blue.500"
            borderRadius="1px"
          />
          <TabPanels>
            <TabPanel>
              <div className="flex flex-col mb-4">
                <div className="flex h-[140px] items-center gap-12">
                  <div className="w-[140px] h-[140px] overflow-hidden bg-[#3b4045] rounded-md"></div>
                  <div className="text-2xl font-bold">Song Title</div>
                  <div className="text-md">KEY</div>
                  <div className="text-md">BPM</div>
                  <button>Download</button>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex h-[140px]">
                  <div className="w-[140px] h-[140px] overflow-hidden mr-10 bg-[#3b4045] rounded-md"></div>
                  <div className="flex flex-col justify-center">
                    <div className="text-2xl font-bold">Song Title</div>
                    <div>Artist name</div>
                  </div>
                </div>
              </div>
            </TabPanel>
            <TabPanel>
              <p>two!</p>
            </TabPanel>
            <TabPanel>
              <p>three!</p>
            </TabPanel>
            <TabPanel>
              <p>Four</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </div>
  );
}

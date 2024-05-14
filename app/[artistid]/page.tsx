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
    <div className="flex bg-red-50 flex-col mx-auto w-[1200px]">
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
            {params.artistid}
          </h1>
          <h2>{params.artistid}</h2>
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
              <div className="flex flex-col">
                <div className="flex items-center justify-between shadow-md rounded-md w-full bg-red-100 ">
                  <div className="flex">
                    <div className="w-[140px] h-[140px] overflow-hidden mr-10 bg-[#3b4045] rounded-md"></div>
                    <div className="flex flex-col justify-center">
                      <div className="text-xl font-bold ">Song Title</div>
                      <div className="text-sm font-bold text-gray-500">
                        Artist name
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-14">
                    <div className="flex flex-col items-center">
                      <div className="text-lg font-bold">B Major</div>
                      <div className="text-sm font-bold text-gray-500">Key</div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="text-lg font-bold">130</div>
                      <div className="text-sm font-bold text-gray-500">BPM</div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="text-lg font-bold">Hip Hop</div>
                      <div className="text-sm font-bold text-gray-500">
                        Genre
                      </div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="text-lg font-bold">2:23</div>
                      <div className="text-sm font-bold text-gray-500">
                        Duration
                      </div>
                    </div>
                  </div>

                  <div className="mr-6">Play</div>
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

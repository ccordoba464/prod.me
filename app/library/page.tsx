import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  TabIndicator,
} from "@chakra-ui/react";
import InsightCard from "@/components/InsightCard";

export default function Library({ params }: { params: any }) {
  return (
    <div className="flex bg-white flex-col mx-auto w-[1200px]">
      <div className="px-6 py-4">
        <Tabs colorScheme="red">
          <TabList>
            <Tab>Projects</Tab>
            <Tab>Tracks</Tab>
            <Tab>Beats</Tab>
            <Tab>Opens</Tab>
          </TabList>
          <TabIndicator mt="-1.5px" height="2px" borderRadius="1px" />
          <TabPanels>
            <TabPanel>
              <div className="flex flex-col gap-4 mb-20"></div>
            </TabPanel>
            <TabPanel>
              <div className="flex flex-col gap-4 mb-20"></div>
            </TabPanel>
            <TabPanel>
              <div className="flex flex-col gap-4 mb-20"></div>
            </TabPanel>
            <TabPanel>
              <div className="flex flex-col gap-4 mb-20">
                <InsightCard />
                <div className="flex flex-col">
                  <div className="w-[160px] h-[160px] overflow-hidden bg-[#3b4045] rounded-md"></div>
                </div>
                <div className="flex flex-col">
                  <div className="w-[160px] h-[160px] overflow-hidden bg-[#3b4045] rounded-md"></div>
                </div>
                <div className="flex flex-col">
                  <div className="w-[160px] h-[160px] overflow-hidden bg-[#3b4045] rounded-md"></div>
                </div>
                <div className="flex flex-col">
                  <div className="w-[160px] h-[160px] overflow-hidden bg-[#3b4045] rounded-md"></div>
                </div>
              </div>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </div>
  );
}

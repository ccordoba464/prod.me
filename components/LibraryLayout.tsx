"use client";

import { useRouter, usePathname } from "next/navigation";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  TabIndicator,
  Input,
  Button,
} from "@chakra-ui/react";
import { useEffect, useState, useRef } from "react";
import Uploader from "./Uploader";

const tabs = ["All", "Projects", "Tracks", "Beats", "Opens"];

export default function LibraryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const tabIndex = tabs.findIndex(tab =>
      pathname.toLowerCase().includes(tab.toLowerCase())
    );
    setSelectedIndex(tabIndex === -1 ? 0 : tabIndex);
  }, [pathname]);

  const handleTabChange = (index: number) => {
    const tab = tabs[index].toLowerCase();
    const path = tab === "all" ? "/library" : `/library/${tab}`;
    router.push(path);
  };

  return (
    <div className="flex bg-white flex-col mx-auto w-[1200px]">
      <div className="px-6 py-10">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-5xl">Library</h1>
          <div className="flex items-center">
            <Input placeholder="Search" mr={3} size="md" />
            <Uploader />
          </div>
        </div>
        <Tabs
          colorScheme="red"
          index={selectedIndex}
          onChange={handleTabChange}
        >
          <TabList>
            {tabs.map((tab, index) => (
              <Tab key={index}>{tab}</Tab>
            ))}
          </TabList>
          <TabIndicator mt="-1.5px" height="2px" borderRadius="1px" />
          <TabPanels>
            {tabs.map((_, index) => (
              <TabPanel key={index}>{children}</TabPanel>
            ))}
          </TabPanels>
        </Tabs>
      </div>
    </div>
  );
}

"use client";

import { useRouter, usePathname } from "next/navigation";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  TabIndicator,
} from "@chakra-ui/react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function LibraryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const tabs = ["Projects", "Tracks", "Beats", "Opens"];
  const router = useRouter();
  const pathname = usePathname();
  const [selectedIndex, setSelectedIndex] = useState(0);
  console.log(pathname);

  useEffect(() => {
    const tabIndex = tabs.findIndex(tab =>
      pathname.toLowerCase().includes(tab.toLowerCase())
    );
    setSelectedIndex(tabIndex === -1 ? 0 : tabIndex);
  }, [pathname]);

  const handleTabChange = (index: number) => {
    router.push(`/library/${tabs[index].toLowerCase()}`);
  };

  return (
    <div className="flex bg-white flex-col mx-auto w-[1200px]">
      <div className="px-6 py-4">
        <Tabs
          colorScheme="red"
          index={selectedIndex}
          onChange={handleTabChange}
        >
          <TabList>
            {tabs.map((tab, index) => (
              <Tab key={index}>
                <Link href={`/library/${tab.toLowerCase()}`}>{tab}</Link>
              </Tab>
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

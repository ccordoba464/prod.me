import { ReactNode } from "react";
import LibraryLayout from "@/components/LibraryLayout";

export default function LibraryRootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <LibraryLayout>{children}</LibraryLayout>;
}

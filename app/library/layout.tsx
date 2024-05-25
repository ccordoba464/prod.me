import { ReactNode } from "react";
import LibraryLayout from "@/components/LibraryLayout";

export default function LibraryRootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="mt-14">
      <LibraryLayout>{children}</LibraryLayout>
    </div>
  );
}

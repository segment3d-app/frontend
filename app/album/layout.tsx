import Sidebar from "@/components/common/sidebar/sidebar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Album | Segment3d App",
  description: "Generated 3D Model by Utilizing Gaussian Splatting",
};

export default function AlbumLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-full justify-end ">
      <Sidebar />
      <div className="overflow auto w-[calc(100%-250px)]">{children}</div>
    </div>
  );
}

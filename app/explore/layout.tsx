import Sidebar from "@/components/sidebar/sidebar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Explore | Segment3d App",
  description: "Generated 3D Model by Utilizing Gaussian Splatting",
};

export default function ExploreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <div className="w-[250px]">
        <Sidebar />
      </div>
      {children}
    </div>
  );
}

import Sidebar from "@/components/sidebar/sidebar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Capture | Segment3d App",
  description: "Generated 3D Model by Utilizing Gaussian Splatting",
};

export default function CaptureLayout({
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

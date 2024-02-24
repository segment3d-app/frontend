"use client";

import { FC } from "react";
import CaptureCard from "../common/capture-card/capture-card";
import FloatingFilter from "../common/floating-filter/floating-filter";
import { Asset } from "@/model/asset";

interface CaptureProps {
  assets?: Asset[];
}

const Capture: FC<CaptureProps> = ({ assets }) => {
  return (
    <div className="my-8 w-full">
      <FloatingFilter>
        <div className="mb-4 flex flex-col gap-4 text-center">
          <div className="px-8 text-2xl font-bold">
            Explore the Frontier of 3D Gaussian Here
          </div>
          <div>Create your first NeRF capture today.</div>
        </div>
      </FloatingFilter>
      <div className="grid grid-cols-3 gap-4 px-8 pt-4">
        {assets?.map((asset) => (
          <div key={asset.id}>
            <CaptureCard asset={asset} />
          </div>
        ))}
      </div>
    </div>
  );
};

Capture.displayName = "Capture";
export default Capture;

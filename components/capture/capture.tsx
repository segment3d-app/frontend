"use client";

import { FC, useState } from "react";
import CaptureCard from "../common/capture-card/capture-card";
import FloatingFilter from "../common/floating-filter/floating-filter";
import { Asset } from "@/model/asset";
import { removeAsset } from "@/app/capture/action";
import { useToast } from "../ui/use-toast";

interface CaptureProps {
  assets?: Asset[];
}

const Capture: FC<CaptureProps> = ({ assets }) => {
  const [curAssets, setCurAssets] = useState<Asset[] | undefined>(assets);
  const { toast } = useToast();

  const removeAssetHandler = (id: string) => {
    try {
      removeAsset(id);
      setCurAssets(curAssets?.filter((asset) => asset.id != id));
      toast({ title: "Success", description: "Asset is removed" });
    } catch {
      toast({
        title: "Error",
        description: "Failed to remove asset",
        variant: "destructive",
      });
    }
  };

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
        {curAssets?.map((asset) => (
          <div key={asset.id}>
            <CaptureCard
              asset={asset}
              removeAssetHandler={removeAssetHandler}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

Capture.displayName = "Capture";
export default Capture;

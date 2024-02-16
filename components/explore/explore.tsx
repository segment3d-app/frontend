/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import AssetCard from "../common/asset-card/asset-card";
import FloatingFilter from "../common/floating-filter/floating-filter";
import { clientAxios } from "@/utils/axios";
import { useToast } from "../ui/use-toast";

export interface Asset {
  assetType: string;
  gaussianUrl: string;
  id: string;
  likes: number;
  pointCloudUrl: string;
  slug: string;
  status: string;
  thumbnailUrl: string;
  assetUrl: string;
  title: string;
  user: {
    avatar: string;
    id: string;
    name: string;
  };
}

export default function Explore() {
  const [assets, setAssets] = useState<Asset[] | null>();
  const { toast } = useToast();

  const getAssetsData = async () => {
    try {
      const {
        data: { assets },
      }: {
        data: {
          assets: Asset[] | null;
        };
      } = await clientAxios.get("/api/assets");

      setAssets(assets);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error?.response?.data?.error || "internal server error",
      });
    }
  };
  useEffect(() => {
    getAssetsData();
  }, []);

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
        {/* {Array.from({ length: 5 }).map((_, id) => (
          <div key={id}>
            <AssetCard />
          </div>
        ))} */}
        {assets?.map((asset) => (
          <div key={asset.id}>
            <AssetCard asset={asset} />
          </div>
        ))}
      </div>
    </div>
  );
}

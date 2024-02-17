/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { FC } from "react";
import AssetCard from "../common/asset-card/asset-card";
import FloatingFilter from "../common/floating-filter/floating-filter";

type ExploreProps = {
  assets?: Asset[];
};

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

const Explore: FC<ExploreProps> = ({ assets }) => {
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
            <AssetCard asset={asset} />
          </div>
        ))}
      </div>
    </div>
  );
};

Explore.displayName = "Explore";
export default Explore;

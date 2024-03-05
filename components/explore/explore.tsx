/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { FC, useEffect } from "react";
import AssetCard from "../common/asset-card/asset-card";
import FloatingFilter from "../common/floating-filter/floating-filter";
import { Asset } from "@/model/asset";
import { useTheme } from "next-themes";
import Image from "next/image";
import { Button } from "../ui/button";
import { UploadIcon } from "@radix-ui/react-icons";

type ExploreProps = {
  assets?: Asset[];
};

const Explore: FC<ExploreProps> = ({ assets }) => {
  const { theme, setTheme } = useTheme();
  useEffect(() => {
    if (!theme) {
      setTheme("dark");
    }
  }, [theme, setTheme]);
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
      {assets?.length ? (
        <div className="grid grid-cols-3 gap-4 px-8 pt-4">
          {assets?.map((asset) => (
            <div key={asset.id}>
              <AssetCard asset={asset} />
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-8 flex h-full w-full flex-col items-center px-8">
          <Image
            src={"/img/error/asset-empty.png"}
            width={500}
            height={450}
            alt="503 vector"
          />
          <div className="flex w-full max-w-[500px] flex-col items-center gap-2">
            <h1 className="text-center text-xl font-black">
              There is no assets yet
            </h1>
            <p className="text-center">You can make your asset first!</p>
            <Button
              variant="outline"
              className="mt-4 flex gap-4"
              size="lg"
              onClick={() =>
                document
                  .getElementById("create-gaussian-splatting-trigger")
                  ?.click()
              }
            >
              <span>Create 3D Asset</span>
              <UploadIcon />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

Explore.displayName = "Explore";
export default Explore;

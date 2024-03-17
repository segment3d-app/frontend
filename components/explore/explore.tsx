/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { FC, useEffect, useState } from "react";
import AssetCard from "../common/asset-card/asset-card";
import FloatingFilter from "../common/floating-filter/floating-filter";
import { Asset } from "@/model/asset";
import { useTheme } from "next-themes";
import Image from "next/image";
import { Button } from "../ui/button";
import { UploadIcon } from "@radix-ui/react-icons";
import useAuthStore from "@/store/useAuthStore";
import { useToast } from "../ui/use-toast";
import { getAllAsset } from "@/app/explore/action";
import { debounce } from "lodash";
import LoadingState from "../common/loading-state";

type ExploreProps = {
  assets?: Asset[];
};

export interface AssetQuery {
  keyword: string;
  filter: string[];
}

const Explore: FC<ExploreProps> = ({ assets }) => {
  const { theme, setTheme } = useTheme();
  const { getIsAuthenticated } = useAuthStore();
  const { toast } = useToast();
  const [curAssets, setCurAssets] = useState<Asset[] | undefined>(assets);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [assetQuery, setAssetQuery] = useState<AssetQuery>({
    keyword: "",
    filter: [],
  });

  const onSearchChangeHandler = async (val: string) => {
    const debouncedApiCall = debounce(async (searchTerm: string) => {
      setAssetQuery({ ...assetQuery, keyword: searchTerm });
    }, 500);

    debouncedApiCall(val);
  };

  const onFilterChangeHandler = async (filter: string[]) => {
    setAssetQuery({ ...assetQuery, filter: filter });
  };

  const reFetchAsset = async () => {
    setIsLoading(true);
    try {
      const newAssets = await getAllAsset(
        assetQuery?.keyword ?? "",
        assetQuery?.filter ?? [],
      );
      setCurAssets(newAssets);
    } catch (error) {}
    setIsLoading(false);
  };

  useEffect(() => {
    reFetchAsset();
  }, [assetQuery]);

  useEffect(() => {
    if (!theme) {
      setTheme("dark");
    }
  }, [theme, setTheme]);

  const isNotLoginHandler = () => {
    document.getElementById("dialog-auth-btn")?.click();
    toast({
      title: "Error",
      description: "you need to login first",
      variant: "destructive",
    });
  };

  return (
    <div className="my-8 w-full">
      <FloatingFilter
        onSearch={onSearchChangeHandler}
        onFilter={onFilterChangeHandler}
      >
        <div className="mb-4 flex flex-col gap-4 text-center">
          <div className="px-8 text-2xl font-bold">
            Explore the Frontier of 3D Gaussian Here
          </div>
          <div>Create your first NeRF capture today.</div>
        </div>
      </FloatingFilter>
      {isLoading ? (
        <LoadingState className="mt-4" />
      ) : (
        <>
          {curAssets?.length ? (
            <div className="grid grid-cols-3 gap-4 px-8 pt-4">
              {curAssets?.map((asset) => (
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
                  onClick={() => {
                    if (!getIsAuthenticated()) {
                      isNotLoginHandler();
                      return;
                    }
                    document
                      .getElementById("create-gaussian-splatting-trigger")
                      ?.click();
                  }}
                >
                  <span>Create 3D Asset</span>
                  <UploadIcon />
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

Explore.displayName = "Explore";
export default Explore;

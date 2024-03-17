"use client";

import { FC, useEffect, useState } from "react";
import CaptureCard from "../common/capture-card/capture-card";
import FloatingFilter from "../common/floating-filter/floating-filter";
import { Asset } from "@/model/asset";
import { getMyAsset, removeAsset } from "@/app/capture/action";
import { useToast } from "../ui/use-toast";
import { Button } from "../ui/button";
import { UploadIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { debounce } from "lodash";
import LoadingState from "../common/loading-state";
import { AssetQuery } from "../explore/explore";

interface CaptureProps {
  assets?: Asset[];
}

const Capture: FC<CaptureProps> = ({ assets }) => {
  const [curAssets, setCurAssets] = useState<Asset[] | undefined>(assets);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [assetQuery, setAssetQuery] = useState<AssetQuery>({
    keyword: "",
    filter: [],
  });
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
      const newAssets = await getMyAsset(
        assetQuery?.keyword ?? "",
        assetQuery?.filter ?? [],
      );
      setCurAssets(newAssets);
    } catch (error) {}
    setIsLoading(false);
  };

  useEffect(() => {
    reFetchAsset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assetQuery]);

  return (
    <div className="my-8 w-full">
      <FloatingFilter
        onFilter={onFilterChangeHandler}
        onSearch={onSearchChangeHandler}
        additionalButon={
          <Button
            variant="outline"
            className="flex gap-4"
            size="lg"
            onClick={() =>
              document
                .getElementById("create-gaussian-splatting-trigger")
                ?.click()
            }
          >
            <span>Create</span>
            <UploadIcon />
          </Button>
        }
      >
        <div className="mb-4 flex flex-col gap-4 text-center">
          <div className="px-8 text-2xl font-bold">
            Explore the Frontier of 3D Gaussian Here
          </div>
          <div>Create your first 3D Gaussian asset today.</div>
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
                  <CaptureCard
                    asset={asset}
                    removeAssetHandler={removeAssetHandler}
                  />
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
                  You don&apos;t have any assets yet!
                </h1>
                <p className="text-center">Try uploading your asset first!</p>
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
                  <span>Create 3d Asset</span>
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

Capture.displayName = "Capture";
export default Capture;

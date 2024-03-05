"use client";

import { PlusIcon } from "@radix-ui/react-icons";
import AlbumCard from "../common/album-card/album-card";
import FloatingFilter from "../common/floating-filter/floating-filter";
import { Button } from "../ui/button";
import Image from "next/image";

export default function Album() {
  return (
    <div className="my-8 w-full">
      <FloatingFilter
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
            <span>Add</span>
            <PlusIcon />
          </Button>
        }
      >
        <div className="mb-4 flex flex-col gap-4 text-center">
          <div className="px-8 text-2xl font-bold">
            Explore the Frontier of 3D Gaussian Here
          </div>
          <div>Create your first NeRF capture today.</div>
        </div>
      </FloatingFilter>
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
            <span>Add Album</span>
            <PlusIcon />
          </Button>
        </div>
      </div>
    </div>
  );
}

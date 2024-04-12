"use client";

import { useTheme } from "next-themes";
import { FC, useEffect } from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import WebIcon from "./components/web-icon";
import AppleIcon from "./components/apple-icon";

const Home: FC = () => {
  const { setTheme } = useTheme();
  const routes = useRouter();

  useEffect(() => {
    setTheme("light");
  }, [setTheme]);

  return (
    <div className="grid max-h-[calc(100vh-64px)] w-full grid-cols-2">
      <div className="h-[calc(100vh-64px)] w-full border-r">
        <video
          src="/video/people.mp4"
          className="h-full w-full object-cover"
          autoPlay
          loop
          muted
          style={{
            transition: "all 0.8s ease-in-out 0s",
          }}
        />
      </div>
      <div className="relative">
        <div className="absolute top-1/2 flex w-full w-full -translate-y-1/2 flex-col items-end justify-end gap-2 p-8 text-end">
          <div className="text-5xl font-bold">Create Your 3D Asset Now</div>
          <div className="text-lg font-medium">
            Developed with a novel 3D rendering model,{" "}
            <span className="underline">Gaussian Splatting</span>
          </div>
          <div className="w-full">
            <div className="mb-1">Try it on:</div>
            <div className="flex w-full justify-end gap-2 font-semibold">
              <Button
                className="flex gap-2 px-4"
                variant={"outline"}
                size={"lg"}
              >
                <AppleIcon />
                IOS
              </Button>
              <Button
                variant={"outline"}
                className="flex gap-2 px-4"
                size={"lg"}
                onClick={() => routes.push("/explore")}
              >
                <WebIcon />
                Web
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Home.displayName = "Home";
export default Home;

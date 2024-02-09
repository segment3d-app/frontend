"use client";

import { usePathname, useRouter } from "next/navigation";
import Create from "./components/create";
import {
  CameraIcon,
  FilePlusIcon,
  MixIcon,
  RocketIcon,
} from "@radix-ui/react-icons";
import { Toggle } from "../ui/toggle";
import { useState } from "react";

export default function Sidebar() {
  const pathName = usePathname();
  const route = useRouter();
  const SIDEBAR_DATA = [
    {
      id: 1,
      name: "Explore",
      path: "/explore",
      icon: <RocketIcon className="h-[20px] w-[20px]" />,
      onClick: () => {
        route.push("/explore");
      },
    },
    {
      id: 2,
      name: "Capture",
      path: "/capture",
      icon: <CameraIcon className="h-[20px] w-[20px]" />,
      onClick: () => {
        route.push("/capture");
      },
    },
    {
      id: 3,
      name: "Gallery",
      path: "/gallery",
      icon: <MixIcon className="h-[20px] w-[20px]" />,
      onClick: () => {
        route.push("/gallery");
      },
    },
    {
      id: 4,
      name: <Create />,
      icon: <FilePlusIcon className="h-[20px] w-[20px]" />,
      onClick: () => {},
    },
  ];
  return (
    <div
      className={`absolute left-0 top-0 box-border block h-full w-full overflow-x-hidden overflow-y-scroll border-r border-border/40 bg-background/95 bg-white px-0 px-[32px] pb-0 pt-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 lg:fixed lg:-right-[50vw] lg:bottom-0 lg:right-0 lg:top-auto lg:z-[49] lg:h-[calc(100%-64px)] lg:w-[250px] lg:px-8`}
      style={{
        transition: "right 500ms, top 500ms ease-in-out",
        msOverflowStyle: "none",
        scrollbarWidth: "none",
      }}
    >
      {SIDEBAR_DATA.map((sidebar) => (
        <Toggle
          pressed={sidebar?.path ? pathName.includes(sidebar?.path) : false}
          key={sidebar.id}
          onClick={sidebar.onClick}
          className="text-md flex h-14 w-full cursor-pointer items-center !justify-start gap-4 hover:bg-inherit"
        >
          <div>{sidebar.icon}</div>
          <div>{sidebar.name}</div>
        </Toggle>
      ))}
    </div>
  );
}

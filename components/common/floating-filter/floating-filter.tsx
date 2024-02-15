/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronDownIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";

interface FloatingFilterProps {
  children: React.ReactNode;
}

export default function FloatingFilter({ children }: FloatingFilterProps) {
  const filterRef = useRef<HTMLDivElement>(null);
  const [isSticky, setIsSticky] = useState(false);

  const handleScroll = () => {
    if (filterRef.current) {
      const { top } = filterRef.current.getBoundingClientRect();
      setIsSticky(top <= 64);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {children}
      <div
        ref={filterRef}
        className="${ isSticky sticky top-16 z-10 w-full border-b border-border/40 bg-background/95 backdrop-blur
          supports-[backdrop-filter]:bg-background/60"
      >
        <div
          className={`flex w-full items-center justify-between gap-8 p-4 ${isSticky ? "flex-row" : "flex-col-reverse items-center !gap-4"}`}
        >
          <Button variant="outline" className="flex gap-4" size="lg">
            <span>Filter</span>
            <ChevronDownIcon />
          </Button>
          <div className="relative w-full max-w-[300px]">
            <Input
              className="h-[40px] max-w-[300px]"
              type="text"
              placeholder="Search 3D Assets"
            />
            <MagnifyingGlassIcon className="absolute right-4 top-1/2 -translate-y-1/2" />
          </div>
        </div>
      </div>
    </>
  );
}

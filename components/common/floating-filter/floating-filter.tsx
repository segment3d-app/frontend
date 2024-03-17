/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState, useRef, FC } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronDownIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { getAllTag } from "@/app/action";
import { Tag } from "@/model/tag";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface FloatingFilterProps {
  additionalButon?: React.ReactNode;
  children: React.ReactNode;
  onSearch?: (keyword: string) => void;
  needFilter?: boolean;
  onFilter?: (values: string[]) => void;
}

const FloatingFilter: FC<FloatingFilterProps> = ({
  additionalButon,
  children,
  onSearch,
  needFilter = true,
  onFilter,
}) => {
  const filterRef = useRef<HTMLDivElement>(null);
  const [isSticky, setIsSticky] = useState(false);
  const [tags, setTags] = useState<Tag[]>([]);
  const [showAllTags, setShowAllTags] = useState<boolean>(false);

  const handleScroll = () => {
    if (filterRef.current) {
      const { top } = filterRef.current.getBoundingClientRect();
      setIsSticky(top <= 64);
    }
  };

  const getTag = async () => {
    try {
      const tags = await getAllTag("", 20);
      setTags(tags);
    } catch (error) {}
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    getTag();
  }, []);

  const filterButtonClickedHandler = () => setShowAllTags(!showAllTags);

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
          <div className="flex gap-4">
            {needFilter && (
              <Button
                onClick={filterButtonClickedHandler}
                variant="outline"
                className="flex gap-4"
                size="lg"
              >
                <span>Filter</span>
                <ChevronDownIcon />
              </Button>
            )}
            {additionalButon}
          </div>
          <div className="relative w-full max-w-[300px]">
            <Input
              className="h-[40px] max-w-[300px]"
              type="text"
              placeholder="Search 3D Assets"
              onChange={(e) => {
                if (onSearch) onSearch(e.currentTarget.value);
              }}
            />
            <MagnifyingGlassIcon className="absolute right-4 top-1/2 -translate-y-1/2" />
          </div>
        </div>
        {showAllTags && (
          <ToggleGroup
            onValueChange={onFilter}
            type="multiple"
            variant="outline"
            className={`flex flex-wrap gap-2 px-4 ${isSticky ? "justify-start" : "justify-center"} pb-4`}
          >
            {tags.map((tag) => (
              <ToggleGroupItem
                key={tag.id}
                value={tag.name}
                className="flex gap-4"
              >
                {tag.name}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        )}
      </div>
    </>
  );
};

FloatingFilter.displayName = "Floating Filter";
export default FloatingFilter;

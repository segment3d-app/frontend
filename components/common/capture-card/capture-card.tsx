import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Asset } from "@/model/asset";
import { DotsVerticalIcon, HeartIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import Image from "next/image";
import { FC, useState } from "react";

interface CaptureCardProps {
  asset: Asset;
  removeAssetHandler: (id: string) => void;
}

const CaptureCard: FC<CaptureCardProps> = ({ asset, removeAssetHandler }) => {
  const { theme } = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  return (
    <Card className="p-0">
      <CardHeader className="flex flex-row items-center gap-2 p-2 text-xs">
        <div className="grid-row-2 !m-0 grid w-full">
          <p>{asset?.title}</p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <DotsVerticalIcon className="!m-0 h-[18px] w-[18px] cursor-pointer" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="ml-[32px] w-[186px]">
            <DropdownMenuLabel>Action</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => removeAssetHandler(asset.id)}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative aspect-square cursor-pointer overflow-hidden rounded-b-lg bg-[#27272A] p-0"
      >
        {isHovered && asset.assetType === "video" ? (
          <video
            src={`${process.env.NEXT_PUBLIC_API_STORAGE}${asset.assetUrl}`}
            className="aspect-square h-full w-full rounded-b-lg object-cover"
            autoPlay
            loop
            muted
            style={{
              transition: "all 0.8s ease-in-out 0s",
            }}
          />
        ) : (
          <Image
            src={`${process.env.NEXT_PUBLIC_CONTAINER_STORAGE}${asset.thumbnailUrl}`}
            width={1000}
            height={1000}
            alt={asset.title}
            style={{
              transition: "all 0.8s ease-in-out 0s",
            }}
            className="aspect-square h-full w-full rounded-b-lg object-cover transition-transform duration-200 ease-in-out group-hover:scale-[1.1]"
          />
        )}
        <div className="absolute bottom-4 left-4 z-[2] flex cursor-pointer flex-row items-center gap-2 text-xs">
          <HeartIcon className="h-[16px] w-[16px]" />
          <p>
            {asset.likes} {asset.likes > 1 ? "likes" : "like"}
          </p>
        </div>
        <div
          className={`absolute left-0 top-0 z-[1] h-full w-full bg-gradient-to-b from-[#00000000] ${theme === "dark" ? "to-[#00000088]" : "to-[#FFFFFF88]"}`}
        />
      </CardContent>
    </Card>
  );
};

CaptureCard.displayName = "Capture Card";
export default CaptureCard;

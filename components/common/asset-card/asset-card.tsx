import { Asset } from "@/components/explore/explore";
import { getUserFallbackHandler } from "@/components/header/components/user-avatar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { DotsVerticalIcon, HeartIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useState } from "react";

interface AssetCardProps {
  asset: Asset;
}

export default function AssetCard({ asset }: AssetCardProps) {
  const { theme } = useTheme();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card className="p-0">
      <CardHeader className="flex flex-row items-center gap-2 p-2 text-xs">
        <div>
          <Avatar className="cursor-pointer">
            <AvatarImage src={asset.user.avatar} />
            <AvatarFallback>
              {getUserFallbackHandler(asset.user.name)}
            </AvatarFallback>
          </Avatar>
        </div>
        <div className="grid-row-2 !m-0 grid w-full">
          <p>{asset.title}</p>
          <p>
            by <span className="cursor-pointer">{asset.user.name}</span>
          </p>
        </div>
        <div>
          <DotsVerticalIcon className="h-[18px] w-[18px] cursor-pointer" />
        </div>
      </CardHeader>
      <CardContent
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative aspect-square cursor-pointer overflow-hidden rounded-b-lg p-0"
      >
        {isHovered && asset.assetType === "video" ? (
          <video
            src={asset.assetUrl}
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
            src={asset.thumbnailUrl}
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
          className={`absolute left-0 top-0 z-[1] h-full w-full bg-gradient-to-b from-[#00000000] to-[#${theme === "dark" ? "000" : "FFF"}]`}
        />
      </CardContent>
    </Card>
  );
}

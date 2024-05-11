import { getUserFallbackHandler } from "@/components/common/header/components/user-avatar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Asset } from "@/model/asset";
import useAuthStore from "@/store/useAuthStore";
import {
  DotsVerticalIcon,
  HeartFilledIcon,
  HeartIcon,
} from "@radix-ui/react-icons";
import axios from "axios";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useState } from "react";

interface AssetCardProps {
  asset: Asset;
}

export default function AssetCard({ asset }: AssetCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [showLove, setShowLove] = useState(false);
  const [showUnlove, setShowUnlove] = useState(false);
  const { theme } = useTheme();
  const { getIsAuthenticated } = useAuthStore();
  const { toast } = useToast();

  const isNotLoginHandler = () => {
    document.getElementById("dialog-auth-btn")?.click();
    toast({
      title: "Error",
      description: "you need to login first",
      variant: "destructive",
    });
  };

  const handleOnClick = () => {
    window.location.href = `/assets/s/${asset.slug}`;
  };

  const handleDoubleClick = async () => {
    if (!getIsAuthenticated()) {
      isNotLoginHandler();
      return;
    }
    setShowLove(true);
    if (!asset.isLikedByMe) {
      asset.likes = asset.likes += 1;
      asset.isLikedByMe = true;
      await axios.post(`/api/assets/like/${asset.id}`);
    }
    setTimeout(() => {
      setShowLove(false);
    }, 1000);
  };

  const likeButtonClickHandle = async () => {
    if (!getIsAuthenticated()) {
      isNotLoginHandler();
      return;
    }
    try {
      if (!asset.isLikedByMe) {
        setShowLove(true);
        asset.likes = asset.likes += 1;
        asset.isLikedByMe = true;
        await axios.post(`/api/assets/like/${asset.id}`);
        setTimeout(() => {
          setShowLove(false);
        }, 1000);
      } else {
        setShowUnlove(true);
        asset.likes = asset.likes -= 1;
        asset.isLikedByMe = false;
        await axios.post(`/api/assets/unlike/${asset.id}`);
        setTimeout(() => {
          setShowUnlove(false);
        }, 1000);
      }
    } catch (error) {}
  };

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
        <DotsVerticalIcon className="!m-0 h-[18px] w-[18px] cursor-pointer" />
      </CardHeader>
      <CardContent
        onClick={handleOnClick}
        onDoubleClick={handleDoubleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative aspect-square cursor-pointer overflow-hidden rounded-b-lg p-0"
      >
        {/* {isHovered && asset.assetType === "video" ? (
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
        ) : ( */}
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
        {/* )} */}
        <div className="absolute bottom-4 left-4 z-[2] flex cursor-pointer flex-row items-center gap-2 text-xs">
          {asset.isLikedByMe ? (
            <HeartFilledIcon
              onClick={(e) => {
                e.stopPropagation();
                likeButtonClickHandle();
              }}
              color="#b30f15"
              className="h-[16px] w-[16px]"
            />
          ) : (
            <HeartIcon
              onClick={(e) => {
                e.stopPropagation();
                likeButtonClickHandle();
              }}
              className="h-[16px] w-[16px]"
            />
          )}
          <p>
            {asset.likes} {asset.likes > 1 ? "likes" : "like"}
          </p>
        </div>
        <div
          className={`absolute left-0 top-0 z-[1] h-full w-full bg-gradient-to-b from-[#00000000] ${theme === "dark" ? "to-[#00000088]" : "to-[#FFFFFF88]"}`}
        />
        {showLove && (
          <div className="absolute left-1/2 top-1/2 z-[1] -translate-x-1/2 -translate-y-1/2">
            <HeartFilledIcon
              className="w-full animate-heartBounce"
              width={150}
              height={150}
              color="#b30f15"
            />
          </div>
        )}
        {showUnlove && (
          <div className="absolute left-1/2 top-1/2 z-[1] -translate-x-1/2 -translate-y-1/2">
            <HeartFilledIcon
              className="w-full animate-heartBounce"
              width={150}
              height={150}
              color="#FFF"
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}

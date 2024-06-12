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
import {
  DotsVerticalIcon,
  HeartFilledIcon,
  HeartIcon,
} from "@radix-ui/react-icons";
import axios from "axios";
import { useTheme } from "next-themes";
import Image from "next/image";
import { FC, useState, useRef } from "react";
import Label from "../label";
import { useToast } from "@/components/ui/use-toast";

interface CaptureCardProps {
  asset: Asset;
  removeAssetHandler: (id: string) => void;
}

const CaptureCard: FC<CaptureCardProps> = ({ asset, removeAssetHandler }) => {
  const { theme } = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const [showLove, setShowLove] = useState(false);
  const [showUnlove, setShowUnlove] = useState(false);
  const clickTimeoutRef = useRef<number | null>(null);
  const { toast } = useToast();

  const handleOnClick = () => {
    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
      clickTimeoutRef.current = null;
    } else {
      clickTimeoutRef.current = window.setTimeout(() => {
        window.location.href = `/assets/s/${asset.slug}`;
        clickTimeoutRef.current = null;
      }, 1000);
    }
  };

  const downloadAsset = (
    assetUrl: string,
    fileName: string,
    fileExtension: string,
  ) => {
    fetch(assetUrl)
      .then((response) => response.blob())
      .then((blob) => {
        const blobUrl = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = blobUrl;
        link.download = `${fileName}.${fileExtension}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((error) => {
        console.error("Error downloading file:", error);
      });
  };

  const handleDoubleClick = async () => {
    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
      clickTimeoutRef.current = null;
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
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Render</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => {
                    if (asset.splatUrl) {
                      window.location.href = `/assets/s/${asset.slug}`;
                    } else {
                      toast({
                        title: "Error",
                        description: "3d gaussian splat is not yet available",
                        variant: "destructive",
                      });
                    }
                  }}
                >
                  See 3D Gaussian Splat
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => {
                    if (asset.pclUrl || asset.pclColmapUrl) {
                      window.location.href = `/assets/p/${asset.slug}`;
                    } else {
                      toast({
                        title: "Error",
                        description: "point cloud have not yeat available",
                        variant: "destructive",
                      });
                    }
                  }}
                >
                  See Point Cloud
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => {
                    if (asset.segmentedPclDirUrl) {
                      window.location.href = `/assets/ps/${asset.slug}`;
                    } else {
                      toast({
                        title: "Error",
                        description: "ptv3 segmentation is not yet available",
                        variant: "destructive",
                      });
                    }
                  }}
                >
                  See PTv3 Segmentation
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Download</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => {
                    if (asset.splatUrl) {
                      window.location.href = `${process.env.NEXT_PUBLIC_API_STORAGE}${asset.splatUrl}?isDownload=true`;
                    } else {
                      toast({
                        title: "Error",
                        description: "3d gaussian splat is not yet available",
                        variant: "destructive",
                      });
                    }
                  }}
                >
                  Download 3D Gaussian Splat
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => {
                    if (asset.pclColmapUrl || asset.pclUrl) {
                      console.log(
                        `${process.env.NEXT_PUBLIC_API_STORAGE}${asset.pclColmapUrl || asset.pclUrl}?isDownload=true`,
                      );
                      window.location.href = `${process.env.NEXT_PUBLIC_API_STORAGE}${asset.pclColmapUrl || asset.pclUrl}?isDownload=true`;
                    } else {
                      toast({
                        title: "Error",
                        description: "point cloud have not yeat available",
                        variant: "destructive",
                      });
                    }
                  }}
                >
                  Download Point Cloud
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => {
                    if (asset.segmentedPclDirUrl) {
                      console.log(
                        `${process.env.NEXT_PUBLIC_API_STORAGE}${asset.segmentedPclDirUrl}?isDownload=true`,
                      );
                      window.location.href = `${process.env.NEXT_PUBLIC_API_STORAGE}${asset.segmentedPclDirUrl}?isDownload=true`;
                    } else {
                      toast({
                        title: "Error",
                        description: "ptv3 segmentation is not yet available",
                        variant: "destructive",
                      });
                    }
                  }}
                >
                  Download PTv3 segmentation
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`relative aspect-square  cursor-pointer overflow-hidden rounded-b-lg bg-[#27272A] p-0`}
        onClick={handleOnClick}
        onDoubleClick={handleDoubleClick}
      >
        <div className="max-w-3/4 absolute right-2 top-2 z-[2]">
          <Label label={asset.status} />
        </div>
        <Image
          src={`${process.env.NEXT_PUBLIC_CONTAINER_STORAGE}${asset.thumbnailUrl}`}
          width={1000}
          height={1000}
          alt={asset.title}
          style={{
            transition: "all 0.8s ease-in-out 0s",
          }}
          className={`aspect-square h-full w-full rounded-b-lg object-cover transition-transform duration-200 ease-in-out ${isHovered && "scale-[1.1]"}`}
        />

        <>
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
        </>
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
};

CaptureCard.displayName = "Capture Card";
export default CaptureCard;

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { DotsVerticalIcon, HeartIcon } from "@radix-ui/react-icons";

export default function CaptureCard() {
  return (
    <Card className="p-0">
      <CardHeader className="flex flex-row items-center gap-2 p-2 text-xs">
        <div className="grid-row-2 !m-0 grid w-full">
          <p>Judul Gaussian Splat</p>
        </div>
        <div>
          <DotsVerticalIcon className="h-[18px] w-[18px] cursor-pointer" />
        </div>
      </CardHeader>
      <CardContent className="relative aspect-square cursor-pointer rounded-b-lg bg-[#27272A] p-2">
        <div className="absolute bottom-4 left-4 flex cursor-pointer flex-row items-center gap-2 text-xs">
          <HeartIcon className="h-[16px] w-[16px]" />
          <p>36 likes</p>
        </div>
      </CardContent>
    </Card>
  );
}

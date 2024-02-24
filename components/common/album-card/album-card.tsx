import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import Image from "next/image";

export default function AlbumCard() {
  return (
    <Card className="p-0">
      <CardHeader className="flex flex-row items-center gap-2 p-2 text-xs">
        <div className="grid-row-2 !m-0 grid w-full">
          <p>Nama Album Gaussian Splat</p>
        </div>
        <DotsVerticalIcon className="!m-0 h-[18px] w-[18px] cursor-pointer" />
      </CardHeader>
      <CardContent className="relative grid aspect-square cursor-pointer grid-cols-2 rounded-b-lg bg-[#27272A] p-0">
        {Array.from({ length: 4 }).map((_, id) => (
          <div key={id}>
            <Image src="/test.jpg" width={400} height={400} alt="cover" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

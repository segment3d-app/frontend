"use client";

import Image from "next/image";

export default function Error({}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex h-[calc(100vh-64px)] w-full items-center gap-8 px-8">
      <div className="flex w-full flex-col items-end gap-2">
        <h1 className="text-4xl font-black">503 Error</h1>
        <p className="text-right">
          Rur-roh, something just isn&apos;t righ... Time to paw throught your
          logs and get down ad dirty in your stack-trace ;)
        </p>
      </div>
      <Image
        src={"/img/error/503.png"}
        width={500}
        height={500}
        alt="503 vector"
      />
    </div>
  );
}

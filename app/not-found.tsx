"use client";

import Image from "next/image";
import Link from "next/link";

export default function NotFound({}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex w-full items-center justify-center">
      <div className="flex flex h-[calc(100vh-64px)] w-full max-w-[1000px] items-center gap-8 px-8">
        <div className="flex w-full flex-col items-end gap-2">
          <h1 className="text-4xl font-black">404 Error</h1>
          <p className="text-right">
            I am sorry, that page is in another castle! You may find what you
            were looking for on our{" "}
            <Link href={"/"} className="underline underline-offset-1">
              landing page
            </Link>
          </p>
        </div>
        <div className="w-full">
          <Image
            src={"/img/error/404.png"}
            width={500}
            height={500}
            alt="503 vector"
          />
        </div>
      </div>
    </div>
  );
}

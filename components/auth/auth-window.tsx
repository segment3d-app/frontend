"use client";

import useAuthStore from "@/store/useAuthStore";
import { BuiltInProviderType } from "next-auth/providers/index";
import { LiteralUnion, signIn, useSession } from "next-auth/react";
import { useEffect } from "react";

interface AuthWindowProps {
  provider?: LiteralUnion<BuiltInProviderType> | undefined;
}

export default function AuthWindow({ provider }: AuthWindowProps) {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated" && !session) {
      signIn(provider);
    }
    if (session) {
      window.close();
    }
  }, [provider, session, status]);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        position: "absolute",
        left: 0,
        top: 0,
        background: "white",
      }}
    ></div>
  );
}

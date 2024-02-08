import AuthWindow from "@/components/auth/auth-window";
import { BuiltInProviderType } from "next-auth/providers/index";
import { LiteralUnion } from "next-auth/react";

export default function AuthPage({ params }: { params: { provider: string } }) {
  return (
    <AuthWindow
      provider={
        params.provider as LiteralUnion<BuiltInProviderType> | undefined
      }
    />
  );
}

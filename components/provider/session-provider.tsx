"use client";

import { SessionProvider, SessionProviderProps } from "next-auth/react";
import React from "react";

const Provider = ({ children, session }: SessionProviderProps) => (
  <SessionProvider session={session}>{children}</SessionProvider>
);

export default Provider;

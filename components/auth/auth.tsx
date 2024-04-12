"use client";

import { FC } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import SignUp from "./sign-up";
import SignIn from "./sign-in";

const Auth: FC = () => {
  return (
    <div className="flex h-[calc(100vh-64px)] w-full items-center justify-center">
      <Tabs defaultValue="sign-in" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger id="sign-in-trigger" value="sign-in">
            Sign In
          </TabsTrigger>
          <TabsTrigger id="sign-up-trigger" value="sign-up">
            Sign Up
          </TabsTrigger>
        </TabsList>
        <TabsContent value="sign-in">
          <SignIn />
        </TabsContent>
        <TabsContent value="sign-up">
          <SignUp />
        </TabsContent>
      </Tabs>
    </div>
  );
};

Auth.displayName = "Auth";
export default Auth;

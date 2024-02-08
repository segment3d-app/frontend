import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { signOut, useSession } from "next-auth/react";
import { SigninDialog } from "@/components/signin/signin-dialog";
import useAuthStore from "@/store/useAuthStore";
import { useToast } from "@/components/ui/use-toast";

export default function UserAvatar() {
  const { toast } = useToast();
  const { isAuthenticated, user, clear } = useAuthStore();

  const getUserFallbackHandler = (
    fullname: string | null | undefined,
  ): string => {
    if (!fullname) return "";

    let splittedName = fullname.split(" ");
    splittedName = splittedName.slice(0, 2).map((name) => name[0]);
    return splittedName.join(" ");
  };

  return (
    <>
      {isAuthenticated ? (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="aspect-square rounded-full p-0"
            >
              <Avatar>
                <AvatarImage
                  className="rounded-full"
                  src={user?.image ?? ""}
                  alt="@shadcn"
                />
                <AvatarFallback>
                  {getUserFallbackHandler(user?.name)}
                </AvatarFallback>
              </Avatar>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="mr-5">
            <div className="text-14 grid grid-flow-col grid-rows-2 gap-4">
              <div className="justify-content row-span-2 flex aspect-square max-w-10 items-center">
                <Avatar>
                  <AvatarImage
                    className="rounded-full"
                    src={user?.image ?? ""}
                    crossOrigin="anonymous"
                    alt="@shadcn"
                  />
                  <AvatarFallback>
                    {getUserFallbackHandler(user?.name)}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="text-10 col-span-2">
                <p>{user?.name}</p>
              </div>
              <div className="col-span-2 row-span-1">
                <p>{user?.email}</p>
              </div>
            </div>
            <div className="mt-10 grid">
              <Button
                variant="default"
                size="sm"
                onClick={() => {
                  signOut();
                  clear();
                  toast({
                    title: "Byebye!",
                    description: "You already signout",
                    variant: "default",
                  });
                }}
              >
                Signout
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      ) : (
        <>
          <SigninDialog />
        </>
      )}
    </>
  );
}

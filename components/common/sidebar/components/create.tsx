import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import useAuthStore from "@/store/useAuthStore";

export default function Create() {
  const { getIsAuthenticated } = useAuthStore();
  const { toast } = useToast();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div>Create</div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="ml-[32px] w-[186px]">
        <DropdownMenuLabel>Choose Mode</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => {
              if (!getIsAuthenticated()) {
                document.getElementById("dialog-auth-btn")?.click();
                toast({
                  title: "Error",
                  description: "you need to login first",
                  variant: "destructive",
                });
                return;
              }
              document
                .getElementById("create-gaussian-splatting-trigger")
                ?.click();
            }}
          >
            3D Gaussian Asset
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

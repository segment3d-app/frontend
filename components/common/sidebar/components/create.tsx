import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Create() {
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
            onClick={() =>
              document
                .getElementById("create-gaussian-splatting-trigger")
                ?.click()
            }
          >
            3D Gaussian Asset
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

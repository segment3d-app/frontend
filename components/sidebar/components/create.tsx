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
          <DropdownMenuItem>Gaussian Splatting</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

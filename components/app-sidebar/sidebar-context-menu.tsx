import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { SidebarMenuItem } from "../ui/sidebar";
import { Sun, Moon, Monitor, Menu } from "lucide-react";
import { signOutAction } from "@/app/actions";
import { useTheme } from "next-themes";

export const SidebarContextMenu = () => {
  const { setTheme } = useTheme();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuItem className="flex items-center justify-center lg:justify-start gap-3 p-3 hover:bg-muted rounded-lg cursor-pointer text-base">
          <Menu size={24} />
          <span>More</span>
        </SidebarMenuItem>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64 rounded-xl p-2" align="start">
        <DropdownMenuItem className="rounded-lg cursor-pointer p-0">
          <Button
            onClick={() => setTheme("light")}
            variant="ghost"
            className="flex-1 justify-start gap-2"
          >
            <Sun size={16} /> Light
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem className="rounded-lg cursor-pointer p-0">
          <Button
            onClick={() => setTheme("dark")}
            variant="ghost"
            className="flex-1 justify-start gap-2"
          >
            <Moon size={16} /> Dark
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem className="rounded-lg cursor-pointer p-0">
          <Button
            onClick={() => setTheme("system")}
            variant="ghost"
            className="flex-1 justify-start gap-2"
          >
            <Monitor size={16} /> System
          </Button>
        </DropdownMenuItem>
        <DropdownMenuSeparator />

        <DropdownMenuItem className="rounded-lg cursor-pointer flex justify-start p-0 mt-2">
          <form action={signOutAction} className="flex-1 flex">
            <Button
              type="submit"
              variant="ghost"
              className="flex-1 justify-start"
            >
              LogOut
            </Button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

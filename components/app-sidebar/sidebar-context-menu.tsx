import { signOutAction } from "@/lib/auth-actions";
import { Check, Menu, Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { SidebarMenuItem } from "../ui/sidebar";

export const SidebarContextMenu = () => {
  const { theme, setTheme } = useTheme();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuItem className="flex items-center justify-center lg:justify-start gap-3 p-3 hover:bg-muted rounded-lg cursor-pointer text-base">
          <Menu size={24} />
          <span className="hidden lg:inline">More</span>
        </SidebarMenuItem>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64 rounded-xl p-2" align="start">
        <DropdownMenuItem
          className="rounded-lg cursor-pointer p-0"
          onSelect={() => setTheme("light")}
        >
          <Button
            onClick={() => setTheme("light")}
            variant="ghost"
            className="flex-1 justify-between gap-2"
          >
            <div className="flex justify-start items-center gap-2">
              <Sun size={16} /> Light
            </div>
            {theme === "light" && <Check size={16} />}
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="rounded-lg cursor-pointer p-0"
          onSelect={() => setTheme("dark")}
        >
          <Button
            onClick={() => setTheme("dark")}
            variant="ghost"
            className="flex-1 justify-between gap-2"
          >
            <div className="flex justify-start items-center gap-2">
              <Moon size={16} /> Dark
            </div>
            {theme === "dark" && <Check size={16} />}
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="rounded-lg cursor-pointer p-0"
          onSelect={() => setTheme("system")}
        >
          <Button
            onClick={() => setTheme("system")}
            variant="ghost"
            className="flex-1 justify-between gap-2"
          >
            <div className="flex justify-start items-center gap-2">
              <Monitor size={16} /> System
            </div>
            {theme === "system" && <Check size={16} />}
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

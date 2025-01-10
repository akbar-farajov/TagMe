import {
  Calendar,
  CirclePlus,
  Home,
  Inbox,
  Search,
  Settings,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
  },

  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
  {
    title: "Create Post",
    url: "/create-post",
    icon: CirclePlus,
  },
];

export function AppSidebar() {
  return (
    <Sidebar className="w-[80px] lg:w-[240px]">
      <SidebarContent className="bg-background px-1">
        <SidebarGroup className="">
          <SidebarGroupContent>
            <SidebarMenu>
              <Link
                href="/"
                className="hidden lg:block px-4 text-2xl font-semibold py-6"
              >
                Instagram
              </Link>
              {items.map((item) => (
                <Link href={item.url} key={item.title}>
                  <SidebarMenuItem
                    key={item.title}
                    className="flex items-center justify-center lg:justify-start gap-3 p-3 hover:bg-muted rounded-lg cursor-pointer text-base font-medium"
                  >
                    <item.icon size={24} />
                    <span className="hidden lg:inline">{item.title}</span>
                  </SidebarMenuItem>
                </Link>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

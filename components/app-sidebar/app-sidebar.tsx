"use client";
import {
  Calendar,
  CirclePlus,
  Home,
  Menu,
  Search,
  Settings,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import SignUpButton from "../sign-up-button";
import { SidebarContextMenu } from "./sidebar-context-menu";

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
  const pathname = usePathname();

  return (
    <Sidebar className="w-[80px] lg:w-[240px]">
      <SidebarContent className="bg-background px-1 py-6">
        <SidebarGroup className="flex flex-col justify-between h-full">
          <SidebarGroupContent>
            <SidebarMenu>
              <Link
                href="/"
                className="hidden lg:block px-4 text-2xl font-semibold pb-6"
              >
                Instagram
              </Link>
              {items.map((item) => {
                const aciveItem = pathname === item.url;
                return (
                  <Link href={item.url} key={item.title}>
                    <SidebarMenuItem
                      key={item.title}
                      className={cn(
                        "flex items-center justify-center lg:justify-start gap-3 p-3 hover:bg-muted rounded-lg cursor-pointer text-base ",
                        aciveItem && "font-bold"
                      )}
                    >
                      <item.icon size={24} />
                      <span className="hidden lg:inline">{item.title}</span>
                    </SidebarMenuItem>
                  </Link>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>{" "}
          <SidebarContextMenu />
        </SidebarGroup>

        {/* <SignUpButton /> */}
      </SidebarContent>
    </Sidebar>
  );
}

"use client";
import {
  Calendar,
  CirclePlus,
  CircleUser,
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
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { SidebarContextMenu } from "./sidebar-context-menu";
import Image from "next/image";
import { CreatePostModal } from "../create-post-modal";
import { Profile } from "@/utils/supabase/database";
import { SearchComponent } from "../search-component/search-component";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },

  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

export function AppSidebar({ profile }: { profile: Profile }) {
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
                TagMe
              </Link>
              {items.map((item, index) => {
                const aciveItem = pathname === item.url;
                return (
                  <Link href={item.url} key={index}>
                    <SidebarMenuItem
                      key={item.title}
                      className={cn(
                        "flex items-center justify-center lg:justify-start gap-3 p-3 hover:bg-muted rounded-lg cursor-pointer text-base ",
                        aciveItem && "font-bold"
                      )}
                    >
                      {item.icon && (
                        <item.icon
                          size={24}
                          className={cn(
                            "",
                            aciveItem
                              ? "fill-black dark:fill-white text-muted"
                              : ""
                          )}
                        />
                      )}
                      <span className="hidden lg:inline">{item.title}</span>
                    </SidebarMenuItem>
                  </Link>
                );
              })}
              <SearchComponent />
              <CreatePostModal />

              <Link href={`/${profile.username}`}>
                <SidebarMenuItem
                  className={cn(
                    "flex items-center justify-center lg:justify-start gap-3 p-3 hover:bg-muted rounded-lg cursor-pointer text-base "
                    // aciveItem && "font-bold"
                  )}
                >
                  {profile.avatar_url ? (
                    <Image
                      alt="profile"
                      className="rounded-full"
                      width={24}
                      height={24}
                      src={profile.avatar_url}
                    />
                  ) : (
                    <CircleUser size={24} />
                  )}

                  <span className="hidden lg:inline">{profile.username}</span>
                </SidebarMenuItem>
              </Link>
            </SidebarMenu>
          </SidebarGroupContent>{" "}
          <SidebarContextMenu />
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

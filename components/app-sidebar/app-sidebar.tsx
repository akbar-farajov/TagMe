"use client";
import { CircleUser, Home } from "lucide-react";

import Logo from "@/assets/logo.svg";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { Profile } from "@/utils/supabase/database";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CreatePostModal } from "../create-post-modal";
import { SearchComponent } from "../search-component/search-component";
import { SidebarContextMenu } from "./sidebar-context-menu";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
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
                className="hidden lg:flex items-center space-x-3 px-4 text-2xl font-semibold pb-6 "
              >
                <Image src={Logo} alt="img" width={24} height={24} />
                <span>TagMe</span>
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
                  <div className=" relative w-6 h-6 rounded-full">
                    {profile.avatar_url ? (
                      <Image
                        alt="profile"
                        className="rounded-full"
                        fill
                        objectFit="cover"
                        src={profile.avatar_url}
                      />
                    ) : (
                      <CircleUser />
                    )}
                  </div>

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

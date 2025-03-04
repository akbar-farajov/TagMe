import { Profile } from "@/utils/supabase/database";
import {
  CirclePlus,
  CircleUser,
  HomeIcon,
  Search,
  Settings,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { CreatePostModal } from "../create-post-modal";
import { DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { SearchComponent } from "../search-component/search-component";

export const MobileBar = ({ profile }: { profile: Profile }) => {
  const items = [
    {
      title: "Home",
      url: "/",
      icon: HomeIcon,
    },

    {
      title: "Settings",
      url: "#",
      icon: Settings,
    },
  ];
  return (
    <div className="w-full px-6 md:hidden fixed z-50 bottom-0 left-0 bg-background flex justify-between border-t">
      {items.map((item, index) => (
        <Link href={item.url} key={index}>
          <Button variant="ghost">
            <item.icon size={20} />
          </Button>
        </Link>
      ))}

      <SearchComponent />
      <CreatePostModal />

      <Link href={`/${profile.username}`}>
        <Button variant="ghost">
          {profile.avatar_url ? (
            <Image
              alt="profile"
              className="rounded-full"
              width={20}
              height={20}
              src={profile.avatar_url}
            />
          ) : (
            <CircleUser size={20} />
          )}
        </Button>
      </Link>
    </div>
  );
};

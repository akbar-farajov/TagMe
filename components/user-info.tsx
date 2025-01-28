import { Profile } from "@/utils/supabase/database";
import { CircleUser } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface SearchResult {}

type Props = {
  username: string;
  avatar_url: string;
  full_name: string;
  onclick?: () => void;
};

export default function UserInfo({
  username,
  full_name,
  avatar_url,
  onclick,
}: Props) {
  return (
    <div
      onClick={onclick}
      className="flex items-center gap-3 p-2 hover:bg-muted rounded-md cursor-pointer"
    >
      {avatar_url ? (
        <div className="size-8 relative aspect-square">
          <Image
            src={avatar_url}
            alt={username}
            className="rounded-full object-cover"
            fill
          />
        </div>
      ) : (
        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
          <CircleUser className="size-8 text-muted-foreground" />
        </div>
      )}
      <div className="flex flex-col">
        <span className="font-medium">{username}</span>
        <span className="text-sm text-muted-foreground">{full_name}</span>
      </div>
    </div>
  );
}

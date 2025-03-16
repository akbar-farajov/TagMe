import { cn } from "@/lib/utils";
import { CircleUser } from "lucide-react";
import Image from "next/image";

type Props = {
  username?: string;
  avatar_url?: string;
  full_name?: string;
  onclick?: () => void;
  variant?: "hover" | "default";
};

export default function UserInfo({
  username,
  full_name,
  avatar_url,
  onclick,
  variant = "default",
}: Props) {
  return (
    <div
      onClick={onclick}
      className={cn(
        "flex items-center gap-3 p-2  rounded-md cursor-pointer",
        variant === "hover" && "hover:bg-muted"
      )}
    >
      {avatar_url ? (
        <div className="size-8 relative aspect-square">
          <Image
            src={avatar_url}
            alt="image"
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

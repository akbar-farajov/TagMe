import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import UserInfo from "@/components/user-info";
import Link from "next/link";
import { ReactNode } from "react";

export function FollowersDialog({
  children,
  followers,
}: {
  children: ReactNode;
  followers: any[];
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Followers</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Input
              id="name"
              className="col-span-4 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>
        </div>
        <DialogFooter>
          <div className="flex flex-col gap-3 w-full">
            {followers.map((follower) => (
              <Link
                href={`/${follower.profiles.username}`}
                className="w-full"
                key={follower.id}
              >
                <UserInfo
                  variant="hover"
                  key={follower.id}
                  username={follower.profiles.username}
                  full_name={follower.profiles.full_name}
                  avatar_url={follower.profiles.avatar_url}
                />
              </Link>
            ))}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

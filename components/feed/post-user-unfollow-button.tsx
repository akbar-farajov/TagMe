"use client";
import { useTransition } from "react";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { unfollowUser } from "@/app/actions/follow";
import { useRouter } from "next/navigation";

export const PostUserUnfollowButton = ({
  followerId,
}: {
  followerId: string;
}) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const handleUnFollow = async () => {
    startTransition(async () => {
      await unfollowUser(followerId);
      router.refresh();
    });
  };
  return (
    <DropdownMenuItem onClick={handleUnFollow} className="cursor-pointer">
      <div className="text-red-600">Unfollow</div>
    </DropdownMenuItem>
  );
};

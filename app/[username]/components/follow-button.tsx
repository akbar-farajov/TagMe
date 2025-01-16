"use client";

import { startTransition, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { followUser, unfollowUser } from "@/app/actions/follow";

interface FollowButtonProps {
  profileId: string;
  currentUserId: string | undefined;
  initialIsFollowing: boolean;
}

export function FollowButton({
  profileId,
  currentUserId,
  initialIsFollowing,
}: FollowButtonProps) {
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleFollow = async () => {
    if (!currentUserId) {
      router.push("/sign-in");
      return;
    }

    startTransition(async () => {
      if (isFollowing) {
        const result = await unfollowUser(profileId);
        if (!result.error) {
          setIsFollowing(false);
        }
      } else {
        const result = await followUser(profileId);
        if (!result.error) {
          setIsFollowing(true);
        }
      }
    });
  };

  return (
    <Button
      variant={isFollowing ? "outline" : "default"}
      onClick={handleFollow}
      disabled={isPending || currentUserId === profileId}
    >
      {isFollowing ? "Following" : "Follow"}
    </Button>
  );
}

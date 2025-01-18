import React from "react";
import Image from "next/image";
import {
  Heart,
  MessageCircle,
  Bookmark,
  Share,
  Divide,
  UserCircle,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { createClient } from "@/utils/supabase/server";
import { Post } from "@/utils/supabase/database";
import { LikeButton } from "./like-button";
import Link from "next/link";
import { Separator } from "../ui/separator";
import { PostCard } from "./post";

export async function Feed() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: followingData } = await supabase
    .from("follows")
    .select("following_id")
    .eq("follower_id", user?.id);

  const followingIds =
    followingData?.map((follow) => follow.following_id) || [];

  const userIds = [...followingIds, user?.id];

  const { data: posts, error } = await supabase
    .from("posts")
    .select(
      `
    *,
    profiles!inner (
      id,
      username,
      avatar_url,
      full_name
    ),
    likes (
      user_id
    ),
    comments (*)
  `
    )
    .in("user_id", userIds)
    .order("created_at", { ascending: false })
    .returns<Post[]>();

  if (!posts) return <div>No posts found</div>;

  return (
    <div className="max-w-md mx-auto py-4 mb-4">
      {posts.map((post) => (
        <>
          <PostCard post={post} userId={user?.id} />
          <Separator />
        </>
      ))}
    </div>
  );
}

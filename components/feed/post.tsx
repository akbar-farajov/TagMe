import { Post } from "@/utils/supabase/database";
import {
  Bookmark,
  Ellipsis,
  MessageCircle,
  Share,
  UserCircle,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { LikeButton } from "./like-button";
import { formatDistanceToNow } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { createClient } from "@/utils/supabase/server";
import { PostDeleteItem } from "./post-delete-button";
import { unfollowUser } from "@/app/actions/follow";
import { PostUserUnfollowButton } from "./post-user-unfollow-button";

export const PostCard = async ({
  post,
  userId,
}: {
  post: Post;
  userId?: string;
}) => {
  const isCurrentUserPost = post.user_id === userId;
  const supabase = await createClient();

  async function deletePost(postId: string, userId: string) {
    "use server";

    const supabase = await createClient();
    const { error } = await supabase
      .from("posts")
      .delete()
      .eq("id", postId)
      .eq("user_id", userId);

    return { error };
  }
  return (
    <article key={post.id} className="rounded-lg my-2">
      <div className="flex items-center justify-between px-3 md:px-0">
        <div className="flex items-center py-3">
          {post.profiles.avatar_url ? (
            <div className="h-8 w-8 relative rounded-full overflow-hidden">
              <Image
                src={post.profiles.avatar_url}
                alt={post.profiles.username}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <UserCircle className="object-cover" />
          )}
          <div className="ml-3">
            <Link href={`/${post.profiles.username}`}>
              <p className="font-semibold text-sm cursor-pointer">
                {post.profiles.username}
              </p>
            </Link>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Ellipsis size={20} strokeWidth={1} />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {isCurrentUserPost ? (
              <PostDeleteItem postId={post.id} userId={userId} />
            ) : (
              <>
                <PostUserUnfollowButton followerId={post.user_id} />
                <DropdownMenuItem>Share</DropdownMenuItem>
              </>
            )}

            <DropdownMenuItem>Cancel</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Post Image */}
      <div className="border relative aspect-square bg-muted">
        <Image
          src={post.image_url}
          alt="Post content"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Post Actions */}
      <div className="p-3 md:px-0">
        <div className="flex items-start gap-4">
          <LikeButton
            postId={post.id}
            userId={userId}
            initialLikes={post.likes}
          />
          <MessageCircle className="w-6 h-6 cursor-pointer " />
          <Share className="w-6 h-6 cursor-pointer " />
          <div className="ml-auto">
            <Bookmark className="w-6 h-6 cursor-pointer" />
          </div>
        </div>

        {/* Likes */}
        {/* <div className="mt-2">
    <p className="font-semibold text-sm">
      {post.likes.length} {post.likes.length === 1 ? "like" : "likes"}
    </p>
  </div> */}

        {/* Caption */}
        <div className="mt-1">
          <p className="text-sm">
            <span className="font-semibold mr-2">{post.profiles.username}</span>
            {post.caption}
          </p>
        </div>

        {/* Comments */}
        {post.comments.length > 0 && (
          <p className="text-sm mt-1 cursor-pointer">
            View all {post.comments.length} comments
          </p>
        )}

        {/* Timestamp */}
        <p className=" text-xs mt-1 uppercase">
          {formatDistanceToNow(new Date(post.created_at))} ago
        </p>
      </div>
    </article>
  );
};

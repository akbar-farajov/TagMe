import React from "react";
import Image from "next/image";
import { Heart, MessageCircle, Bookmark, Share, Divide } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { createClient } from "@/utils/supabase/server";
import { Post } from "@/utils/supabase/database";

async function Feed() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: followingData } = await supabase
    .from("follows")
    .select("following_id")
    .eq("follower_id", user?.id);

  console.log(followingData);

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
    comments (count)
  `
    )
    .in("user_id", userIds)
    .order("created_at", { ascending: false })
    .returns<Post[]>();

  if (!posts) return <div>No posts found</div>;

  return (
    <div className="max-w-lg mx-auto py-4 px-4 md:px-0">
      {posts.map((post) => (
        <article key={post.id} className="border rounded-lg mb-6">
          <div className="flex items-center p-3">
            <div className="h-8 w-8 relative rounded-full overflow-hidden">
              <Image
                src={post.profiles.avatar_url || "/api/placeholder/32/32"}
                alt={post.profiles.username}
                fill
                className="object-cover"
              />
            </div>
            <div className="ml-3">
              <p className="font-semibold text-sm">{post.profiles.username}</p>
            </div>
          </div>

          {/* Post Image */}
          <div className="relative aspect-square">
            <Image
              src={post.image_url}
              alt="Post content"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Post Actions */}
          <div className="p-3">
            <div className="flex items-center gap-4">
              <Heart className="w-6 h-6 cursor-pointer " />
              <MessageCircle className="w-6 h-6 cursor-pointer " />
              <Share className="w-6 h-6 cursor-pointer " />
              <div className="ml-auto">
                <Bookmark className="w-6 h-6 cursor-pointer" />
              </div>
            </div>

            {/* Likes */}
            <div className="mt-2">
              <p className="font-semibold text-sm">
                {post.likes.length} {post.likes.length === 1 ? "like" : "likes"}
              </p>
            </div>

            {/* Caption */}
            <div className="mt-1">
              <p className="text-sm">
                <span className="font-semibold mr-2">
                  {post.profiles.username}
                </span>
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
      ))}
    </div>
  );
}

export default Feed;

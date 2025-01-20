import { Post } from "@/utils/supabase/database";
import Image from "next/image";
import React from "react";
import { MessageCircle, Heart } from "lucide-react";

export const Posts = ({ posts }: { posts: Post[] }) => {
  return (
    <div className="w-full grid grid-cols-3 gap-2 py-10">
      {posts.map((post) => (
        <div
          className="relative aspect-square w-full cursor-pointer group"
          key={post.id}
        >
          <Image src={post.image_url} alt="" className="object-cover" fill />

          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-8">
            <div className="flex items-center gap-2 text-white">
              <Heart className="size-6 fill-white" />
              <span className="text-lg font-semibold">
                {post.likes?.length || 0}
              </span>
            </div>

            <div className="flex items-center gap-2 text-white">
              <MessageCircle className="size-6 fill-white" />
              <span className="text-lg font-semibold">
                {post.comments?.length || 0}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Posts;

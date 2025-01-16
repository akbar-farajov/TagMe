import { Post } from "@/utils/supabase/database";
import Image from "next/image";
import React from "react";

export const Posts = ({ posts }: { posts: Post[] }) => {
  return (
    <div className="w-full grid grid-cols-3 gap-2  py-10 ">
      {posts.map((post) => (
        <div className="relative aspect-square w-full cursor-pointer">
          <Image src={post.image_url} alt="" className="object-cover" fill />
        </div>
      ))}
    </div>
  );
};

"use client";

import { createClient } from "@/utils/supabase/client";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface LikeButtonProps {
  postId: string;
  userId: string | undefined;
  initialLikes: { id: string; user_id: string }[];
}

export function LikeButton({ postId, userId, initialLikes }: LikeButtonProps) {
  const router = useRouter();
  const supabase = createClient();

  const [isLiked, setIsLiked] = useState(
    initialLikes.some((like) => like.user_id === userId)
  );

  const [likesCount, setLikesCount] = useState(initialLikes.length);

  async function handleLike() {
    if (!userId) {
      return router.push("/login");
    }

    try {
      if (isLiked) {
        const { error } = await supabase
          .from("likes")
          .delete()
          .match({ post_id: postId, user_id: userId });

        if (error) throw error;

        setIsLiked(false);
        setLikesCount((prev) => prev - 1);
      } else {
        const { error } = await supabase
          .from("likes")
          .insert({ post_id: postId, user_id: userId });

        if (error) throw error;

        setIsLiked(true);
        setLikesCount((prev) => prev + 1);
      }
      router.refresh();
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <div className="flex items-center gap-2">
      <button onClick={handleLike} className="focus:outline-none">
        <Heart
          className={`w-6 h-6 cursor-pointer ${
            isLiked
              ? "fill-red-500 text-red-500"
              : "fill-none hover:text-gray-500"
          }`}
        />
      </button>
      {/* <p className="font-semibold text-sm">
        {likesCount} {likesCount === 1 ? "like" : "likes"}
      </p> */}
    </div>
  );
}

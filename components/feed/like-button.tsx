"use client";

import { toggleLike } from "@/app/actions/likes";
import { createClient } from "@/utils/supabase/client";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/button";

interface LikeButtonProps {
  postId: string;
  userId: string | undefined;
  initialLikes: { id: string; user_id: string }[];
}

export function LikeButton({ postId, userId, initialLikes }: LikeButtonProps) {
  const [isLiked, setIsLiked] = useState(
    initialLikes.some((like) => like.user_id === userId)
  );

  const [likesCount, setLikesCount] = useState(initialLikes.length)
  const [processing, setProcessing] = useState(false);

  async function handleLike() {
    if (processing) return; 
    setProcessing(true);

    const newIsLiked = !isLiked;
    setIsLiked(newIsLiked);
    setLikesCount((prev) => prev + (newIsLiked ? 1 : -1));

    const result = await toggleLike(postId);

    setProcessing(false);
  }
  return (
    <div className="flex items-center gap-2">
      <Button
        asChild
        variant="ghost"
        size="icon"
        onClick={handleLike}
        className="focus:outline-none hover:bg-transparent"
        style={{
          transition: "color 0.3s ease, fill 0.3s ease",
        }}
      >
        <Heart
          className={`w-6 h-6 cursor-pointer  ${
            isLiked
              ? "fill-red-500  text-red-500 hover:text-red-500"
              : "fill-none hover:text-gray-500"
          }`}
        />
      </Button>
      <span className="font-semibold text-sm">{likesCount} {likesCount === 1 ?"like":"likes"}</span>
    </div>
  );
}

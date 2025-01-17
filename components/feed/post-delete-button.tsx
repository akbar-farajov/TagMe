"use client";
import { deletePost } from "@/app/actions/post-delete";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { useTransition } from "react";
import { useRouter } from "next/navigation";

export const PostDeleteItem = ({
  userId,
  postId,
}: {
  userId: string;
  postId: string;
}) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const handleDelete = async () => {
    startTransition(async () => {
      await deletePost(postId, userId);
      router.refresh();
    });
  };
  return (
    <DropdownMenuItem
      onClick={handleDelete}
      disabled={isPending}
      className="cursor-pointer "
    >
      <div className="text-red-600">{isPending ? "Deleting..." : "Delete"}</div>
    </DropdownMenuItem>
  );
};

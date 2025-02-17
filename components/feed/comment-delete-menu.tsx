"use client";
import { Ellipsis, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { commentDelete } from "@/app/actions/comment-delete";
import { Button } from "../ui/button";

type CommentsDeleteMenuProps = {
  commentId: string;
};
export const CommentDeleteMenu = ({ commentId }: CommentsDeleteMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button
          variant="ghost"
          className="size-8 p-0"
          aria-label="Comment-options"
        >
          <Ellipsis size={20} strokeWidth={1} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="p-0">
        <DropdownMenuItem
          className="text-red-600 focus:text-red-600"
          // onClick={() => setShowConfirmDialog(true)}
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

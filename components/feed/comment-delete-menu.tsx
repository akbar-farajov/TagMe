"use client";
import { Ellipsis, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { commentDelete } from "@/app/actions/comment-delete";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

type CommentsDeleteMenuProps = {
  commentId: string;
};

export const CommentDeleteMenu = ({ commentId }: CommentsDeleteMenuProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await commentDelete(commentId);
      setShowConfirmDialog(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsDeleting(false);
    }
  };
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Ellipsis size={20} strokeWidth={1} />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="p-0">
          <DropdownMenuItem
            className="text-red-600 focus:text-red-600"
            onClick={() => setShowConfirmDialog(true)}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            {isDeleting ? "Deleting..." : "Delete"}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Comment</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this comment? This action cannot
              be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose>
              <Button variant="ghost" className="mt-4 sm:mt-0">
                Cancel
              </Button>
            </DialogClose>

            <Button
              onClick={handleDelete}
              disabled={isDeleting}
              className="text-red-600"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

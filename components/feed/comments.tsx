import { createClient } from "@/utils/supabase/server";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CircleUser, Ellipsis } from "lucide-react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ContextMenu } from "../ui/context-menu";
import { Button } from "../ui/button";
import { revalidatePath } from "next/cache";
type CommentProps = {
  postId: string;
};

type Comment = {
  id: string;
  content: string;
  user_id: string;
  created_at: string;
  profiles: {
    username: string;
    full_name: string;
    avatar_url: string;
  };
};

const Comments = async ({ postId }: CommentProps) => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: comments, error } = await supabase
    .from("comments")
    .select(
      `
      *,
      profiles:user_id (
        username,
        full_name,
        avatar_url
      )
    `
    )
    .eq("post_id", postId);

  if (comments && comments?.length > 0)
    return (
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-sm mt-1 cursor-pointer text-left w-full py-2">
            <div>View all {comments?.length} comments</div>
          </AccordionTrigger>
          <AccordionContent>
            {comments?.map((comment: Comment) => {
              const { username, avatar_url } = comment.profiles;
              return (
                <div key={comment.id} className="flex justify-between w-full">
                  <div className="flex items-start space-x-4 py-2">
                    {avatar_url ? (
                      <div className="size-8 relative aspect-square">
                        <Image
                          src={avatar_url}
                          alt="image"
                          className="rounded-full object-cover"
                          fill
                        />
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                        <CircleUser className="size-8 text-muted-foreground" />
                      </div>
                    )}

                    <p>
                      <span className="font-bold mr-2">{username}</span>
                      <span>{comment.content}</span>
                    </p>
                  </div>
                  <div>
                    {comment.user_id === user?.id && (
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <Ellipsis size={20} strokeWidth={1} />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="p-0">
                          <form
                            action={async () => {
                              "use server";
                              const supabase = await createClient();
                              const { error } = await supabase
                                .from("comments")
                                .delete()
                                .eq("id", comment.id)
                                .throwOnError();

                              revalidatePath("/");
                            }}
                          >
                            <Button
                              type="submit"
                              variant="ghost"
                              className="w-full text-red-600 hover:text-red-600"
                            >
                              Delete
                            </Button>
                          </form>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </div>
                </div>
              );
            })}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    );
  return null;
};

export default Comments;

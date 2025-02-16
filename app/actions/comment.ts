"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export const commentAction = async (formData: FormData, postId: string) => {
  const comment = formData.get("comment");

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  try {
    const { data, error } = await supabase
      .from("comments")
      .insert([
        {
          content: comment,
          post_id: postId,
          user_id: user?.id,
        },
      ])
      .select();
    revalidatePath("/");
    return { success: true, data };
  } catch (error) {
    console.error("Error adding comment:", error);
    throw new Error("Failed to add comment");
  }
};

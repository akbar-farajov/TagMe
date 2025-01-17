"use server";

import { createClient } from "@/utils/supabase/server";

export async function deletePost(postId: string, userId: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("posts")
    .delete()
    .eq("id", postId)
    .eq("user_id", userId);

  return { error };
}

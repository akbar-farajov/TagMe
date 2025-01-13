"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function toggleLike(postId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  try {
    const { data: existingLike } = await supabase
      .from("likes")
      .select("id")
      .match({ user_id: user?.id, post_id: postId })
      .single();

    if (existingLike) {
      await supabase
        .from("likes")
        .delete()
        .match({ user_id: user?.id, post_id: postId })
        .throwOnError();
    } else {
      await supabase
        .from("likes")
        .insert({ user_id: user?.id, post_id: postId })
        .throwOnError();
    }
    revalidatePath("/");
  } catch (error) {
    console.error(error);
  }
}

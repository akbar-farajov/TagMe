"use server";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export const commentDelete = async (commentId: string) => {
  try {
    const supabase = await createClient();
    const { error } = await supabase
      .from("comments")
      .delete()
      .eq("id", commentId)
      .single()
      .throwOnError();

    revalidatePath("/");
  } catch (error) {
    console.error(error);
  }
};

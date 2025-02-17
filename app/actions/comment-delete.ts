import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export const commentDelete = async (commentId: string) => {
  try {
  } catch (error) {}
  const supabase = await createClient();
  const { error } = await supabase
    .from("comments")
    .delete()
    .eq("id", commentId)
    .throwOnError();

  revalidatePath("/");
};

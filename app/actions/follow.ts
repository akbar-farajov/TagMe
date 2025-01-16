"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function followUser(followingId: string) {
  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Not authenticated" };
  }

  if (user.id === followingId) {
    return { error: "Cannot follow yourself" };
  }

  const { error } = await supabase.from("follows").insert({
    follower_id: user.id,
    following_id: followingId,
  });

  if (error?.code === "23505") {
    return { error: "Already following" };
  }

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/[username]", "page");
  return { success: true };
}

export async function unfollowUser(followingId: string) {
  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Not authenticated" };
  }

  const { error } = await supabase.from("follows").delete().match({
    follower_id: user.id,
    following_id: followingId,
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/[username]", "page");
  return { success: true };
}

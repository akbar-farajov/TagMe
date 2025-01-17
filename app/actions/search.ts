"use server";

import { createClient } from "@/utils/supabase/server";

export async function searchUsers(query: string) {
  if (!query) {
    return [];
  }

  const supabase = await createClient();

  const { data: users, error } = await supabase
    .from("profiles")
    .select("*")
    .ilike("username", `%${query}%`)
    .limit(5);

  if (error) {
    throw new Error("Failed to search users");
  }

  return users.map((user) => ({
    type: "user" as const,
    data: user,
  }));
}

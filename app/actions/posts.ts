"use server";

import { v4 as uuidv4 } from "uuid";
import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";

export async function uploadPost(formData: FormData) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return { error: "Unauthorized" };
    }

    const file = formData.get("file") as File;
    const caption = formData.get("caption") as string;

    if (!file) {
      return { error: "No file provided" };
    }

    const fileBuffer = await file.arrayBuffer();

    const fileExt = file.name.split(".").pop();
    const fileName = `${uuidv4()}.${fileExt}`;
    const filePath = `${user.id}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("posts")
      .upload(filePath, fileBuffer, {
        contentType: file.type,
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) {
      throw uploadError;
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("posts").getPublicUrl(filePath);

    const { error: postError } = await supabase.from("posts").insert({
      user_id: user.id,
      caption,
      image_url: publicUrl,
    });

    if (postError) {
      await supabase.storage.from("posts").remove([filePath]);
      throw postError;
    }

    revalidatePath("/");

    return { success: true };
  } catch (error) {
    console.error("Error creating post:", error);
    return { error: "Failed to create post" };
  }
}

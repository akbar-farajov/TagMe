import { Feed } from "@/components/feed";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function Home() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <>
      <div className="flex-1 flex flex-col gap-6 md:px-4 min-h-screen">
        <div className="flex-1">
          <Suspense fallback={<div>Loading...</div>}>
            <Feed />
          </Suspense>
        </div>
      </div>
    </>
  );
}

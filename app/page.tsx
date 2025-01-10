import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

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
      <div className="flex-1 flex flex-col gap-6 px-4 min-h-screen">
        <div className="flex-1">hello</div>
      </div>
    </>
  );
}

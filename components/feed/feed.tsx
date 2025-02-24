import { Post, Profile } from "@/utils/supabase/database";
import { createClient } from "@/utils/supabase/server";
import { Card, CardHeader } from "../ui/card";
import { Separator } from "../ui/separator";
import { PostCard } from "./post";
import { SuggestUsers } from "./suggest-users";

export async function Feed() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: followingData } = await supabase
    .from("follows")
    .select("following_id")
    .eq("follower_id", user?.id);

  const followingIds =
    followingData?.map((follow) => follow.following_id) || [];

  const userIds = [...followingIds, user?.id];

  const { data: posts, error } = await supabase
    .from("posts")
    .select(
      `
    *,
    profiles!inner (
      id,
      username,
      avatar_url,
      full_name
    ),
    likes (
      user_id
    ),
    comments (*)
  `
    )
    .in("user_id", userIds)
    .order("created_at", { ascending: false })
    .returns<Post[]>();

  if (!posts) return <div>No posts found</div>;

  const { data: suggestedUsers } = await supabase
    .from("profiles")
    .select("id, username,full_name, avatar_url")
    .not("id", "in", `(${userIds.join(",")})`)
    .limit(5)
    .returns<Profile[]>();

  if (!posts || posts.length === 0) {
    return (
      <div className="max-w-md mx-auto py-4 space-y-6">
        <Card>
          <CardHeader className="text-center">
            <h2 className="text-2xl font-bold">Welcome to Your Feed!</h2>
            <p className="text-muted-foreground">
              Follow some users to see their posts here
            </p>
          </CardHeader>
        </Card>

        {suggestedUsers && suggestedUsers.length > 0 && (
          <SuggestUsers suggestedUsers={suggestedUsers} />
        )}
      </div>
    );
  }

  return (
    <div className="flex gap-8 p-4 justify-between">
      <div className="flex-1 max-w-lg mb-4 mx-auto">
        {posts.map((post) => (
          <div key={post.id}>
            <PostCard post={post} userId={user?.id} />
            <Separator />
          </div>
        ))}
      </div>
      {suggestedUsers && suggestedUsers?.length > 0 && (
        <div className="hidden md:block w-72 h-full sticky top-4 self-start">
          <SuggestUsers suggestedUsers={suggestedUsers} />
        </div>
      )}
    </div>
  );
}

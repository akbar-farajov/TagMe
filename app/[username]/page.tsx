import { createClient } from "@/utils/supabase/server";
import { FollowButton } from "./components/follow-button";

async function ProfilePage({ params }: { params: { username: string } }) {
  const { username } = await params;

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile, error } = await supabase
    .from("profiles")
    .select(
      `
    *,
    followers:follows!follows_following_id_fkey(count),
    following:follows!follows_follower_id_fkey(count)
  `
    )
    .eq("username", username)
    .single();

  if (error) {
    return <div>Error loading profile</div>;
  }

  const { data: isFollowing } = await supabase
    .from("follows")
    .select()
    .match({
      follower_id: user?.id,
      following_id: profile.id,
    })
    .single();

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="flex items-start gap-4 mb-8">
        <div className="flex-1">
          <h1 className="text-2xl font-bold mb-2">{profile.full_name}</h1>
          <p className="text-muted-foreground mb-4">@{profile.username}</p>
          {profile.bio && <p className="mb-4">{profile.bio}</p>}

          <div className="flex gap-4 mb-4">
            <span>
              <strong>{profile.followers.count}</strong> followers
            </span>
            <span>
              <strong>{profile.following.count}</strong> following
            </span>
          </div>

          {user && user.id !== profile.id && (
            <FollowButton
              profileId={profile.id}
              currentUserId={user?.id}
              initialIsFollowing={!!isFollowing}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;

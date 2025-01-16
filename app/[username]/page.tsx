import { createClient } from "@/utils/supabase/server";
import { FollowButton } from "./components/follow-button";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CircleUser, User } from "lucide-react";
import { Posts } from "./components/posts";
import { Separator } from "@/components/ui/separator";

async function ProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
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
    following:follows!follows_follower_id_fkey(count),
    posts:posts(count)
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

  const { data: posts } = await supabase
    .from("posts")
    .select("*")
    .eq("user_id", profile.id);

  return (
    <div className="flex-1 py-10 md:px-10 flex flex-col items-start w-full h-full">
      {/* top */}
      <div className="px-2 md:px-20 lg:px-32 pb-10 w-full flex items-center md:gap-24 gap-4">
        <div className="relative size-16 md:size-32">
          {profile.avatar_url ? (
            <Image
              src={profile.avatar_url || ""}
              alt="avatar"
              fill
              objectFit="cover"
              className="rounded-full"
            />
          ) : (
            <CircleUser className="size-full" strokeWidth={0.5} />
          )}
        </div>
        <div className="flex flex-col items-start justify-center gap-4 mb-8">
          <div className="flex gap-4 items-center">
            <h1 className="text-base font-bold mb-2">{profile.username}</h1>
            {user && user.id !== profile.id ? (
              <FollowButton
                profileId={profile.id}
                currentUserId={user?.id}
                initialIsFollowing={!!isFollowing}
              />
            ) : (
              <Button
                variant="secondary"
                className="font-bold text-xs rounded-lg h-8"
              >
                Edit Profile
              </Button>
            )}
          </div>
          <div className="gap-8 items-center hidden md:flex">
            <p className="font-bold gap-1 text-base">
              {profile.posts[0].count}{" "}
              <span className="font-normal">posts</span>
            </p>
            <Button variant="ghost" className="font-bold gap-1 text-base">
              {profile.followers[0].count}{" "}
              <span className="font-normal">followers</span>
            </Button>
            <Button variant="ghost" className="font-bold gap-1 text-base">
              {profile.following[0].count}{" "}
              <span className="font-normal">followings</span>
            </Button>
          </div>
          <div className="flex-1">
            <p className="mb-4">{profile.full_name}</p>
            {profile.bio && <p className="">{profile.bio}</p>}
          </div>
        </div>
      </div>

      <Separator />
      {/* buttom  */}
      <div className="w-full justify-around items-center flex md:hidden py-2">
        <div className="font-bold text-xs text-center">
          {profile.posts[0].count} <p className="font-normal">posts</p>
        </div>
        <div className="font-bold text-xs text-center">
          {profile.followers[0].count} <p className="font-normal">followers</p>
        </div>
        <div className="font-bold text-xs text-center">
          {profile.following[0].count} <p className="font-normal">followings</p>
        </div>
      </div>
      <Separator />

      {posts && <Posts posts={posts} />}
    </div>
  );
}

export default ProfilePage;

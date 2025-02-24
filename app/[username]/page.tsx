import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { signOutAction } from "@/lib/auth-actions";
import { createClient } from "@/utils/supabase/server";
import { CircleUser } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FollowButton } from "./components/follow-button";
import { FollowersDialog } from "./components/followers-dialog";
import { Posts } from "./components/posts";

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
    followers:follows!follows_following_id_fkey(
      follower_id,
      profiles:profiles!follower_id(
        id,
        username,
        avatar_url,
        full_name
      )
    ),
    following:follows!follows_follower_id_fkey(
      following_id,
      profiles:profiles!following_id(
        id,
        username,
        avatar_url,
        full_name
      )
    ),
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
    .select(
      `
      *,
      profiles (
        id,
        username,
        avatar_url,
        full_name
      ),
      likes (
        id,
        user_id,
        created_at
      ),
      comments (
        id,
        content,
        user_id,
        created_at,
        profiles (
          id,
          username,
          avatar_url
        )
      )
    `
    )
    .eq("user_id", profile.id);

  return (
    <div className="flex-1 py-10 md:px-10 flex flex-col items-start w-full h-full">
      <div className="px-2 md:px-20 lg:px-32 pb-10 w-full flex items-start md:gap-24 gap-4">
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
          <div className="flex gap-4 items-start">
            <h1 className="text-base font-bold mb-2">{profile.username}</h1>
            {user && user.id !== profile.id ? (
              <FollowButton
                profileId={profile.id}
                currentUserId={user?.id}
                initialIsFollowing={!!isFollowing}
              />
            ) : (
              <div className="flex flex-wrap gap-2">
                <Link href={`/edit`}>
                  <Button
                    variant="secondary"
                    className="font-bold text-xs rounded-lg h-8"
                  >
                    Edit
                  </Button>
                </Link>
                <form action={signOutAction}>
                  <Button
                    type="submit"
                    className="font-bold text-xs rounded-lg h-8"
                  >
                    Sign Out
                  </Button>
                </form>
              </div>
            )}
          </div>
          <div className="gap-8 items-center hidden md:flex">
            <p className="font-bold gap-1 text-base">
              {profile.posts[0].count}{" "}
              <span className="font-normal">posts</span>
            </p>
            <FollowersDialog followers={profile.followers}>
              <Button variant="ghost" className="font-bold gap-1 text-base">
                {profile.followers.length}
                <span className="font-normal">followers</span>
              </Button>
            </FollowersDialog>

            <FollowersDialog followers={profile.following}>
              <Button variant="ghost" className="font-bold gap-1 text-base">
                {profile.following.length}
                <span className="font-normal">followings</span>
              </Button>
            </FollowersDialog>
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
          {profile.followers.length} <p className="font-normal">followers</p>
        </div>
        <div className="font-bold text-xs text-center">
          {profile.following.length} <p className="font-normal">followings</p>
        </div>
      </div>
      <Separator />

      {posts && <Posts posts={posts} />}
    </div>
  );
}

export default ProfilePage;

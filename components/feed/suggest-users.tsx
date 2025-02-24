"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Profile } from "@/utils/supabase/database";
import Image from "next/image";
import { LoaderCircle, UserCircle, UserPlus } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { followUser } from "@/app/actions/follow";

type SuggestUsersProps = {
  suggestedUsers: Profile[];
};
export const SuggestUsers = ({ suggestedUsers }: SuggestUsersProps) => {
  const [loading, setLoading] = useState("");
  const handleFollow = async (followingId: string) => {
    try {
      setLoading(followingId);
      await followUser(followingId);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading("");
    }
  };

  console.log(loading);
  return (
    <Card className="h-max">
      <CardHeader>
        <h3 className="text-lg font-semibold">Suggested Users</h3>
      </CardHeader>
      <CardContent className="space-y-4">
        {suggestedUsers.map((suggestedUser) => (
          <div
            key={suggestedUser.id}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-3 ">
              <div className="w-10 h-10 relative">
                {suggestedUser.avatar_url ? (
                  <Image
                    src={suggestedUser.avatar_url}
                    alt={suggestedUser.username}
                    fill
                    objectFit="cover"
                    className="rounded-full"
                  />
                ) : (
                  <UserCircle className="w-10 h-10" />
                )}
              </div>
              <div>
                <Link
                  href={`/profile/${suggestedUser.username}`}
                  className="font-medium hover:underline"
                >
                  {suggestedUser.username}
                </Link>
                <p className="text-sm text-muted-foreground">
                  {suggestedUser.full_name}
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
              onClick={() => handleFollow(suggestedUser.id)}
            >
              {loading === suggestedUser.id ? (
                <LoaderCircle className="w-4 h-4" />
              ) : (
                <UserPlus className="w-4 h-4" />
              )}
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

"use client";

import { useOptimistic } from "react";
import { Button } from "./ui/button";
import { followProfile } from "@/lib/actions";

export default function FollowProfile({
  currentUserId,
  profileUserId,
  isFollowing,
  username,
}: {
  currentUserId: string;
  profileUserId: string;
  isFollowing: boolean;
  username: string;
}) {
  const [optimisticFollow, addOptimisticFollow] = useOptimistic<
    boolean,
    boolean
  >(
    isFollowing, // Initial state as a boolean
    (state, isFollowing) => isFollowing
  );

  return (
    <form
      action={async (formData: FormData) => {
        addOptimisticFollow(!optimisticFollow);
        try {
          await followProfile(formData);
        } catch (error) {
          console.error("Error updating follow status:", error);
          addOptimisticFollow(optimisticFollow);
        }
      }}
    >
      <input type="hidden" name="followingId" value={profileUserId} />
      <input type="hidden" name="followerId" value={currentUserId} />

      <input type="hidden" name="username" value={username} />
      <Button>{optimisticFollow ? "Unfollow" : "Follow"}</Button>
    </form>
  );
}

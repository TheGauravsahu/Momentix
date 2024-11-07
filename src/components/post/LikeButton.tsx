"use client";
import { likePost } from "@/lib/actions";
import { PostWithExtras } from "@/lib/definition";
import { Like } from "@prisma/client";
import { Heart } from "lucide-react";
import { Profile } from "next-auth";
import { useOptimistic } from "react";

export default function LikeButton({
  post,
  profile,
  likes,
}: {
  post: PostWithExtras;
  profile: Profile;
  likes: Like[];
}) {
  const predicate = (like: Like) =>
    like.profileId === profile.id && like.postId === post.id;

  const [optimisticLikes, addOptimisticLike] = useOptimistic<Like[], Like>(
    likes || [],
    (state:Like[], newLike:Like) =>
      state.some(predicate)
        ? state.filter((like) => like.profileId !== profile.id)
        : [...state, newLike]
  );

  return (
    <form
      action={async (formData: FormData) => {
        addOptimisticLike({
          postId: post.id,
          profileId: profile.id as string,
          id: "",
        });

        await likePost(formData);
      }}
      className="flex items-center gap-1"
    >
      <input type="hidden" name="postId" value={post.id} />
      <input type="hidden" name="profileId" value={profile.id as string} />

      <span>{optimisticLikes.length}</span>

      <button type="submit">
        <Heart
          fill={optimisticLikes.some(predicate) ? "red" : "none"}
          stroke={optimisticLikes.some(predicate) ? "0" : "white"}
        />
      </button>
    </form>
  );
}

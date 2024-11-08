"use client";

import { bookmarkPost } from "@/lib/actions";
import { PostWithExtras } from "@/lib/definition";
import { Bookmark, Profile } from "@prisma/client";
import { BookmarkIcon } from "lucide-react";
import { useOptimistic } from "react";

export default function BookmarkButton({
  bookmarks,
  post,
  profile,
}: {
  bookmarks: Bookmark[];
  post: PostWithExtras;
  profile: Profile;
}) {
  const predicate = (bookmark: Bookmark) =>
    bookmark.postId === post.id && bookmark.profileId === profile.id;

  const [optimisticBookmark, addOptimisticBookmark] = useOptimistic<
    Bookmark[],
    Bookmark
  >(bookmarks, (state: Bookmark[], newBookmark: Bookmark) =>
    state.some(predicate)
      ? state.filter((bookmark) => bookmark.profileId !== profile.id)
      : [...state, newBookmark]
  );

  return (
    <form
      action={async (formData: FormData) => {
        addOptimisticBookmark({
          id: "",
          postId: post.id,
          profileId: profile.id,
        });

        await bookmarkPost(formData);
      }}
    >
      <button type="submit">
        <BookmarkIcon
          stroke={optimisticBookmark.some(predicate) ? "0" : "currentColor"}
          fill={optimisticBookmark.some(predicate) ? "currentColor" : "none"}
        />
      </button>

      <input type="hidden" name="postId" value={post.id} />
      <input type="hidden" name="profileId" value={profile.id as string} />
      <input type="hidden" name="username" value={profile.username as string} />
    </form>
  );
}

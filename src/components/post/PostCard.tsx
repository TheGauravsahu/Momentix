import { PostWithExtras, ProfileWithExtras } from "@/lib/definition";
import React from "react";
import MiniProfile from "./MiniProfile";
import Image from "next/image";
import Link from "next/link";
import LikeButton from "./LikeButton";
import { MessageCircle } from "lucide-react";
import BookmarkButton from "./BookmarkButton";
import { Bookmark, Like, Profile } from "@prisma/client";

export default async function PostCard({
  post,
  profile,
}: {
  post: PostWithExtras;
  profile: ProfileWithExtras;
}) {
  return (
    <div>
      <div className="flex justify-between items-center gap-2">
        <MiniProfile
          username={post.profile.username}
          avatar={post.profile.avatar as string}
        />

        <span className="text-xs text-gray-300">
          {post.createdAt.toLocaleDateString()}
        </span>
      </div>

      <Link
        href={"/p/" + post.id}
        className="aspect-square overflow-hidden size-96"
      >
        <Image
          src={post.imageUrl}
          width={300}
          height={300}
          alt={post.caption}
          className="w-full h-full object-cover bg-gray-300"
        />
      </Link>

      {/* Post Interection */}
      <div className="p-2 w-full">
        <div className="flex justify-between mb-4 md:mb-2 items-center">
          <div className="flex gap-1 items-center">
            <LikeButton
              likes={post?.likes as Like[]}
              post={post as PostWithExtras}
              profile={profile as Profile}
            />
            <span className="flex gap-1 items-center">
              {post.comments.length}
              <MessageCircle />
            </span>
          </div>
          <BookmarkButton
            bookmarks={profile?.bookmarks as Bookmark[]}
            post={post as PostWithExtras}
            profile={profile as Profile}
          />
        </div>
      </div>
    </div>
  );
}

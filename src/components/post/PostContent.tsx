import { PostWithExtras } from "@/lib/definition";
import { Bookmark, Like, Profile } from "@prisma/client";
import Image from "next/image";
import React from "react";
import MiniProfile from "./MiniProfile";
import AddComment from "./AddComment";
import { MessageCircle } from "lucide-react";
import LikeButton from "./LikeButton";
import { getCurrentUserProfile } from "@/lib/data";
import BookmarkButton from "./BookmarkButton";

export default async function PostContent({ post }: { post: PostWithExtras }) {
  const profile = await getCurrentUserProfile();

  return (
    <div className="border max-w-5xl mx-auto h-full md:h-[95%] flex flex-col md:flex-row z-[999] bg-white dark:bg-gray-800">
      {/* Left */}
      <div className="h-[50%] md:h-full w-full md:w-[60%] bg-gray-100 aspect-square overflow-hidden">
        <Image
          src={post?.imageUrl || ""}
          alt={post?.caption || ""}
          width={1000}
          height={1000}
          className="w-full h-full object-cover"
        />
      </div>

      {/* right */}
      <div className="lg:w-[40%] h-[50%] md:h-full">
        {/* profile info */}
        <div className=" border-b mb-4 border-black dark:border-white w-full">
          <MiniProfile
            username={post?.profile.username as string}
            avatar={post?.profile.avatar as string}
          />
        </div>

        {/* caption */}
        <div className="">
          <MiniProfile
            key={post?.id}
            text={post?.caption}
            username={post?.profile.username as string}
            avatar={post?.profile.avatar as string}
          />
        </div>

        {/* Comments */}
        <div className="md:h-[65%] h-[50%] w-full overflow-y-scroll">
          {post?.comments.map((comment) => (
            <MiniProfile
              key={comment.id}
              text={comment.text}
              username={post?.profile.username as string}
              avatar={post?.profile.avatar as string}
            />
          ))}
        </div>

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

          {/* Add Comment */}
          <AddComment
            profile={post?.profile as Profile}
            postId={post?.id as string}
          />
        </div>
      </div>
    </div>
  );
}

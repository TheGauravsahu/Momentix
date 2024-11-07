import { PostWithExtras } from "@/lib/definition";
import { Like, Profile } from "@prisma/client";
import Image from "next/image";
import React from "react";
import MiniProfile from "./MiniProfile";
import AddComment from "./AddComment";
import { Bookmark, MessageCircle } from "lucide-react";
import LikeButton from "./LikeButton";
import { getCurrentUserProfile } from "@/lib/data";

export default async function PostContent({
  post,
}: {
  post: PostWithExtras;
}) {
  const profile = await getCurrentUserProfile();

  return (
    <div className="border max-w-5xl mx-auto h-[95%] flex flex-col md:flex-row z-[999] bg-white dark:bg-gray-800">
      {/* Left */}
      <div className="h-full w-[60%] bg-gray-100 aspect-square overflow-hidden">
        <Image
          src={post?.imageUrl || ""}
          alt={post?.caption || ""}
          width={1000}
          height={1000}
          className="w-full h-full"
        />
      </div>

      {/* right */}
      <div className="w-[40%]">
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
        <div className="h-[65%] w-full overflow-y-scroll">
          {post?.comments.map((comment) => (
            <MiniProfile
              key={comment.id}
              text={comment.text}
              username={post?.profile.username as string}
              avatar={post?.profile.avatar as string}
            />
          ))}
        </div>

        {/* Add Comment */}
        <div className="p-2">
          <div className="flex justify-between mb-2 items-center">
            <div className="flex gap-1 items-center">
              <LikeButton
                likes={post?.likes as Like[]}
                post={post as PostWithExtras}
                profile={profile as Profile}
              />
              <MessageCircle />
            </div>
            <Bookmark />
          </div>
          <AddComment
            profile={post?.profile as Profile}
            postId={post?.id as string}
          />
        </div>
      </div>
    </div>
  );
}

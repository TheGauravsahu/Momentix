import { Post } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function PostsImgList({ posts }: { posts: Post[] | undefined }) {
  return (
    <div className="flex items-center gap-2 flex-wrap mt-2">
      {posts?.map((post) => (
        <Link
          href={"/p/" + post.id}
          key={post.id}
          className="aspect-square overflow-hidden bg-gray-100 cursor-pointer hover:scale-95 hover:opacity-80 transition-all ease-in-out"
        >
          <Image
            className="size-60 object-cover"
            src={post.imageUrl}
            alt={post.caption}
            width={300}
            height={300}
          />
        </Link>
      ))}
    </div>
  );
}

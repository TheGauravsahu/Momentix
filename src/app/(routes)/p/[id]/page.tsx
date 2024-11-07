import PostContent from "@/components/post/PostContent";
import { fetchPost } from "@/lib/data";
import React from "react";
import { notFound } from "next/navigation";
import { PostWithExtras } from "@/lib/definition";

export default async function PostDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const post = await fetchPost(id);

  if (!post) {
    notFound();
  }

  return (
    <div className="h-screen w-full p-4">
      <PostContent post={post as PostWithExtras} />
    </div>
  );
}

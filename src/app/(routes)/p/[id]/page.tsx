import PostContent from "@/components/post/PostContent";
import { fetchPost } from "@/lib/data";
import React from "react";

export default async function PostDetail({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;

  const post = await fetchPost(id);

  return (
    <div className="h-screen w-full p-4">
      <PostContent post={post} />
    </div>
  );
}

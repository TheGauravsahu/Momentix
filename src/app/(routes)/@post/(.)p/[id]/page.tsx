import CloseButton from "@/components/post/CloseButton";
import PostContent from "@/components/post/PostContent";
import { fetchPost } from "@/lib/data";
import { PostWithExtras } from "@/lib/definition";
import { notFound } from "next/navigation";

export default async function PostModel({
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
    <div className="w-full h-full relative">
      <div className="w-full bg-black/50 dark:bg-gray-950/30 h-full z-[299]  fixed top-0 left-0 right-0 overflow-hidden" />

      <div className="absolute top-3 right-3 z-[99999] cursor-pointer">
        <CloseButton />
      </div>

      <div className="w-full h-screen p-8 z-[999] fixed top-0 left-0">
        <PostContent post={post as PostWithExtras} />
      </div>
    </div>
  );
}

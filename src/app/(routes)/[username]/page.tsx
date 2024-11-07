import NavigateBack from "@/components/NavigateBack";
import PostsImgList from "@/components/PostsImgList";
import { Button } from "@/components/ui/button";
import { fetchBookmarkedPosts, fetchProfile } from "@/lib/data";
import { ProfileWithExtras } from "@/lib/definition";
import { getUserEmail } from "@/lib/utils";
import { Cog } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Post } from "@prisma/client";


export default async function ProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;

  const profile: ProfileWithExtras | null = await fetchProfile(username);
  const currentUserEmail = await getUserEmail();

  // console.log(profile, "Profile fetched by /" + profile?.id);

  if (!profile) {
    notFound();
  }

  const bookmarkedPosts = await fetchBookmarkedPosts(profile.id);
  return (
    <div className="w-full h-full">
      {/* Header */}
      <div className="flex items-center justify-around w-full border-b p-4">
        <NavigateBack />
        <h2>{username}</h2>
        <Link href="/settings">
          <Cog />
        </Link>
      </div>

      {/* Profile */}
      <div className="p-4 flex justify-center gap-16 w-full">
        <div className="aspect-square lg:size-44 size-36 rounded-full overflow-hidden bg-gray-100">
          <Image
            src={profile?.avatar || ""}
            alt={profile?.username || ""}
            width={300}
            height={300}
            className="w-full h-full"
          />
        </div>

        <div className="flex flex-col  justify-center gap-0">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-semibold">{profile?.username}</h1>
            {!(currentUserEmail === profile?.email) && <Button>Follow</Button>}
          </div>

          <div className="flex items-center gap-4 my-4 font-semibold">
            <span>12 posts</span>
            <span>121k followers</span>
            <span>232 following</span>
          </div>

          <h3>{profile?.name}</h3>
          <p className="text-gray-600">{profile?.subtitle}</p>
          <p>{profile?.bio}</p>
        </div>
      </div>

      {/* Posts */}
      <Tabs defaultValue="posts" className="max-w-4xl mx-auto p-8">
        <TabsList className="flex justify-center space-x-4 bg-transparent">
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="bookmarked">Bookmarked</TabsTrigger>
        </TabsList>
        <TabsContent value="posts">
          <PostsImgList posts={profile?.posts} />
        </TabsContent>
        <TabsContent value="bookmarked">
          <PostsImgList posts={bookmarkedPosts as Post[]} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

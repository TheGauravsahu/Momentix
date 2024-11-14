import NavigateBack from "@/components/NavigateBack";
import PostsImgList from "@/components/PostsImgList";
import { fetchProfile, getCurrentUserProfile } from "@/lib/data";
import { ProfileWithExtras } from "@/lib/definition";
import { Cog } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Post } from "@prisma/client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import MiniProfile from "@/components/post/MiniProfile";
import FollowProfile from "@/components/FollowProfile";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile – Momentix",
  description:
    "Explore user profiles on Momentix. Dive into their posts, followers, and shared moments. Discover stories, connect with creators, and celebrate moments with the vibrant Momentix community.",
};

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;

  const profile: ProfileWithExtras | null = await fetchProfile(username);
  if (!profile) {
    notFound();
    return null;
  }

  const currentUser = await getCurrentUserProfile();

  // console.log(profile, "Profile fetched by /" + profile?.username);
  // console.log(currentUser, "Curent User Profile fetched by /" + currentUser?.username);

  const bookmarkedPosts = profile.bookmarks.map((bookmark) => bookmark.post);

  return (
    <div className="w-full h-full">
      {/* Header */}
      <div className="flex items-center justify-around w-full border-b p-4">
        <NavigateBack />
        <h2>{username}</h2>
        <Link prefetch={true} href="/settings">
          <Cog />
        </Link>
      </div>

      {/* Profile */}
      <div className="p-4 flex justify-center gap-16 w-full">
        <div className="aspect-square lg:size-44 size-36 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-900">
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
            {!(currentUser?.email === profile?.email) && (
              <FollowProfile
                currentUserId={currentUser?.id as string}
                profileUserId={profile.id as string}
                isFollowing={
                  currentUser?.following?.some(
                    (following) => following.followingId === profile.id
                  ) || false
                }
                username={username}
              />
            )}
          </div>

          <div className="flex items-center gap-4 my-4 font-semibold cursor-pointer">
            <span>{profile.posts.length} posts</span>
            <Dialog>
              <DialogTrigger>
                {profile.followers.length} followers
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Followers</DialogTitle>
                  <DialogDescription>
                    {profile.followers.map((f) => (
                      <MiniProfile
                        key={f.id}
                        username={f.follower.username}
                        avatar={f.follower.avatar || ""}
                      />
                    ))}
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>

            {/* Following */}
            <Dialog>
              <DialogTrigger>
                {profile.following.length} following
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Followings</DialogTitle>
                  <DialogDescription>
                    {profile.following.map((f) => (
                      <MiniProfile
                        key={f.id}
                        username={f.following.username}
                        avatar={f.following.avatar || ""}
                      />
                    ))}
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
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

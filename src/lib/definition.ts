import { Bookmark, Comment, Like, Post, Profile } from "@prisma/client";

export interface ProfileWithExtras extends Profile {
  posts: Post[];
  bookmarks: Bookmark[];
}

export interface PostWithExtras extends Post {
  profile: Profile;
  comments: Comment[];
  likes: Like[];
}

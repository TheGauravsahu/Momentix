import { Bookmark, Comment, Like, Post, Profile } from "@prisma/client";

export interface ProfileWithExtras extends Profile {
  posts: Post[];
  bookmarks: Bookmark[];
}

export interface PostWithExtras extends Post {
  profile: Profile;
  comments: CommentWithExtras[];
  likes: Like[];
}

export interface CommentWithExtras extends Comment {
  profile: Profile;
}

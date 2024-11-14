import { Bookmark, Comment, Follow, Like, Post, Profile } from "@prisma/client";

export interface ProfileWithExtras extends Profile {
  posts: Post[];
  bookmarks: BookmarkWithExtras[];
  followers: (Follow & { follower: Profile })[];
  following: (Follow & { following: Profile })[];
}

export interface PostWithExtras extends Post {
  profile: Profile;
  comments: CommentWithExtras[];
  likes: Like[];
}

export interface CommentWithExtras extends Comment {
  profile: Profile;
}

export interface BookmarkWithExtras extends Bookmark {
  post: Post;
}

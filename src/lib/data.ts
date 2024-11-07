import { prisma } from "./prisma";
import { getUserEmail } from "./utils";

export async function getCurrentUserProfile() {
  const email = await getUserEmail();

  try {
    const profile = await prisma.profile.findFirst({
      where: {
        email,
      },
      include: {
        bookmarks: true,
      },
    });
    return profile;
  } catch (error) {
    console.log("Failed to fetch profile", error);
    return null;
  }
}

export async function fetchProfile(username: string) {
  try {
    const profile = await prisma.profile.findFirst({
      where: {
        username,
      },
      include: {
        posts: true,
        bookmarks: true,
      },
    });
    return profile;
  } catch (error) {
    console.log("Failed to fetch profile", error);
    return null;
  }
}

export async function fetchPost(id: string) {
  try {
    const post = await prisma.post.findFirst({
      where: {
        id,
      },
      include: {
        profile: true,
        comments: {
          include: {
            profile: true,
          },
        },
        likes: true,
      },
    });
    return post;
  } catch (error) {
    console.log("Failed to fetch post.", error);
    return null;
  }
}


export async function fetchBookmarkedPosts(profileId: string) {
  try {
    const bookmarkedPosts = await prisma.bookmark.findMany({
      where: {
        profileId,
      },
      include: {
        post: true,
      },
    });

    return bookmarkedPosts.map((bookmark) => bookmark.post);
  } catch (error) {
    console.log("Failed to fetch bookmarked post.", error);
    return null;
  }
}

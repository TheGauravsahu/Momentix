"use server";
import { revalidatePath } from "next/cache";
import { prisma } from "./prisma";
import { getUserEmail } from "./utils";
import { getCurrentUserProfile } from "./data";
import { redirect } from "next/navigation";
import { signOut } from "@/auth";

export async function upsertProfile(
  previousState: unknown,
  formData: FormData
) {
  try {
    const userEmail = await getUserEmail();
    const profileData = {
      name: formData.get("name") as string,
      subtitle: formData.get("subtitle") as string,
      username: formData.get("username") as string,
      avatar: formData.get("avatar") as string,
      bio: formData.get("bio") as string,
    };

    await prisma.profile.upsert({
      where: { email: userEmail },
      create: {
        email: userEmail,
        ...profileData,
      },
      update: profileData,
    });

    revalidatePath("/settings");

    return "Profile updated successfully.";
  } catch (error) {
    console.error("Error updating profile:", error);
    return "Server Error: Unable to update profile.";
  }
}

export async function LogoutProfile() {
  try {
    await signOut();
    revalidatePath("/");
    return "Logged out.";
  } catch (error) {
    console.log("Error creating post.", error);
    return "Error: Failed to logged out..";
  }
}

export async function createPost(previousState: unknown, formData: FormData) {
  const profile = await getCurrentUserProfile();
  let post;

  try {
    post = await prisma.post.create({
      data: {
        caption: formData.get("caption") as string,
        imageUrl: formData.get("postImg") as string,
        profileId: profile?.id,
      },
    });
  } catch (error) {
    console.log("Error creating post.", error);
    return "Error: Unable to create post.";
  }
  redirect(`/p/${post.id}`);
}

export async function createComment(
  previousState: unknown,
  formData: FormData
) {
  try {
    const postId = formData.get("postId") as string;

    await prisma.comment.create({
      data: {
        text: formData.get("comment") as string,
        postId,
        profileId: formData.get("profileId") as string,
      },
    });

    revalidatePath("/p/" + postId);
  } catch (error) {
    console.error("Error creating comment:", error);
    return "Server Error: Unable to create comment.";
  }
}

export async function likePost(formData: FormData) {
  try {
    const postId = formData.get("postId") as string;
    const profileId = formData.get("profileId") as string;

    const like = await prisma.like.findUnique({
      where: {
        profileId_postId: {
          postId,
          profileId,
        },
      },
    });

    if (like) {
      await prisma.like.delete({
        where: {
          profileId_postId: {
            postId,
            profileId,
          },
        },
      });
      revalidatePath(`/p/${postId}`);
    } else {
      await prisma.like.create({
        data: {
          postId,
          profileId,
        },
      });

      revalidatePath(`/p/${postId}`);
    }
  } catch (error) {
    console.error("Error liking post:", error);
    return null;
  }
}

export async function bookmarkPost(formData: FormData) {
  const postId = formData.get("postId") as string;
  const profileId = formData.get("profileId") as string;
  const username = formData.get("username") as string;

  try {
    const existingBookmark = await prisma.bookmark.findUnique({
      where: {
        profileId_postId: {
          postId,
          profileId,
        },
      },
    });

    if (existingBookmark) {
      await prisma.bookmark.delete({
        where: {
          profileId_postId: {
            postId,
            profileId,
          },
        },
      });
      revalidatePath(`/p/${postId}`);
      revalidatePath(`/${username}`);
    } else {
      await prisma.bookmark.create({
        data: {
          postId,
          profileId,
        },
      });
    }
    revalidatePath(`/p/${postId}`);
    revalidatePath(`/${username}`);
  } catch (error) {
    console.error("Error bookmarking post:", error);
    return null;
  }
}

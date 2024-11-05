"use server";
import { revalidatePath } from "next/cache";
import { prisma } from "./prisma";
import { getUserEmail } from "./utils";

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
    console.log(error);
    console.error("Error updating profile:", error);
    return "Server Error: Unable to update profile.";
  }
}

import { auth } from "@/auth";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getUserEmail = async () => {
  const session = await auth();
  const userEmail = session?.user?.email;

  if (!userEmail) {
    return "Not signed! Please signin to continue.";
  }

  return userEmail;
};

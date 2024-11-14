import { auth } from "@/auth";
import CreatePostForm from "@/components/CreatePostForm";
import React from "react";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Post – Momentix",
  description:
    "Share your moments effortlessly on Momentix. Use the Create Post feature to capture, share, and celebrate life's special moments with an engaging community. Showcase your stories and connect with others in a seamless, user-friendly experience.",
};

export default async function CreatePage() {
  const session = await auth();

  if (!session) {
    redirect("/");
  }

  return (
    <div className="max-w-xl mx-auto h-full p-4">
      <h1 className="text-xl my-2 font-semibold">Create a post.</h1>
      <CreatePostForm />
    </div>
  );
}

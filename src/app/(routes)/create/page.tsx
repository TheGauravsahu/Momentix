import { auth } from "@/auth";
import CreatePostForm from "@/components/CreatePostForm";
import React from "react";
import { redirect } from "next/navigation";

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

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
    <div className="max-w-4xl mx-auto h-full p-4">
      <h1 className="text-xl my-2 font-semibold">Create a post.</h1>
      {session ? (
        <CreatePostForm />
      ) : (
        <div className="flex items-center justify-center h-full w-full">
          <h1>Please Login to Create Posts.</h1>
        </div>
      )}
    </div>
  );
}

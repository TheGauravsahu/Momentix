"use client";

import Image from "next/image";
import { Input } from "../ui/input";
import { useActionState } from "react";
import { createComment } from "@/lib/actions";
import { Loader2 } from "lucide-react";
import { Profile } from "@prisma/client";

export default function AddComment({
  profile,
  postId,
}: {
  profile: Profile;
  postId: string;
}) {
  const [data, action, isPending] = useActionState(createComment, null);


  return (
    <form action={action} className="flex gap-1 items-center w-full">
      <div className="aspect-square rounded-full overflow-hidden size-8">
        <Image
          src={profile.avatar || ""}
          alt={profile.name || ""}
          width={300}
          height={300}
        />
      </div>
      {isPending ? (
        <div className="w-full items-center justify-center">
          <Loader2 className="animate-spin" />
        </div>
      ) : (
        <Input
          readOnly={isPending}
          placeholder="Type your comment here."
          name="comment"
        />
      )}

      {/* hidden */}
      <input type="hidden" name="postId" value={postId} />
      <input type="hidden" name="profileId" value={profile.id} />
    </form>
  );
}

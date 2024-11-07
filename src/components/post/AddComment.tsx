"use client";

import Image from "next/image";
import { Input } from "../ui/input";
import { useActionState } from "react";
import { createComment } from "@/lib/actions";
import { Loader2, Send } from "lucide-react";
import { Profile } from "@prisma/client";
import { Button } from "../ui/button";

export default function AddComment({
  profile,
  postId,
}: {
  profile: Profile;
  postId: string;
}) {
  const [data, action, isPending] = useActionState(createComment, null);
  console.log(data);

  return (
    <form action={action} className="flex gap-1 items-center w-full p-2">
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
        <div className="flex item-center gap-2 w-full">
          <Input
            readOnly={isPending}
            placeholder="Type your comment here."
            name="comment"
          />
          <Button className="block lg:hidden">
            <Send />
          </Button>
        </div>
      )}

      {/* hidden */}
      <input type="hidden" name="postId" value={postId} />
      <input type="hidden" name="profileId" value={profile.id} />
    </form>
  );
}

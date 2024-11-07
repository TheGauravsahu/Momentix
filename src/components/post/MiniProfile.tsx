import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function MiniProfile({
  username,
  avatar,
  text,
}: {
  username: string;
  avatar: string;
  text?: string;
}) {
  return (
    <div className="flex gap-2 p-2 items-center">
      <div className="aspect-square rounded-full size-8 bg-gray-100 overflow-hidden">
        <Image src={avatar || ""} alt="postProfile" width={300} height={300} />
      </div>
      <div className="flex items-center gap-2 w-full">
        <Link href={("/" + username) as string} className="cursor-pointer">
          <p className="text-sm leading-tight font-semibold">@{username}</p>
        </Link>
        <p className="text-sm font-semibold mt-1">{text}</p>
      </div>
    </div>
  );
}

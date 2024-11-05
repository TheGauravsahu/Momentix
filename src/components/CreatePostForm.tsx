"use client";
import Image from "next/image";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";


export default function CreatePostForm() {
  return (
    <form className="w-full h-full">
      <div className="aspect-square size-80 rounded-lg dark:bg-gray-800 overflow-hidden">
        {/* <Image src={} alt={} width={400} height={400} /> */}
      </div>
      <div className="grid w-full gap-1.5">
        <Label htmlFor="message">Your caption</Label>
        <Textarea placeholder="Type your caption here." id="caption" />
      </div>
    </form>
  );
}

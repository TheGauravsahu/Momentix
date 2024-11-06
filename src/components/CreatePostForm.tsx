"use client";
import Image from "next/image";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { useActionState, useEffect, useRef, useState } from "react";
import { Loader2, UploadCloud } from "lucide-react";
import { createPost } from "@/lib/actions";
import { toast } from "sonner";
import { log } from "console";

export default function CreatePostForm() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [postImgUrl, setPostImgUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const uploadFile = async () => {
      if (!file) return;

      try {
        setUploading(true);
        const uploadData = new FormData();
        uploadData.set("file", file);

        const res = await fetch("/api/upload", {
          method: "POST",
          body: uploadData,
        });
        const url = await res.json();
        setPostImgUrl(url);
        setUploading(false);
      } catch (error) {
        console.log(error);
        setUploading(false);
      }
    };

    uploadFile();
  }, [file]);

  const [data, action, isPending] = useActionState(createPost, null);

  console.log(data);

  return (
    <form action={action} className="w-full h-full">
      <div className="relative aspect-square size-80 rounded-lg bg-gray-100 dark:bg-gray-800 overflow-hidden">
        {postImgUrl && (
          <Image src={postImgUrl} alt="post" width={400} height={400} />
        )}

        <input
          hidden
          type="file"
          ref={fileInputRef}
          onChange={(e) => setFile(e.target?.files?.[0] || null)}
        />

        <input hidden type="hidden" name="postImg" value={postImgUrl} />

        <div className="absolute z-[99] top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%]">
          <Button
            type="button"
            variant="outline"
            disabled={uploading}
            onClick={async () => {
              fileInputRef.current?.click();
            }}
          >
            <UploadCloud />
            {uploading ? "Uploading..." : "Upload"}
          </Button>
        </div>
      </div>
      <div className="grid w-full gap-1.5 my-4">
        <Label htmlFor="message">Your caption</Label>
        <Textarea
          placeholder="Type your caption here."
          name="caption"
          id="caption"
        />
      </div>

      <div className="">
        {isPending ? (
          <Button disabled={isPending} type="submit">
            <Loader2 className="animate-spin" />
            Post
          </Button>
        ) : (
          <Button disabled={isPending} type="submit">
            Post
          </Button>
        )}
      </div>
    </form>
  );
}

"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { upsertProfile } from "@/lib/actions";
import { Profile } from "@prisma/client";
import { UploadCloud } from "lucide-react";
import Image from "next/image";
import { useActionState, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export default function SettingsForm({ profile }: { profile: Profile | null }) {
  const [data, action, isPending] = useActionState(upsertProfile, null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File>();
  const [avatarUrl, setAvatarUrl] = useState(profile?.avatar || "");
  const [uploading, setUploading] = useState(false);

  if (data) {
    toast(data);
  }

  useEffect(() => {
    try {
      if (!file) {
        toast("No file selected");
        return;
      }

      setUploading(true);
      const data = new FormData();
      data.set("file", file);

      fetch("/api/upload", {
        method: "POST",
        body: data,
      }).then((res) => {
        res.json().then((url) => {
          setAvatarUrl(url);
          setUploading(false);
        });
      });
    } catch (error) {
      console.log(error);
      setUploading(false);
      toast("Trouble uploading file");
    }
  }, [file]);

  return (
    <form
      action={action}
      className="mx-auto max-w-lg h-full flex flex-col gap-4"
    >
      <div className="flex gap-4 items-center">
        <div className="aspect-square  size-44 rounded-full overflow-hidden bg-gray-400">
          <Image
            width={300}
            height={300}
            src={avatarUrl || ""}
            alt={profile?.username || ""}
          />
        </div>

        <input
          hidden
          type="file"
          ref={fileInputRef}
          onChange={(e) => setFile(e.target?.files?.[0])}
        />

        <input hidden type="hidden" name="avatar" value={avatarUrl} />

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

      <div className="">
        <Label htmlFor="username">Username</Label>
        <Input
          required={true}
          id="username"
          name="username"
          defaultValue={profile?.username || ""}
          placeholder="Username"
        />
      </div>

      <div className="">
        <Label htmlFor="bio">Bio</Label>
        <Input
          type="text"
          id="bio"
          name="bio"
          defaultValue={profile?.bio || ""}
          placeholder="Bio"
        />
      </div>

      <div className="">
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          readOnly={true}
          className="text-gray-400"
          id="email"
          name="email"
          defaultValue={profile?.email || ""}
          placeholder="Email"
        />
      </div>

      <Button disabled={isPending}>Save</Button>
    </form>
  );
}

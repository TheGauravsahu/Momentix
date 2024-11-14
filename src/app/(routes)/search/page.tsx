import MiniProfile from "@/components/post/MiniProfile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { prisma } from "@/lib/prisma";
import { Profile } from "@prisma/client";
import Form from "next/form";

export default async function Search({
  searchParams,
}: {
  searchParams: Promise<{ query: string }>;
}) {
  const { query } = await searchParams;

  let profiles: Profile[] | [] = [];

  if (query) {
    profiles = await prisma.profile.findMany({
      where: {
        username: { contains: query, mode: "insensitive" },
        name: { contains: query, mode: "insensitive" },
      },
    });
  }
  return (
    <div className="w-full h-full p-8">
      <Form
        action="/search"
        className="max-w-xl mx-auto  flex items-center gap-2"
      >
        <Input name="query" className="w-full" />
        <Button type="submit">Search</Button>
      </Form>

      {/* Search Result */}
      <div className="flex flex-wrap w-full h-full items-center  gap-4 my-2">
        {query &&
          (profiles.length > 0 ? (
            profiles.map((profile) => (
              <MiniProfile
                key={profile.id}
                username={profile.username}
                avatar={profile.avatar as string}
              />
            ))
          ) : (
            <p className="text-center mt-4 text-gray-500">No profile found.</p>
          ))}
      </div>
    </div>
  );
}

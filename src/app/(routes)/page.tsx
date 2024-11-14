import { auth, signIn } from "@/auth";
import PostCard from "@/components/post/PostCard";
import { Button } from "@/components/ui/button";
import { fetchFollowingPosts, getCurrentUserProfile } from "@/lib/data";
import { PostWithExtras, ProfileWithExtras } from "@/lib/definition";
import Image from "next/image";
import { redirect } from "next/navigation";
import { toast } from "sonner";

export default async function Home() {
  const session = await auth();
  const posts = await fetchFollowingPosts();
  const profile = await getCurrentUserProfile();


  return (
    <div className="w-full h-full p-8">
      {session ? (
        <div className="w-full h-full flex flex-col flex-wrap items-center justify-center gap-8">
          {posts.map((post) => (
            <PostCard key={post.id} post={post as PostWithExtras} profile={profile as ProfileWithExtras} />
          ))}
        </div>
      ) : (
        <form
          action={async () => {
            "use server";
            await signIn("google");
            toast.success("Signed in.");
            redirect("/settings");
          }}
        >
          <div className="">
            <Button variant="outline" type="submit">
              <Image
                src="/google.svg"
                alt="Google"
                width={300}
                height={300}
                className="size-4 aspect-square object-cover"
              />
              Signin with google
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}

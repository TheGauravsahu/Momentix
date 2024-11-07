import { auth, signIn } from "@/auth";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();

  return (
    <div className="p-8">
      <form
        action={async () => {
          "use server";
          await signIn("google");
          redirect("/settings");
        }}
      >
        {session ? (
          <div className="">
            <p>{JSON.stringify(session.user)}</p>
          </div>
        ) : (
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
        )}
      </form>
    </div>
  );
}

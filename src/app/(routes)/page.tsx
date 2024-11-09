import { auth, signIn } from "@/auth";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { redirect } from "next/navigation";
import { toast } from "sonner";

export default async function Home() {
  const session = await auth();

  return (
    <div className="lg:p-8">
      <form
        action={async () => {
          "use server";
          await signIn("google");
          toast.success("Signed in.")
          redirect("/settings");
        }}
      >
        {session ? (
          <div className="max-w-20 mx-auto lg:w-full">
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

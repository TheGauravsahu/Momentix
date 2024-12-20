import { navItems } from "@/lib/constants";
import { Nunito_Sans } from "next/font/google";
import Link from "next/link";
import MenuDropdown from "./MenuDropdown";
import { Camera } from "lucide-react";
import { getCurrentUserProfile } from "@/lib/data";

const nunitoSans = Nunito_Sans({ subsets: ["latin"] });

export default async function Sidebar() {
  const profile = await getCurrentUserProfile();

  return (
    <aside className="w-64 border-r h-screen p-8 hidden lg:block fixed top-0 left-0 z-[999]">
      <div className="h-full flex flex-col justify-between items-start ">
        <div className="flex flex-col gap-12">
          {/* Top --> Logo */}
          <div className="font-semibold text-xl">
            <Link prefetch={true} href="/">
              <h1
                className={`inline-flex gap-1 items-center ${nunitoSans.className}`}
              >
                <Camera />
                Momentix
              </h1>
            </Link>
          </div>

          {/* Sidebar Items */}
          <div className="flex flex-col gap-6">
            {navItems.map((item, index) => (
              <Link href={item.href} key={index} prefetch={true}>
                <h3 className="flex gap-1 items-center">
                  {<item.icon />}
                  {item.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>

        <div />
        {/* Bottom */}
        <MenuDropdown username={profile?.username as string} />
      </div>
    </aside>
  );
}

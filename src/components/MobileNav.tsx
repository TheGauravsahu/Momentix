import { navItems } from "@/lib/constants";
import Link from "next/link";
import React from "react";
import MenuDropdown from "./MenuDropdown";
import { getCurrentUserProfile } from "@/lib/data";

export default async function MobileNav() {
  const profile = await getCurrentUserProfile();

  return (
    <nav className="fixed z-[999] bottom-0 right-0 left-0  border-t flex items-center justify-around gap-2 lg:hidden p-4 h-16">
      {navItems.map((item, i) => (
        <Link prefetch={true} key={i} href={item.href}>
          <h3 className="flex gap-1 items-center">{<item.icon />}</h3>
        </Link>
      ))}

      <MenuDropdown username={profile?.username as string} />
    </nav>
  );
}

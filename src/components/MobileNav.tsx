import { navItems } from "@/lib/constants";
import Link from "next/link";
import React from "react";

export default function MobileNav() {
  return (
    <nav className="absolute z-[999] bottom-0 right-0 left-0  border-t flex items-center justify-around gap-2 md:hidden p-4">
      {navItems.map((item, i) => (
        <Link key={i} href={item.href}>
          <h3 className="flex gap-1 items-center">{<item.icon />}</h3>
        </Link>
      ))}
    </nav>
  );
}

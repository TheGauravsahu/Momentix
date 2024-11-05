"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { Menu, LogOut, Settings, User } from "lucide-react";
import Link from "next/link";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function MenuDropdown() {
  const router = useRouter();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(()=>{
    const theme = localStorage.getItem("theme")
    if (theme === "dark") {
      setIsDarkMode(true);
    }
  },[])

  const toggleDarkMode = (isDark: boolean) => {
    if (typeof window != undefined) {
      const mode = isDark ? "dark" : "light";
      localStorage.setItem("theme", mode);
      document.documentElement.classList.toggle(
        "dark",
        localStorage.theme === "dark"
      );
    }
    setIsDarkMode(isDark);
    router.refresh();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger suppressHydrationWarning={true}>
        <Button variant="outline">
          <Menu />
          More
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 ml-3">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link href="/profile" className="flex gap-1 items-center">
              <User />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <Link href="/settings" className="flex gap-1 items-center">
              <Settings />
              <span>Settings</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <div className="flex items-center space-x-2">
              <Switch
                color="dark:bg-gray-800"
                defaultChecked={isDarkMode}
                id="dark-mode"
                onCheckedChange={toggleDarkMode}
              />
              <Label htmlFor="dark-mode">Dark</Label>
            </div>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOut />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

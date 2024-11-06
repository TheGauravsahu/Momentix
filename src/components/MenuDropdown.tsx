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
import { LogOut, Menu, Settings, User } from "lucide-react";
import Link from "next/link";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { LogoutProfile } from "@/lib/actions";
import { toast } from "sonner";

export default function MenuDropdown({ username }: { username: string }) {
  const router = useRouter();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      setIsDarkMode(true);
    }
  }, []);

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

  const [data, action, isPending] = useActionState(LogoutProfile, null);

  if (data) {
    toast(data);
  }

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
            <Link href={`/${username}`} className="flex gap-1 items-center">
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
          <form action={action}>
            <Button disabled={isPending} variant="ghost">
              <LogOut />
              <span>Log out</span>
            </Button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

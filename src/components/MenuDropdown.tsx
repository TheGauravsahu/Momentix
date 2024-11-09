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
import { useEffect, useState } from "react";
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

  const handleLogout = async () => {
    const response = await LogoutProfile();
    toast(response);
    if (response === "Logged out.") {
      router.push("/");
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger suppressHydrationWarning>
        <span className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground px-3 py-2">
          <Menu />
          More
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 ml-3" side="top">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link prefetch={true} href={username ? `/${username}` : "/settings"}>
            <DropdownMenuItem>
              <User />
              <span>Profile</span>
            </DropdownMenuItem>
          </Link>

          <Link prefetch={true} href="/settings">
            <DropdownMenuItem>
              <Settings />
              <span>Settings</span>
            </DropdownMenuItem>
          </Link>

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
          <Button onClick={handleLogout} variant="ghost">
            <LogOut />
            <span>Log out</span>
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

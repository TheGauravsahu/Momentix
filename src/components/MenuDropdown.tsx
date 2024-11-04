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
  import {
    Menu,
    LogOut,
    Settings,
    User,
  } from "lucide-react";
import Link from "next/link";


export default function MenuDropdown() {
  return (
    <DropdownMenu>
          <DropdownMenuTrigger suppressHydrationWarning={true}>
            <Button variant="outline">
              <Menu />
              More
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
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
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
  )
}

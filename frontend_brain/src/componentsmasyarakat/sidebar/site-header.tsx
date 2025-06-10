"use client"

import { Button } from "../ui/button"
import { Separator } from "@/componentsmasyarakat/ui/separator"
import { SidebarTrigger } from "@/componentsmasyarakat/ui/sidebar"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/componentsmasyarakat/ui/dropdown-menu"

import { 
  UserIcon,
  } from "@phosphor-icons/react"

export function SiteHeader() {
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium">Beranda</h1>
        <div className="ml-auto flex items-center gap-2">
          <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size={"iconCircle"} variant={"outline"}>
                    <UserIcon size={32} />
                </Button>
              </DropdownMenuTrigger>
            <DropdownMenuContent side="bottom" align="end">
              <DropdownMenuLabel>Akun Saya</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>
                <span className="text-red-600">Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

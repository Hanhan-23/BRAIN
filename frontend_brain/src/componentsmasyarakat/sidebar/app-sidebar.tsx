"use client"

import * as React from "react"
import {
  IconCamera,
  IconFileAi,
  IconFileDescription,
  IconInnerShadowTop,
} from "@tabler/icons-react"

import { 
  SquaresFourIcon,
  FileIcon,
  ChartBarIcon,
  PlusIcon,
  } from "@phosphor-icons/react";

import { NavDaftarLaporan } from "./nav-daftar-laporan"
import { NavMain } from "./nav-main"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/componentsmasyarakat/ui/sidebar"

import { Button } from "../ui/button";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: SquaresFourIcon,
    },
    {
      title: "Laporan",
      url: "#",
      icon: FileIcon,
    },
    {
      title: "Rekomendasi",
      url: "#",
      icon: ChartBarIcon,
    },
  ],
  navClouds: [
    {
      title: "Capture",
      icon: IconCamera,
      isActive: true,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Proposal",
      icon: IconFileDescription,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Prompts",
      icon: IconFileAi,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
  ],
  dataLaporanUser: [
    {
      judul: "Data Library",
      url: "#",
      tanggal: "2025-02-12",
    },
    {
      judul: "Reports",
      url: "#",
      tanggal: "2025-02-12",
    },
    {
      judul: "Word Assistant",
      url: "#",
      tanggal: "2025-02-12",
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props} className="border-r border-slate-300">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className="px-2">
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">BRAIN</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <NavMain items={data.navMain} />
      </SidebarHeader>
      <SidebarContent>
        <div className="flex px-2">
          <Button className="w-full bg-blue-500 hover:bg-blue-600 justify-between text-sm">
            Laporkan Kerusakan
            <PlusIcon />
          </Button>
        </div>
        <NavDaftarLaporan items={data.dataLaporanUser} />
      </SidebarContent>
    </Sidebar>
  )
}

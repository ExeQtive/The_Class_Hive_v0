// @ts-nocheck
// @ts-nocheck
import { HomeIcon, LayoutDashboard, Settings, FolderIcon, FileText, FileQuestion } from "lucide-react"

import type { MainNavItem, SidebarNavItem } from "@/types"

interface DashboardConfig {
  mainNav: MainNavItem[]
  sidebarNav: SidebarNavItem[]
}

export const dashboardConfig: DashboardConfig = {
  mainNav: [
    {
      title: "Documentation",
      href: "/documentation",
    },
    {
      title: "Support",
      href: "/support",
      disabled: true,
    },
  ],
  sidebarNav: [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Home",
      href: "/",
      icon: HomeIcon,
    },
    {
      title: "File Management",
      href: "/file-management",
      icon: FolderIcon,
    },
    {
      title: "Word Document",
      href: "/word-document",
      icon: FileText,
    },
    {
      title: "Documentation",
      href: "/documentation",
      icon: FileQuestion,
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
    },
  ],
}

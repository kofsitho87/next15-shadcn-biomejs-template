import type { NavItem } from "@/types/index"

export const navItems: NavItem[] = [
  {
    title: "Dashboard",
    url: "/dashboard/overview",
    icon: "dashboard",
    isActive: false,
    items: [], // Empty array as there are no child items for Dashboard
  },
  {
    title: "Job",
    url: "/dashboard/job",
    icon: "dashboard",
    isActive: false,
    items: [], // Empty array as there are no child items for Dashboard
  },
]

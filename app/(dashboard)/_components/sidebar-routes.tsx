"use client";

import { BarChart,  Webhook, GalleryHorizontal, GalleryVerticalEnd, Library, List, FolderKanban, PenLine, ScrollText } from "lucide-react";
import { usePathname } from "next/navigation";

import { SidebarItem } from "./sidebar-item";


const guestRoutes = [
  {
    icon: ScrollText,
    label: "PROGRAMACIÓN CURRICULAR ANUAL",
    href: "/annual",
  },
  {
    icon: GalleryHorizontal,
    label: "Learning Experience",
    href: "/sessions",
  },
  {
    icon: Library,
    label: "Learning Sessions",
    href: "/experience",
  }
];
const adminRoutes = [
  {
    icon: FolderKanban,
    label: "Analytics",
    href: "/admin/analytics",
  },
  {
    icon: PenLine,
    label: "Manage Teachers",
    href: "/admin/teachers",
  },
  {
    icon: Webhook,
    label: "Support",
    href: "/admin/support",
  },
]

export const SidebarRoutes = () => {
  // const admin = checkAdmin()

  const pathname = usePathname();

  const isAdmin = pathname?.includes("/admin");

  const routes = isAdmin ? adminRoutes : guestRoutes;


  return (
    <div className="flex flex-col w-full">
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  )
}
"use client";

import {
  BarChart,
  Webhook,
  GalleryHorizontal,
  GalleryVerticalEnd,
  Library,
  List,
  FolderKanban,
  PenLine,
  ScrollText,
} from "lucide-react";
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
    label: "EXPERIENCIA DE APRENDIZAJE",
    href: "/experience",
  },
  {
    icon: Library,
    label: "SESIONES DE APRENDIZAJE",
    href: "/sessions",
  },
];
const adminRoutes = [
  {
    icon: FolderKanban,
    label: "Analítica",
    href: "/admin/analytics",
  },
  {
    icon: PenLine,
    label: "Administrar maestras",
    href: "/admin/teachers",
  }
];

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
  );
};

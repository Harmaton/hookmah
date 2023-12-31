"use client";

import { BarChart,  BookMarked, GalleryHorizontal, GalleryVerticalEnd, Library, List } from "lucide-react";
import { usePathname } from "next/navigation";

import { SidebarItem } from "./sidebar-item";


const guestRoutes = [
  {
    icon: GalleryVerticalEnd,
    label: "Annual Programming",
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
const teacherRoutes = [
  {
    icon: List,
    label: "Cursos",
    href: "/dashboard/teacher/courses",
  },
  {
    icon: BookMarked,
    label: "Citas reservadas",
    href: "/dashboard/teacher/booked_apointments",
  },
  {
    icon: BarChart,
    label: "Calendario",
    href: "/dashboard/teacher/calendar",
  },
]

export const SidebarRoutes = () => {
  // const admin = checkAdmin()

  const pathname = usePathname();

  const isTeacherPage = pathname?.includes("/teacher");

  const routes = isTeacherPage ? teacherRoutes : guestRoutes;


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
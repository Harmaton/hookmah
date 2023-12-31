"use client";

import { BarChart, BarChartIcon, Book, BookMarked, BookOpen, CircleDot, Crown, Droplets, Heart, HelpCircleIcon, List, ListVideoIcon, MedalIcon, Mic2, Mic2Icon, Navigation2, PackageOpen, PartyPopper, PlayCircle, Pyramid, RollerCoaster, ScanText, SparklesIcon, StarIcon, TestTube, TicketIcon, UserCheck, UserCheck2Icon } from "lucide-react";
import { usePathname } from "next/navigation";

import { SidebarItem } from "./sidebar-item";


const guestRoutes = [
  {
    icon: Droplets,
    label: "Meditacion",
    href: "/dashboard/meditation",
  },
  {
    icon: Crown,
    label: "Puntos",
    href: "/dashboard/leaderboard",
  },
  {
    icon: PartyPopper,
    label: "Eventos en persona",
    href: "/dashboard/in-person",
  },
  {
    icon: ListVideoIcon,
    label: "Conferencias",
    href: "/dashboard/tickets",
  },
  {
    icon: Pyramid,
    label: "Mentoras",
    href: "/dashboard/mentors",
  },
  {
    icon: ScanText,
    label: "Librería",
    href: "/dashboard/booksale",
  },
  {
    icon: RollerCoaster,
    label: "Cita",
    href: "/dashboard/appointment",
  },
  {
    icon: Navigation2,
    label: "Teillen Team",
    href: "https://teilenteam.com/teilen2020/public/persona/login",
  },
  {
    icon: StarIcon,
    label: "Microsignals",
    href: "/dashboard/microsignals",
  },
  {
    icon: Heart,
    label: "Donación",
    href: "https://paypal.me/BiblioOnlineCoaching?country.x=PE&locale.x=en_US",
  },
  {
    icon: UserCheck,
    label: "Cuenta",
    href: "/dashboard/account",
  },
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
  {
    icon: UserCheck2Icon,
    label: "Perfil del profesor",
    href: "/dashboard/teacher/profile",
  },
  {
    icon: CircleDot,
    label: "Sesión Meditación",
    href: "/dashboard/teacher/meditation",
  },
]

export const SidebarRoutes = () => {
  // const admin = checkAdmin()

  const pathname = usePathname();

  const isTeacherPage = pathname?.includes("/teacher");

  const routes = isTeacherPage ? teacherRoutes : guestRoutes;

  const isStudentPage = pathname?.includes("/search")

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
      {
        
      }
    </div>
  )
}
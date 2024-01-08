import { HopOff } from "lucide-react"
import { Logo } from "./logo"
import { SidebarRoutes } from "./sidebar-routes"
import Link from "next/link"

export const Sidebar = () => {
  return (
    <div className="h-full flex flex-col overflow-y-auto shadow-sm">
      <div className="p-6 mb-6">
       <Logo />
      </div>
      <div className="flex flex-col w-full">
        <SidebarRoutes />
      </div>
    </div>
  )
}
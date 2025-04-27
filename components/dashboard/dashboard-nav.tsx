"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  BarChart3,
  FileText,
  Home,
  ImageIcon,
  LayoutGrid,
  MapPin,
  MessageSquare,
  Settings,
  ShoppingBag,
  Users,
} from "lucide-react"

const items = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    title: "Site Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
  {
    title: "Menu Categories",
    href: "/dashboard/categories",
    icon: LayoutGrid,
  },
  {
    title: "Menu Items",
    href: "/dashboard/menu",
    icon: ShoppingBag,
  },
  {
    title: "Pages",
    href: "/dashboard/pages",
    icon: FileText,
  },
  {
    title: "Hero Banners",
    href: "/dashboard/banners",
    icon: ImageIcon,
  },
  {
    title: "Testimonials",
    href: "/dashboard/testimonials",
    icon: MessageSquare,
  },
  {
    title: "Blog Posts",
    href: "/dashboard/blog",
    icon: FileText,
  },
  {
    title: "Locations",
    href: "/dashboard/locations",
    icon: MapPin,
  },
  {
    title: "Gallery",
    href: "/dashboard/gallery",
    icon: ImageIcon,
  },
  {
    title: "Analytics",
    href: "/dashboard/analytics",
    icon: BarChart3,
  },
  {
    title: "Users",
    href: "/dashboard/users",
    icon: Users,
  },
]

export function DashboardNav() {
  const pathname = usePathname()

  return (
    <nav className="grid items-start gap-2 p-2">
      {items.map((item) => {
        const isActive = pathname === item.href
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
              isActive ? "bg-accent" : "transparent",
            )}
          >
            <item.icon className="mr-2 h-4 w-4" />
            <span>{item.title}</span>
          </Link>
        )
      })}
    </nav>
  )
}

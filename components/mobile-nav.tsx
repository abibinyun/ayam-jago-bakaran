"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import type { Database } from "@/types/supabase";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu, PhoneCall, ShoppingBag } from "lucide-react";

type SiteSettings = Database["public"]["Tables"]["site_settings"]["Row"];

interface MobileNavProps {
  settings: SiteSettings | null;
}

export function MobileNav({ settings }: MobileNavProps) {
  const [open, setOpen] = React.useState(false);

  const routes = [
    {
      href: "/",
      label: "Home",
    },
    {
      href: "/menu",
      label: "Menu",
    },
    {
      href: "/locations",
      label: "Locations",
    },
    {
      href: "/about",
      label: "About",
    },
    {
      href: "/blog",
      label: "Blog",
    },
    {
      href: "/contact",
      label: "Contact",
    },
  ];

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="pr-0">
        <SheetHeader className="mb-4">
          <SheetTitle className="flex items-center gap-2">
            {/* {settings?.logo_url ? (
              <Image
                src={settings.logo_url || "/placeholder.svg"}
                alt={settings.site_name}
                width={32}
                height={32}
                className="h-8 w-auto"
              />
            ) : (
              <div className="h-8 w-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xs">AJ</span>
              </div>
            )} */}
            <Image src={"/logo-ayam-jago-bakaran.webp"} alt={"logo ayam jago bakaran"} width={40} height={40} className="h-10 w-auto" />
            <span>{settings?.site_name || "Ayam Jago Bakaran"}</span>
          </SheetTitle>
        </SheetHeader>
        <div className="flex flex-col space-y-3 py-4">
          {routes.map((route) => (
            <Link key={route.href} href={route.href} className="px-6 py-2 text-sm font-medium transition-colors hover:text-primary" onClick={() => setOpen(false)}>
              {route.label}
            </Link>
          ))}
          <div className="mt-4 px-6 py-2">
            {/* Button order online */}
            {/* <Button className="w-full" size="sm">
              <ShoppingBag className="mr-2 h-4 w-4" />
              Order Online
            </Button> */}
          </div>
          {settings?.phone && (
            <div className="px-6 py-2">
              <Button variant="outline" className="w-full" size="sm" asChild>
                <Link href={`tel:${settings.phone}`}>
                  <PhoneCall className="mr-2 h-4 w-4" />
                  {settings.phone}
                </Link>
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

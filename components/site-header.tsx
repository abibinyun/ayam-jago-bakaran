import Link from "next/link";
import Image from "next/image";
import type { Database } from "@/types/supabase";
import { MainNav } from "@/components/main-nav";
import { MobileNav } from "@/components/mobile-nav";
import { Button } from "@/components/ui/button";
import { PhoneCall, ShoppingBag } from "lucide-react";

type SiteSettings = Database["public"]["Tables"]["site_settings"]["Row"];

interface SiteHeaderProps {
  settings: SiteSettings | null;
}

export function SiteHeader({ settings }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center mx-auto">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          {/* {settings?.logo_url ? (
            <Image src={settings.logo_url || "/logo-ayam-jago-bakaran.webp"} alt={settings.site_name} width={40} height={40} className="h-10 w-auto" />
          ) : (
            <div className="h-10 w-10 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground font-bold">AJ</span>
            </div>
          )} */}
          <Image src={"/logo-ayam-jago-bakaran.webp"} alt={"logo ayam jago bakaran"} width={40} height={40} className="h-10 w-auto mx-3" />
          <span className="hidden font-bold sm:inline-block">{settings?.site_name || "Ayam Jago Bakaran"}</span>
        </Link>
        <MainNav />
        <div className="flex flex-1 items-center justify-end space-x-4">
          {settings?.phone && (
            <Button variant="ghost" size="icon" asChild className="hidden md:flex">
              <Link href={`tel:${settings.phone}`}>
                <PhoneCall className="h-5 w-5" />
                <span className="sr-only">Call</span>
              </Link>
            </Button>
          )}
          <Button variant="outline" size="sm" className="hidden md:flex">
            <ShoppingBag className="mr-2 h-4 w-4" />
            Order Online
          </Button>
          <MobileNav settings={settings} />
        </div>
      </div>
    </header>
  );
}

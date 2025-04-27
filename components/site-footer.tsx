import Link from "next/link";
import type { Database } from "@/types/supabase";
import { Facebook, Instagram, MapPin, Phone, Mail } from "lucide-react";

type SiteSettings = Database["public"]["Tables"]["site_settings"]["Row"];

interface SiteFooterProps {
  settings: SiteSettings | null;
}

export function SiteFooter({ settings }: SiteFooterProps) {
  return (
    <footer className="bg-muted">
      <div className="container py-12 md:py-16 mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 px-3">
          <div>
            <h3 className="text-lg font-bold">{settings?.site_name || "Ayam Jago Bakaran"}</h3>
            <p className="mt-4 text-sm text-muted-foreground">Kelezatan Ayam Bakar Asli Indonesia dengan bumbu rempah pilihan dan dibakar dengan arang berkualitas.</p>
            <div className="mt-6 flex space-x-4">
              {settings?.instagram_url && (
                <Link href={settings.instagram_url} className="text-muted-foreground hover:text-primary" target="_blank" rel="noopener noreferrer">
                  <Instagram className="h-5 w-5" />
                  <span className="sr-only">Instagram</span>
                </Link>
              )}
              {settings?.facebook_url && (
                <Link href={settings.facebook_url} className="text-muted-foreground hover:text-primary" target="_blank" rel="noopener noreferrer">
                  <Facebook className="h-5 w-5" />
                  <span className="sr-only">Facebook</span>
                </Link>
              )}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/menu" className="text-sm text-muted-foreground hover:text-primary">
                  Our Menu
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/locations" className="text-sm text-muted-foreground hover:text-primary">
                  Locations
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm text-muted-foreground hover:text-primary">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold">Contact Us</h3>
            <ul className="mt-4 space-y-4">
              {settings?.address && (
                <li className="flex items-start">
                  <MapPin className="mr-2 h-5 w-5 text-primary" />
                  <span className="text-sm text-muted-foreground">{settings.address}</span>
                </li>
              )}
              {settings?.phone && (
                <li className="flex items-center">
                  <Phone className="mr-2 h-5 w-5 text-primary" />
                  <Link href={`tel:${settings.phone}`} className="text-sm text-muted-foreground hover:text-primary">
                    {settings.phone}
                  </Link>
                </li>
              )}
              {settings?.email && (
                <li className="flex items-center">
                  <Mail className="mr-2 h-5 w-5 text-primary" />
                  <Link href={`mailto:${settings.email}`} className="text-sm text-muted-foreground hover:text-primary">
                    {settings.email}
                  </Link>
                </li>
              )}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold">Opening Hours</h3>
            <ul className="mt-4 space-y-2">
              <li className="text-sm text-muted-foreground">
                <span className="font-medium">Monday - Friday:</span> 10:00 AM - 10:00 PM
              </li>
              <li className="text-sm text-muted-foreground">
                <span className="font-medium">Saturday - Sunday:</span> 09:00 AM - 11:00 PM
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-border pt-6">
          <p className="text-center text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} {settings?.site_name || "Ayam Jago Bakaran"}. All rights reserved.
            {settings?.footer_text && <span className="block mt-1">{settings.footer_text}</span>}
          </p>
        </div>
      </div>
    </footer>
  );
}

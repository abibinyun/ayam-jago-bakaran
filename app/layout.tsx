import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  const supabase = createServerSupabaseClient();
  const { data: settings } = await supabase.from("site_settings").select("*").single();

  return {
    title: {
      default: settings?.site_name || "Ayam Jago Bakaran",
      template: `%s | ${settings?.site_name || "Ayam Jago Bakaran"}`,
    },
    description: "Ayam Jago Bakaran - Kelezatan Ayam Bakar Asli Indonesia",
    icons: {
      icon: settings?.favicon_url || "/favicon.ico",
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = createServerSupabaseClient();
  const { data: settings } = await supabase.from("site_settings").select("*").single();

  return (
    <html lang="id" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <div className="relative flex min-h-screen flex-col">
            <SiteHeader settings={settings} />
            <main className="flex-1">{children}</main>
            <SiteFooter settings={settings} />
          </div>
        </ThemeProvider>
      </body>
    </html>

    // <html lang="id" suppressHydrationWarning>
    //   <body className={`${inter.className} overflow-x-hidden`}>
    //     <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
    //       <div className="relative flex min-h-screen flex-col">
    //         <SiteHeader settings={settings} />
    //         <main className="flex-1 flex flex-col items-center justify-center">{children}</main>
    //         <SiteFooter settings={settings} />
    //       </div>
    //     </ThemeProvider>
    //   </body>
    // </html>
  );
}

// export const metadata = {
//       generator: 'v0.dev'
//     };

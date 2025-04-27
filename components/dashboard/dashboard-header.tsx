import Link from "next/link";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { UserNav } from "@/components/dashboard/user-nav";
import { MobileSidebar } from "@/components/dashboard/mobile-sidebar";

export async function DashboardHeader() {
  const supabase = createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="sticky top-0 z-40 border-b bg-background">
      <div className="container flex h-16 items-center justify-between py-4 mx-auto">
        <div className="flex items-center gap-2 md:gap-4">
          <MobileSidebar />
          <Link href="/dashboard" className="flex items-center gap-2">
            <span className="font-bold">Ayam Jago Admin</span>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <UserNav user={user} />
        </div>
      </div>
    </header>
  );
}

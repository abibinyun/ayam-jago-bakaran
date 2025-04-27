import Link from "next/link";
import Image from "next/image";
import type { Database } from "@/types/supabase";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";

type MenuItem = Database["public"]["Tables"]["menu_items"]["Row"] & {
  menu_categories: {
    name: string;
    slug: string;
  } | null;
};

interface FeaturedMenuProps {
  items: MenuItem[];
}

export function FeaturedMenu({ items }: FeaturedMenuProps) {
  if (!items.length) {
    return null;
  }

  return (
    <section className="py-12 md:py-24">
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Menu Favorit</h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">Nikmati menu favorit kami yang dimasak dengan bumbu rempah pilihan dan dibakar dengan arang berkualitas.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2 lg:grid-cols-3 px-3">
          {items.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <div className="aspect-video w-full overflow-hidden">
                {item.image_url ? (
                  <Image src={item.image_url || "/placeholder.svg"} alt={item.name} width={600} height={400} className="h-full w-full object-cover transition-all hover:scale-105" />
                ) : (
                  <div className="h-full w-full bg-muted flex items-center justify-center">
                    <span className="text-muted-foreground">No image</span>
                  </div>
                )}
              </div>
              <CardHeader>
                <div className="space-y-1">
                  {item.menu_categories && (
                    <Link href={`/menu/${item.menu_categories.slug}`} className="text-xs text-muted-foreground hover:text-primary">
                      {item.menu_categories.name}
                    </Link>
                  )}
                  <CardTitle>{item.name}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground line-clamp-2">{item.description}</p>
              </CardContent>
              <CardFooter className="flex items-center justify-between">
                <div>
                  {item.sale_price ? (
                    <div className="flex items-baseline gap-2">
                      <span className="text-lg font-bold">{formatCurrency(item.sale_price)}</span>
                      <span className="text-sm text-muted-foreground line-through">{formatCurrency(item.price)}</span>
                    </div>
                  ) : (
                    <span className="text-lg font-bold">{formatCurrency(item.price)}</span>
                  )}
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/menu/${item.slug}`}>Detail</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="flex justify-center mt-10">
          <Button size="lg" asChild>
            <Link href="/menu">Lihat Semua Menu</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

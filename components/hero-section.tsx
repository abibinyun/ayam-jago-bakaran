"use client";
import Image from "next/image";
import Link from "next/link";
import type { Database } from "@/types/supabase";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

type HeroBanner = Database["public"]["Tables"]["hero_banners"]["Row"];

interface HeroSectionProps {
  banners: HeroBanner[];
}

export function HeroSection({ banners }: HeroSectionProps) {
  if (!banners.length) {
    return (
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">Ayam Jago Bakaran</h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">Kelezatan Ayam Bakar Asli Indonesia dengan bumbu rempah pilihan dan dibakar dengan arang berkualitas.</p>
            </div>
            <div className="space-x-4">
              <Button asChild>
                <Link href="/menu">Lihat Menu</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/locations">Lokasi Kami</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <Carousel className="w-full">
      <CarouselContent>
        {banners.map((banner, index) => (
          <CarouselItem key={banner.id}>
            <div className="relative w-full h-[50vh] md:h-[70vh] overflow-hidden">
              <Image src={banner.image_url || "/placeholder.svg"} alt={banner.title} fill priority className="object-cover" />
              <div className="absolute inset-0 bg-black/40 flex items-center">
                <div className="container px-4 md:px-6 text-white">
                  <div className="max-w-xl space-y-4">
                    {index === 0 ? (
                      <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">{banner.title}</h1>
                    ) : (
                      <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">{banner.title}</h2>
                    )}
                    {banner.subtitle && <p className="max-w-[600px] md:text-xl">{banner.subtitle}</p>}
                    {banner.button_text && banner.button_link && (
                      <Button size="lg" asChild>
                        <Link href={banner.button_link}>{banner.button_text}</Link>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-4" />
      <CarouselNext className="right-4" />
    </Carousel>
  );
}

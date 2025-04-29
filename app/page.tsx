import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { HeroSection } from "@/components/hero-section";
import { FeaturedMenu } from "@/components/featured-menu";
import { TestimonialsSection } from "@/components/testimonials-section";
import { GallerySection } from "@/components/gallery-section";

const AyamImage = () => {
  const src = "https://wnhyycdfdhfpljqlhedx.supabase.co/storage/v1/object/public/assets/img/ayam-jago-bakaran-enak.webp";

  return <Image src={src || "/placeholder.svg?height=550&width=550"} alt="Ayam Jago Bakaran" width={550} height={550} className="mx-auto w-full h-auto object-cover" />;
};

export const metadata: Metadata = {
  title: "Home",
  description: "Ayam Jago Bakaran - Kelezatan Ayam Bakar Asli Indonesia",
};

export default async function Home() {
  const supabase = createServerSupabaseClient();

  // Fetch hero banners
  const { data: heroBanners } = await supabase.from("hero_banners").select("*").eq("is_active", true).order("display_order", { ascending: true });

  // Fetch featured menu items
  const { data: featuredItems } = await supabase.from("menu_items").select("*, menu_categories(name, slug)").eq("is_featured", true).eq("is_available", true).limit(6);

  // Fetch testimonials
  const { data: testimonials } = await supabase.from("testimonials").select("*").eq("is_active", true).order("display_order", { ascending: true }).limit(5);

  // Fetch gallery images
  const { data: galleryImages } = await supabase.from("gallery").select("*").eq("is_active", true).order("display_order", { ascending: true }).limit(8);

  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection banners={heroBanners || []} />

      {/* About Section */}
      <section className="py-12 md:py-24 bg-muted/50">
        <div className="container mx-auto">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4 px-3">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Kelezatan Ayam Bakar Asli Indonesia</h2>
              <p className="text-muted-foreground md:text-xl">Ayam Jago Bakaran menyajikan ayam bakar dengan bumbu rempah pilihan dan dibakar dengan arang berkualitas untuk menghasilkan cita rasa yang autentik dan lezat.</p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button asChild size="lg">
                  <Link href="/menu">Lihat Menu</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/about">Tentang Kami</Link>
                </Button>
              </div>
            </div>
            <div className="mx-auto aspect-video overflow-hidden rounded-xl object-cover">
              <AyamImage />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Menu Section */}
      <FeaturedMenu items={featuredItems || []} />

      {/* Testimonials Section */}
      <TestimonialsSection testimonials={testimonials || []} />

      {/* Gallery Section */}
      <GallerySection images={galleryImages || []} />

      {/* CTA Section */}
      <section className="py-12 md:py-24 bg-primary text-primary-foreground">
        <div className="container">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Pesan Sekarang</h2>
              <p className="mx-auto max-w-[700px] md:text-xl">Nikmati kelezatan Ayam Jago Bakaran di rumah atau kantor Anda. Pesan sekarang untuk pengalaman kuliner yang tak terlupakan.</p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/menu">Lihat Menu</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/contact" className="text-orange-900">
                  Hubungi Kami
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

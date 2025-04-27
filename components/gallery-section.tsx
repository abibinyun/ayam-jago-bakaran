import Image from "next/image";
import Link from "next/link";
import type { Database } from "@/types/supabase";
import { Button } from "@/components/ui/button";

type GalleryImage = Database["public"]["Tables"]["gallery"]["Row"];

interface GallerySectionProps {
  images: GalleryImage[];
}

export function GallerySection({ images }: GallerySectionProps) {
  if (!images.length) {
    return null;
  }

  return (
    <section className="py-12 md:py-24">
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Galeri Kami</h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">Lihat suasana dan menu-menu lezat di Ayam Jago Bakaran.</p>
          </div>
        </div>
        <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-3">
          {images.map((image) => (
            <div key={image.id} className="relative aspect-square overflow-hidden rounded-md">
              <Image src={image.image_url || "/placeholder.svg"} alt={image.title || "Gallery image"} fill className="object-cover transition-all hover:scale-105" />
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-10">
          <Button variant="outline" size="lg" asChild>
            <Link href="/gallery">Lihat Semua Foto</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

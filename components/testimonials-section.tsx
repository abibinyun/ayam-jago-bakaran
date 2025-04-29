"use client";
import Image from "next/image";
import type { Database } from "@/types/supabase";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Star, StarHalf } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

type Testimonial = Database["public"]["Tables"]["testimonials"]["Row"];

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  if (!testimonials.length) {
    return null;
  }

  return (
    <section className="py-12 md:py-24 bg-muted/50">
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Testimoni Pelanggan</h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">Apa kata pelanggan kami tentang Ayam Jago Bakaran.</p>
          </div>
        </div>
        <div className="mt-8">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {testimonials.map((testimonial) => (
                <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/3 pl-4">
                  <Card>
                    <CardHeader className="flex flex-row items-center gap-4 pb-2">
                      {testimonial.avatar_url ? (
                        <Image src={testimonial.avatar_url || "/placeholder.svg"} alt={testimonial.name} width={40} height={40} className="h-10 w-10 rounded-full object-cover" />
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
                          <span className="text-primary-foreground font-bold text-sm">{testimonial.name.charAt(0)}</span>
                        </div>
                      )}
                      <div className="flex flex-col">
                        <span className="font-semibold">{testimonial.name}</span>
                        {testimonial.position && <span className="text-xs text-muted-foreground">{testimonial.position}</span>}
                      </div>
                      {testimonial.rating && (
                        <div className="ml-auto flex">
                          {Array.from({ length: Math.floor(testimonial.rating) }).map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                          ))}
                          {testimonial.rating % 1 !== 0 && <StarHalf className="h-4 w-4 fill-primary text-primary" />}
                        </div>
                      )}
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{testimonial.content}</p>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-4">
              <CarouselPrevious className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10" />
              <CarouselNext className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
}

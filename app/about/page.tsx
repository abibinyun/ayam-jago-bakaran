import type { Metadata } from "next";
import Image from "next/image";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { RotateCcwIcon, CookingPot, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Ayam Jago Bakaran and our story",
};

export default async function AboutPage() {
  const supabase = createServerSupabaseClient();

  // Fetch about page content
  const { data: page } = await supabase.from("pages").select("*").eq("slug", "about").eq("is_published", true).single();

  return (
    <div className="container py-12 md:py-24 mx-auto">
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{page?.title || "About Us"}</h1>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">Learn about our story and our commitment to quality.</p>
        </div>
      </div>

      <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
        <div>
          <Image src="/placeholder.svg?height=600&width=600" alt="About Ayam Jago Bakaran" width={600} height={600} className="mx-auto rounded-lg object-cover" />
        </div>
        <div className="space-y-4">
          {page?.content ? (
            <article className="prose prose-neutral max-w-none">
              <div dangerouslySetInnerHTML={{ __html: page.content }} />
            </article>
          ) : (
            <article className="prose prose-neutral max-w-none">
              <h2>Our Story</h2>
              <p>
                Ayam Jago Bakaran was founded in 2010 with a simple mission: to bring authentic Indonesian grilled chicken to food lovers everywhere. What started as a small food stall has grown into multiple locations across the country.
              </p>
              <p>
                Our secret recipe has been passed down through generations, combining traditional Indonesian spices with modern cooking techniques to create a unique and delicious flavor profile that keeps our customers coming back for
                more.
              </p>
              <h2>Our Commitment</h2>
              <p>
                We are committed to using only the freshest ingredients and highest quality chicken. Our signature marinade is made fresh daily, and our chicken is grilled to perfection over real charcoal to give it that authentic smoky
                flavor.
              </p>
              <p>
                At Ayam Jago Bakaran, we believe in providing not just great food, but also exceptional service. Our team is dedicated to ensuring that every customer has a memorable dining experience, whether they're eating in our
                restaurant or taking their food to go.
              </p>
            </article>
          )}
        </div>
      </div>

      <div className="mt-24 grid gap-8 md:grid-cols-3">
        <div className="text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary">
            <RotateCcwIcon color="white" />
            {/* <Image src="/placeholder.svg?height=40&width=40" alt="Fresh Ingredients" width={40} height={40} className="h-10 w-10" /> */}
          </div>
          <h3 className="mt-4 text-xl font-bold">Fresh Ingredients</h3>
          <p className="mt-2 text-muted-foreground">We use only the freshest ingredients in all our dishes.</p>
        </div>
        <div className="text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary">
            <CookingPot color="white" />
            {/* <Image src="/placeholder.svg?height=40&width=40" alt="Traditional Recipe" width={40} height={40} className="h-10 w-10" /> */}
          </div>
          <h3 className="mt-4 text-xl font-bold">Traditional Recipe</h3>
          <p className="mt-2 text-muted-foreground">Our recipes have been passed down through generations.</p>
        </div>
        <div className="text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary">
            <ShieldCheck color="white" />
            {/* <Image src="/placeholder.svg?height=40&width=40" alt="Quality Service" width={40} height={40} className="h-10 w-10" /> */}
          </div>
          <h3 className="mt-4 text-xl font-bold">Quality Service</h3>
          <p className="mt-2 text-muted-foreground">We are dedicated to providing exceptional service to our customers.</p>
        </div>
      </div>
    </div>
  );
}

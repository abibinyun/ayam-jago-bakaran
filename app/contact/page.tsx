import type { Metadata } from "next";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { ContactForm } from "@/components/contact-form";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Ayam Jago Bakaran",
};

export default async function ContactPage() {
  const supabase = createServerSupabaseClient();

  // Fetch site settings
  const { data: settings } = await supabase.from("site_settings").select("*").single();

  // Fetch locations
  const { data: locations } = await supabase.from("locations").select("*").eq("is_active", true);

  return (
    <div className="container py-12 md:py-24 mx-auto">
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Contact Us</h1>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">We'd love to hear from you. Get in touch with us.</p>
        </div>
      </div>

      <div className="mt-12 grid gap-8 md:grid-cols-2">
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold">Get In Touch</h2>
            <p className="mt-2 text-muted-foreground">Fill out the form and our team will get back to you as soon as possible.</p>
          </div>

          <ContactForm />
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold">Contact Information</h2>
            <p className="mt-2 text-muted-foreground">You can also reach us using the following contact details.</p>
          </div>

          <div className="space-y-4">
            {settings?.address && (
              <div className="flex items-start">
                <MapPin className="mr-4 h-6 w-6 text-primary" />
                <div>
                  <h3 className="font-medium">Address</h3>
                  <p className="text-muted-foreground">{settings.address}</p>
                </div>
              </div>
            )}

            {settings?.phone && (
              <div className="flex items-start">
                <Phone className="mr-4 h-6 w-6 text-primary" />
                <div>
                  <h3 className="font-medium">Phone</h3>
                  <p className="text-muted-foreground">{settings.phone}</p>
                </div>
              </div>
            )}

            {settings?.email && (
              <div className="flex items-start">
                <Mail className="mr-4 h-6 w-6 text-primary" />
                <div>
                  <h3 className="font-medium">Email</h3>
                  <p className="text-muted-foreground">{settings.email}</p>
                </div>
              </div>
            )}

            <div className="flex items-start">
              <Clock className="mr-4 h-6 w-6 text-primary" />
              <div>
                <h3 className="font-medium">Opening Hours</h3>
                <p className="text-muted-foreground">Monday - Friday: 10:00 AM - 10:00 PM</p>
                <p className="text-muted-foreground">Saturday - Sunday: 09:00 AM - 11:00 PM</p>
              </div>
            </div>
          </div>

          {locations && locations.length > 0 && (
            <div className="mt-8">
              <h2 className="text-2xl font-bold">Our Locations</h2>
              <div className="mt-4 space-y-4">
                {locations.map((location) => (
                  <div key={location.id} className="rounded-lg border p-4">
                    <h3 className="font-bold">{location.name}</h3>
                    <p className="text-muted-foreground">
                      {location.address}, {location.city}
                    </p>
                    {location.phone && <p className="text-muted-foreground">Phone: {location.phone}</p>}
                    {location.opening_hours && <p className="text-muted-foreground">Hours: {location.opening_hours}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

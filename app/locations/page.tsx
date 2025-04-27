import type { Metadata } from "next";
import Image from "next/image";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Locations",
  description: "Find Ayam Jago Bakaran restaurants near you",
};

export default async function LocationsPage() {
  const supabase = createServerSupabaseClient();

  // Fetch locations
  const { data: locations } = await supabase.from("locations").select("*").eq("is_active", true);

  return (
    <div className="container py-12 md:py-24 mx-auto">
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Locations</h1>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">Find Ayam Jago Bakaran restaurants near you.</p>
        </div>
      </div>

      {locations && locations.length > 0 ? (
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {locations.map((location) => (
            <Card key={location.id}>
              <CardHeader>
                <CardTitle>{location.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="mr-2 h-5 w-5 text-primary" />
                  <span className="text-muted-foreground">
                    {location.address}, {location.city}
                  </span>
                </div>

                {location.phone && (
                  <div className="flex items-center">
                    <Phone className="mr-2 h-5 w-5 text-primary" />
                    <span className="text-muted-foreground">{location.phone}</span>
                  </div>
                )}

                {location.email && (
                  <div className="flex items-center">
                    <Mail className="mr-2 h-5 w-5 text-primary" />
                    <span className="text-muted-foreground">{location.email}</span>
                  </div>
                )}

                {location.opening_hours && (
                  <div className="flex items-start">
                    <Clock className="mr-2 h-5 w-5 text-primary" />
                    <span className="text-muted-foreground">{location.opening_hours}</span>
                  </div>
                )}

                {location.latitude && location.longitude && (
                  <div className="mt-4 aspect-video w-full overflow-hidden rounded-md bg-muted">
                    <Image
                      src={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-s+e25822(${location.longitude},${location.latitude})/${location.longitude},${location.latitude},14,0/600x400?access_token=YOUR_MAPBOX_TOKEN`}
                      alt={`Map of ${location.name}`}
                      width={600}
                      height={400}
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <p className="text-muted-foreground">No locations available yet.</p>
        </div>
      )}
    </div>
  );
}

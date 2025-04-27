import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatCurrency } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Menu",
  description: "Explore our delicious menu at Ayam Jago Bakaran",
};

interface categoriesProps {
  id: string;
  name: string;
  description: string | null;
  image_url: string | null;
  slug: string;
  display_order: number | null;
  is_active: boolean | null;
  created_at: string;
  updated_at: string;
}

export default async function MenuPage() {
  // Fetch menu data from the API
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/menu`);

  const { categories, menuItems } = await response.json();

  // Group menu items by category
  const menuByCategory =
    menuItems?.reduce((acc: Record<string, typeof menuItems>, item: { category_id: string }) => {
      const categoryId = item.category_id || "uncategorized";
      if (!acc[categoryId]) {
        acc[categoryId] = [];
      }
      acc[categoryId].push(item);
      return acc;
    }, {}) || {};

  return (
    <div className="container py-12 md:py-24 mx-auto">
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Menu</h1>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">Explore our delicious menu featuring authentic Indonesian grilled chicken and more.</p>
        </div>
      </div>

      {categories && categories.length > 0 ? (
        <Tabs defaultValue={categories[0]?.id || "default"} className="mt-12">
          <TabsList className="flex w-full h-auto flex-wrap justify-start mb-8 bg-transparent">
            {categories.map((category: categoriesProps) => (
              <TabsTrigger key={category.id} value={category.id} className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full px-4 py-2 m-1">
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
          {categories.map((category: categoriesProps) => (
            <TabsContent key={category.id} value={category.id} className="pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {menuByCategory[category.id] ? (
                  menuByCategory[category.id]?.map((item: any) => (
                    <Card key={item.id}>
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
                        <CardTitle>{item.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">{item.description}</p>
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
                        <Button variant="outline" size="sm">
                          Order Now
                        </Button>
                      </CardFooter>
                    </Card>
                  ))
                ) : (
                  <div className="col-span-3 py-12 text-center">
                    <p className="text-muted-foreground">No menu items available in this category.</p>
                  </div>
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <p className="text-muted-foreground">No menu items available yet.</p>
          <Button asChild className="mt-4">
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      )}
    </div>
  );
}

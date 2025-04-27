import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Blog",
  description: "Latest news and updates from Ayam Jago Bakaran",
};

export default async function BlogPage() {
  const supabase = createServerSupabaseClient();

  // Fetch blog posts
  const { data: posts } = await supabase.from("blog_posts").select("*").eq("is_published", true).order("published_at", { ascending: false });

  return (
    <div className="container py-12 md:py-24 mx-auto">
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Blog</h1>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">Latest news, recipes, and updates from Ayam Jago Bakaran.</p>
        </div>
      </div>

      {posts && posts.length > 0 ? (
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Card key={post.id} className="overflow-hidden">
              <div className="aspect-video w-full overflow-hidden">
                {post.featured_image_url ? (
                  <Image src={post.featured_image_url || "/placeholder.svg"} alt={post.title} width={600} height={400} className="h-full w-full object-cover transition-all hover:scale-105" />
                ) : (
                  <div className="h-full w-full bg-muted flex items-center justify-center">
                    <span className="text-muted-foreground">No image</span>
                  </div>
                )}
              </div>
              <CardHeader>
                <CardTitle className="line-clamp-2">{post.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{post.published_at && formatDate(post.published_at)}</p>
                {post.excerpt && <p className="mt-2 line-clamp-3 text-muted-foreground">{post.excerpt}</p>}
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/blog/${post.slug}`}>Read More</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <p className="text-muted-foreground">No blog posts available yet.</p>
          <Button asChild className="mt-4">
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      )}
    </div>
  );
}

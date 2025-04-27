import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const supabase = createServerSupabaseClient();
  const { data: blog_posts } = await supabase.from("blog_posts").select("*").eq("slug", slug).eq("is_published", true).single();

  if (!blog_posts) return { title: "Post Not Found" };

  return {
    title: blog_posts.meta_title || blog_posts.title,
    description: blog_posts.meta_description || blog_posts.excerpt,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const supabase = createServerSupabaseClient();
  const { data: blog_posts } = await supabase.from("blog_posts").select("*").eq("slug", slug).eq("is_published", true).single();

  if (!blog_posts) notFound();

  return (
    <div className="container py-12 md:py-24 mx-auto">
      <div className="mx-auto max-w-3xl">
        <Button variant="ghost" size="sm" className="mb-6" asChild>
          <Link href="/blog">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>
        </Button>

        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{blog_posts?.title}</h1>

        <div className="mt-4 flex items-center text-sm text-muted-foreground">
          <time dateTime={blog_posts?.published_at || blog_posts?.created_at}>{formatDate(blog_posts?.published_at || blog_posts?.created_at)}</time>
          {blog_posts?.author && (
            <>
              <span className="mx-2">•</span>
              <span>By {blog_posts?.author.email}</span>
            </>
          )}
        </div>

        {blog_posts?.featured_image_url && (
          <div className="mt-8 aspect-video w-full overflow-hidden rounded-lg">
            <Image src={blog_posts?.featured_image_url} alt={blog_posts?.title} width={1200} height={675} className="h-full w-full object-cover" priority />
          </div>
        )}

        <div className="mt-8 prose prose-slate max-w-none">{blog_posts?.content ? <div dangerouslySetInnerHTML={{ __html: blog_posts?.content }} /> : <p>No content available.</p>}</div>
      </div>
    </div>
  );
}

import type { MetadataRoute } from "next"
import { createServerSupabaseClient } from "@/lib/supabase/server"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://ayamjagobakaran.com"
  const supabase = createServerSupabaseClient()

  // Get all blog posts
  const { data: posts } = await supabase.from("blog_posts").select("slug, updated_at").eq("is_published", true)

  // Get all menu categories
  const { data: categories } = await supabase.from("menu_categories").select("slug, updated_at").eq("is_active", true)

  // Get all menu items
  const { data: menuItems } = await supabase.from("menu_items").select("slug, updated_at").eq("is_available", true)

  // Static routes
  const routes = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/menu`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/locations`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ]

  // Add blog posts to sitemap
  const postRoutes =
    posts?.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.updated_at),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })) || []

  // Add menu categories to sitemap
  const categoryRoutes =
    categories?.map((category) => ({
      url: `${baseUrl}/menu/${category.slug}`,
      lastModified: new Date(category.updated_at),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })) || []

  // Add menu items to sitemap
  const menuItemRoutes =
    menuItems?.map((item) => ({
      url: `${baseUrl}/menu/item/${item.slug}`,
      lastModified: new Date(item.updated_at),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })) || []

  return [...routes, ...postRoutes, ...categoryRoutes, ...menuItemRoutes]
}

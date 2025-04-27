// app/api/menu/route.ts

import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from "@/lib/supabase/server";

function generateSlug(name: string): string {
  return name
    .toLowerCase() // Ubah menjadi huruf kecil
    .replace(/[^a-z0-9\s-]/g, "") // Hapus karakter selain huruf, angka, dan spasi
    .replace(/\s+/g, "-") // Ganti spasi dengan tanda hubung
    .replace(/-+/g, "-") // Ganti beberapa tanda hubung berturut-turut menjadi satu
    .trim();
}

export async function POST(req: Request) {
  const supabase = createServerSupabaseClient();
  const { name, description, price, sale_price, image_url, is_featured, is_available, display_order, category_id }: {
    name: string;
    description: string;
    price: number;
    sale_price: number;
    image_url: string;
    is_featured: boolean;
    is_available: boolean;
    display_order: number;
    category_id: string;
  } = await req.json();

  const slug = generateSlug(name);

  const { data, error } = await supabase
    .from('menu_items')
    .insert([
      {
        name,
        description,
        price,
        sale_price,
        image_url,
        is_featured,
        is_available,
        slug,
        display_order,
        category_id
      }
    ]);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json(data, { status: 201 });
}

export async function GET() {
  const supabase = createServerSupabaseClient();
  try {
    // Fetch menu categories
    const { data: categories, error: categoryError } = await supabase
      .from("menu_categories")
      .select("*")
      .eq("is_active", true)
      .order("display_order", { ascending: true });

    if (categoryError) throw new Error(categoryError.message);

    // Fetch menu items
    const { data: menuItems, error: menuError } = await supabase
      .from("menu_items")
      .select("*, menu_categories(name, slug)")
      .eq("is_available", true);

    if (menuError) throw new Error(menuError.message);

    return NextResponse.json({ categories, menuItems }, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
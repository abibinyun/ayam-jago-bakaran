// app/api/menu/[id]/route.ts

import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from "@/lib/supabase/server";


export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const supabase = createServerSupabaseClient();
  const { id } = params;
  const { name, description, price, sale_price, image_url, is_featured, is_available, slug, display_order, category_id }: {
    name: string;
    description: string;
    price: number;
    sale_price: number;
    image_url: string;
    is_featured: boolean;
    is_available: boolean;
    slug: string;
    display_order: number;
    category_id: string;
  } = await req.json();

  const { data, error } = await supabase
    .from('menu_items')
    .update({
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
    })
    .eq('id', id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json(data, { status: 200 });
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const supabase = createServerSupabaseClient();
    const { id } = params;
  
    const { data, error } = await supabase.from('menu_items').delete().eq('id', id);
  
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
  
    return NextResponse.json(data, { status: 200 });
  }

  export async function GET(req: Request, { params }: { params: { id: string } }) {
    const { id } = await params;
    
    // Membuat koneksi ke Supabase
    const supabase = createServerSupabaseClient();
    
    try {
      // Query untuk mengambil menu berdasarkan ID
      const { data, error } = await supabase
        .from("menu_items")
        .select("*")
        .eq("id", id)
        .single(); // Mengambil satu data berdasarkan ID
  
      if (error) {
        // Jika ada error dalam query
        return NextResponse.json(
          { message: error.message },
          { status: 400 }
        );
      }
  
      if (!data) {
        // Jika tidak ditemukan data dengan ID tersebut
        return NextResponse.json(
          { message: "Menu not found" },
          { status: 404 }
        );
      }
  
      // Mengembalikan data menu yang ditemukan
      return NextResponse.json(data);
    } catch (error) {
      // Menangani kesalahan lainnya
      return NextResponse.json(
        { message: "Something went wrong" },
        { status: 500 }
      );
    }
  }
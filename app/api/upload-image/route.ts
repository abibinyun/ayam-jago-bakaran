import { createServerSupabaseClient } from '@/lib/supabase/server'; // Ganti dengan konfigurasi Supabase Anda

export async function POST(req: Request) {
  const supabase = createServerSupabaseClient();

  try {
    // Ambil file dari request
    const formData = await req.formData();
    const file: any = formData.get('file'); // Ambil file yang dikirim

    if (!file) {
      return new Response(
        JSON.stringify({ error: 'No file provided' }),
        { status: 400 }
      );
    }

    // Upload file ke Supabase Storage
    const { error } = await supabase
      .storage
      .from('assets') // Ganti dengan nama bucket yang sesuai
      .upload(`img/${file.name}`, file, { upsert: true });

    if (error) {
      return new Response(
        JSON.stringify({ error: error.message }),
        { status: 400 }
      );
    }

    // Jika Anda hanya ingin public URL tanpa Signed URL
    const imageUrl = `${process.env.SUPABASE_URL}/storage/v1/object/public/assets/img/${file.name}`;

    return new Response(
      JSON.stringify({ imageUrl }), // Kembalikan URL yang dihasilkan
      { status: 200 }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500 }
    );
  }
}

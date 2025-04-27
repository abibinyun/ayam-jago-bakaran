import { notFound } from "next/navigation";
import MenuForm from "./components/MenuForm"; // Komponen client untuk form

export default async function EditMenuPage({ params }: { params: { id: string } }) {
  const { id } = await params;

  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/menu/${id}`);
  const data = await response.json();

  // Jika menu tidak ditemukan, tampilkan 404
  if (!data) {
    notFound(); // Mengarahkan ke halaman 404 jika data tidak ditemukan
  }

  return (
    <div className="container py-12 md:py-24 mx-auto">
      <h1 className="text-3xl font-bold">Edit Menu</h1>
      <MenuForm menuItem={data} />
    </div>
  );
}

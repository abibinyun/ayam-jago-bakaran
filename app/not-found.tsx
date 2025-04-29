import Image from "next/image";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 text-center">
      <div>
        <h1 className="text-5xl font-bold text-red-500 mb-4">404</h1>
        <Image src={"/logo-ayam-jago-bakaran.webp"} width={300} height={300} alt="logo ayam jago bakaran" className="mx-auto" />
        <p className="text-xl text-gray-700 mb-6">Halaman tidak ditemukan / Dalam perbaikan</p>
        <a href="/" className="text-blue-600 underline">
          Kembali ke Beranda
        </a>
      </div>
    </div>
  );
}

// /app/error.tsx
"use client";

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center flex-col bg-red-50 text-center">
      <h1 className="text-3xl font-bold text-red-600 mb-2">Terjadi Kesalahan Global</h1>
      <p className="text-gray-700 mb-4">{error.message}</p>
      <button onClick={reset} className="bg-red-500 text-white px-4 py-2 rounded">
        Coba Lagi
      </button>
    </div>
  );
}

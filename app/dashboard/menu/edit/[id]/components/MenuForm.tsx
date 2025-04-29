"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function MenuForm({ menuItem }: { menuItem: any }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: menuItem.name || "",
    category_id: menuItem.category_id || "",
    description: menuItem.description || "",
    price: menuItem.price || 0,
    sale_price: menuItem.sale_price || 0,
    image_url: menuItem.image_url || "",
    is_featured: menuItem.is_featured || false,
    is_available: menuItem.is_available || true,
    display_order: menuItem.display_order || 0,
  });

  const [uploading, setUploading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const method = menuItem.id ? "PUT" : "POST";
    const url = menuItem.id ? `/api/menu/${menuItem.id}` : "/api/menu";

    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    if (response.ok) {
      router.push("/dashboard/menu");
    } else {
      console.error("Error saving menu", data.error || "Something went wrong");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formDataUpload = new FormData();
    formDataUpload.append("file", file);

    const response = await fetch("/api/upload-image", {
      method: "POST",
      body: formDataUpload,
    });

    const data = await response.json();
    setUploading(false);

    if (response.ok) {
      setFormData((prev) => ({ ...prev, image_url: data.imageUrl }));
    } else {
      console.error("Error uploading image", data.error || "Something went wrong");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 mt-6">
      <Input name="name" value={formData.name} onChange={handleChange} required />
      <Textarea name="description" value={formData.description} onChange={handleChange} required />
      <Input name="price" type="number" value={formData.price} onChange={handleChange} required />
      <Input name="sale_price" type="number" value={formData.sale_price} onChange={handleChange} />

      {/* Gambar dan Upload */}
      <div className="space-y-2">
        <label className="block font-semibold">Image</label>

        {formData.image_url && <img src={formData.image_url} alt="Current Image" className="w-32 h-32 object-cover rounded-md border" />}

        <Input type="file" accept="image/*" onChange={handleFileChange} />
        {uploading && <p className="text-sm text-gray-500">Uploading...</p>}
      </div>

      {/* Hidden, tetap perlu agar submit data */}
      <Input name="image_url" value={formData.image_url} onChange={handleChange} className="hidden" />

      <div className="flex items-center gap-4">
        <label>Featured</label>
        <input type="checkbox" name="is_featured" checked={formData.is_featured} onChange={() => setFormData({ ...formData, is_featured: !formData.is_featured })} />
      </div>
      <div className="flex items-center gap-4">
        <label>Available</label>
        <input type="checkbox" name="is_available" checked={formData.is_available} onChange={() => setFormData({ ...formData, is_available: !formData.is_available })} />
      </div>
      <Input name="display_order" type="number" value={formData.display_order} onChange={handleChange} />

      <Button type="submit" disabled={uploading}>
        {menuItem.id ? "Save Changes" : "Create Menu"}
      </Button>
    </form>
  );
}

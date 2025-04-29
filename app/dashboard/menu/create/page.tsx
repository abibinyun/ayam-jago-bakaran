"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function CreateMenuPage() {
  const router = useRouter();
  const [menuItem, setMenuItem] = useState({
    name: "",
    category_id: "",
    description: "",
    price: 0,
    sale_price: 0,
    image_url: "",
    is_featured: false,
    is_available: true,
    display_order: 0,
  });

  const [uploading, setUploading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setMenuItem({ ...menuItem, [e.target.name]: e.target.value });
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
      setMenuItem((prev) => ({ ...prev, image_url: data.imageUrl }));
    } else {
      console.error("Error uploading image", data.error || "Something went wrong");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("/api/menu", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(menuItem),
    });

    const data = await response.json();

    if (response.ok) {
      router.push("/dashboard/menu");
    } else {
      console.error("Error saving menu", data.error || "Something went wrong");
    }
  };

  return (
    <div className="container py-12 md:py-24 mx-auto">
      <h1 className="text-3xl font-bold mb-6">Create Menu</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input name="name" value={menuItem.name} onChange={handleChange} required />
        </div>

        <div>
          <Label htmlFor="category_id">Category</Label>
          <Input name="category_id" value={menuItem.category_id} onChange={handleChange} required />
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea name="description" value={menuItem.description} onChange={handleChange} required />
        </div>

        <div>
          <Label htmlFor="price">Price</Label>
          <Input name="price" type="number" value={menuItem.price} onChange={handleChange} required />
        </div>

        <div>
          <Label htmlFor="sale_price">Sale Price</Label>
          <Input name="sale_price" type="number" value={menuItem.sale_price} onChange={handleChange} />
        </div>

        {/* Upload Image */}
        <div className="space-y-2">
          <Label htmlFor="image">Image</Label>

          {menuItem.image_url && <img src={menuItem.image_url} alt="Preview" className="w-32 h-32 object-cover rounded-md border" />}

          <Input type="file" accept="image/*" onChange={handleFileChange} />
          {uploading && <p className="text-sm text-gray-500">Uploading...</p>}
        </div>

        {/* Hidden input tetap perlu supaya image_url terikat ke form */}
        <Input name="image_url" value={menuItem.image_url} onChange={handleChange} className="hidden" />

        <div className="flex items-center gap-4">
          <Label htmlFor="is_featured">Featured</Label>
          <input type="checkbox" name="is_featured" checked={menuItem.is_featured} onChange={() => setMenuItem({ ...menuItem, is_featured: !menuItem.is_featured })} />
        </div>

        <div className="flex items-center gap-4">
          <Label htmlFor="is_available">Available</Label>
          <input type="checkbox" name="is_available" checked={menuItem.is_available} onChange={() => setMenuItem({ ...menuItem, is_available: !menuItem.is_available })} />
        </div>

        <div>
          <Label htmlFor="display_order">Display Order</Label>
          <Input name="display_order" type="number" value={menuItem.display_order} onChange={handleChange} />
        </div>

        <Button type="submit" disabled={uploading}>
          Create Menu
        </Button>
      </form>
    </div>
  );
}

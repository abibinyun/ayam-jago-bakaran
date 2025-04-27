"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
// import { toast } from 'react-toastify'; // Sesuaikan dengan UI toast jika diperlukan

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

    console.log("data: ", data);
    if (response.ok) {
      // toast.success('Menu saved successfully!');
      router.push("/dashboard/menu"); // Redirect setelah berhasil
    } else {
      // toast.error(data.error || 'Something went wrong!');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setMenuItem({ ...menuItem, [e.target.name]: e.target.value });
  };

  return (
    <div className="container py-12 md:py-24 mx-auto">
      <h1 className="text-3xl font-bold">Create Menu</h1>

      <form onSubmit={handleSubmit} className="space-y-4 mt-6">
        <Label htmlFor="name">Name</Label>
        <Input name="name" value={menuItem.name} onChange={handleChange} required />

        <Label htmlFor="category_id">Category</Label>
        <Input name="category_id" value={menuItem.category_id} onChange={handleChange} required />

        <Label htmlFor="description">Description</Label>
        <Textarea name="description" value={menuItem.description} onChange={handleChange} required />

        <Label htmlFor="price">Price</Label>
        <Input name="price" type="number" value={menuItem.price} onChange={handleChange} required />

        <Label htmlFor="sale_price">Sale Price</Label>
        <Input name="sale_price" type="number" value={menuItem.sale_price} onChange={handleChange} />

        <Label htmlFor="image_url">Image</Label>
        <Input name="image_url" value={menuItem.image_url} onChange={handleChange} />
        <div className="flex items-center gap-4">
          <Label htmlFor="Featured">Featured</Label>
          <input type="checkbox" name="is_featured" checked={menuItem.is_featured} onChange={() => setMenuItem({ ...menuItem, is_featured: !menuItem.is_featured })} />
        </div>
        <div className="flex items-center gap-4">
          <Label htmlFor="available">Available</Label>
          <input type="checkbox" name="is_available" checked={menuItem.is_available} onChange={() => setMenuItem({ ...menuItem, is_available: !menuItem.is_available })} />
        </div>
        <Label htmlFor="display_order">Display</Label>
        <Input name="display_order" type="number" value={menuItem.display_order} onChange={handleChange} />

        <Button type="submit">Create Menu</Button>
      </form>
    </div>
  );
}

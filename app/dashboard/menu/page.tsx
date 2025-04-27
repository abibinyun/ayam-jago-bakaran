"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@/components/ui/table"; // Sesuaikan dengan UI komponen Anda

export default function MenuPageDashboard() {
  const [menuItems, setMenuItems] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch menu items from API
  const fetchMenuItems = async () => {
    try {
      const response = await fetch("/api/menu"); // Ganti dengan URL API yang sesuai
      if (!response.ok) {
        throw new Error("Failed to fetch menu items");
      }
      const data = await response.json();
      setMenuItems(data.menuItems);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenuItems();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container py-12 md:py-24 mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Menu Dashboard</h1>
        <Link href="/dashboard/menu/create">
          <Button>Create Menu</Button>
        </Link>
      </div>

      <Table className="w-full">
        <TableHead className="w-full">
          <TableRow className="w-full">
            <TableCell>Name</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Available</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {menuItems.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.category_name || item.category_id}</TableCell> {/* Assuming you need category name */}
              <TableCell>{item.price}</TableCell>
              <TableCell>{item.is_available ? "Yes" : "No"}</TableCell> {/* Conditional display */}
              <TableCell>
                <Link href={`/dashboard/menu/edit/${item.id}`}>
                  <Button>Edit</Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

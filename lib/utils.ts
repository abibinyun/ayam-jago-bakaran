import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount)
}

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "")
}

// export function formatDate(date: string | Date): string {
//   return new Intl.DateTimeFormat("id-ID", {
//     year: "numeric",
//     month: "long",
//     day: "numeric",
//   }).format(new Date(date))
// }

export function formatDate(date: string | Date | null | undefined): string {
  // Handle null/undefined cases
  if (!date) return "No date available";
  
  // Convert to Date object if it's a string
  const dateObj = typeof date === "string" ? new Date(date) : date;
  
  // Check if the date is valid
  if (isNaN(dateObj.getTime())) {
    console.error("Invalid date value:", date);
    return "Invalid date";
  }

  // Format the valid date
  return new Intl.DateTimeFormat("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(dateObj);
}
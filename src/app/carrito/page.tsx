// src/app/carrito/page.tsx
import ResumenCarrito from "@/components/ResumenCarrito";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Carrito de Compras",
  robots: {
    index: false,
    follow: false,
  },
};

export default function CarritoPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 min-h-[70vh]">
      <ResumenCarrito />
    </div>
  );
}
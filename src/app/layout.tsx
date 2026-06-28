// src/app/layout.tsx
import React, { ReactNode } from "react";
import { Toaster } from "react-hot-toast"; // 1. Importación
import { GlobalProvider } from "@/context/GlobalContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body className="min-h-screen flex flex-col">
        <GlobalProvider>
          <Header />
          <main className="grow">{children}</main>
          <Footer />
          
          {/* 2. Toaster configurado para aparecer en todas las páginas */}
          <Toaster 
            position="bottom-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#333',
                color: '#fff',
              },
            }}
          />
        </GlobalProvider>
      </body>
    </html>
  );
}
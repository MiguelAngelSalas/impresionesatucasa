// src/app/layout.tsx
import React, { ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import { GlobalProvider } from "@/context/GlobalContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Metadata } from "next";
import Script from "next/script"; // Importante para scripts externos
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Impresiones Online y Foto a Domicilio | Envíos a todo el País",
    template: "%s | Impresiones a tu Casa",
  },
  description: "Subí tus archivos PDF online y recibí tus impresiones, apuntes de facultad o cuadernillos directo en tu casa en cualquier provincia de Argentina. ¡Económico y rápido!",
  keywords: ["impresiones online argentina", "fotocopias a domicilio", "imprimir pdf online", "apuntes facultad envio a domicilio"],
  alternates: {
    canonical: "https://www.impresionesatucasa.com.ar",
  },
  openGraph: {
    title: "Impresiones a tu Casa - Envíos a todo el País",
    description: "Subí tus PDFs y recibí tus apuntes o fotocopias en tu casa sin moverte.",
    url: "https://impresionesatucasa.com.ar",
    siteName: "Impresiones a tu Casa",
    locale: "es_AR",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <head>
        {/* Script de Mercado Pago cargado de forma optimizada */}
        <Script 
          src="https://sdk.mercadopago.com/js/v2" 
          strategy="lazyOnload" 
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <GlobalProvider>
          <Header />
          <main className="grow">{children}</main>
          <Footer />
          
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
// src/app/layout.tsx
import React, { ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import { GlobalProvider } from "@/context/GlobalContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";

export const metadata: Metadata = {
  title: {
    default: "Impresión de Planchas de Stickers, tarjetas y Fotos | Envíos a Domicilio",
    template: "%s | Impresiones a tu Casa",
  },
  description: "Impresión de planchas de stickers, etiquetas y fotos en alta calidad. Subí tu PDF (A4) y recibilo en tu domicilio. Ideal para emprendedores. Envíos a todo el país y Zona Sur.",
  keywords: [
    "impresion de stickers", 
    "planchas de etiquetas", 
    "impresion de fotos", 
    "imprimir pdf fotografico", 
    "imprimir diseños de canva", 
    "imprenta cerca", 
    "zona sur",
    "stickers emprendedores"
  ],
  alternates: {
    canonical: "https://www.impresionesatucasa.com.ar", 
  },
  openGraph: {
    title: "Impresión de Planchas de Stickers, Fotos y Etiquetas",
    description: "Subí tu PDF con tus diseños y nosotros te lo imprimimos en papel fotografico premium o autoadhesivo. Ideal para emprendedores y creativos.",
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
        <Script 
          src="https://sdk.mercadopago.com/js/v2" 
          strategy="lazyOnload" 
        />
        {/* 1. Google Tag (gtag.js) - Google Ads */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=AW-18301421416"
        />

        {/* 2. Inicialización de Google Ads */}
        <Script
          id="google-ads-config"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-18301421416');
            `,
          }}
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
        <GoogleAnalytics gaId="G-69YDPEXR7Q"/>
      </body>
    </html>
  );
}
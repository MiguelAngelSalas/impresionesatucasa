"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Sparkles, CheckCircle2, MessageCircle, ArrowRight, ShieldCheck, Tag, Image as ImageIcon } from "lucide-react";
import preciosPorPapel from "@/utilidades/preciosPorPapel";

export default function PaginaPapelFotoFino() {
  const numeroWhatsapp = "5491123909529";
  const mensajeWsp = encodeURIComponent("Hola! Quisiera consultar para imprimir en Papel Fotográfico Fino 140 Grs.");

  // Obtenemos únicamente el papel Foto Fino (140 Grs)
  const papelFotoFino = preciosPorPapel.find((p) => p.id === "fotoFino");
  const precioPapel = papelFotoFino?.precio || 1265;

  // Estado para la rotación 3D interactiva
  const [rotacion, setRotacion] = useState({ x: 0, y: 0 });

  const manejarMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - card.left; 
    const y = e.clientY - card.top;
    
    const centerX = card.width / 2;
    const centerY = card.height / 2;

    const rotateX = ((y - centerY) / centerY) * -15;
    const rotateY = ((x - centerX) / centerX) * 15;

    setRotacion({ x: rotateX, y: rotateY });
  };

  const manejarMouseLeave = () => {
    setRotacion({ x: 0, y: 0 });
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 items-start justify-center max-w-6xl mx-auto px-4 py-10">
      
      {/* TARJETA PRINCIPAL */}
      <div className="flex-1 w-full max-w-2xl bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg border border-violet-100 dark:border-slate-700 transition-colors duration-300 mx-auto">
        
        {/* BADGE DE CALIDAD */}
        <div className="flex justify-center mb-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-100 dark:bg-violet-950 text-violet-700 dark:text-violet-300 text-xs font-bold uppercase tracking-wide border border-violet-200 dark:border-violet-800">
            <ImageIcon className="w-3.5 h-3.5" /> Gramaje 140 Grs - Glossy Liviano
          </span>
        </div>

        {/* TÍTULO PRINCIPAL */}
        <h2 className="text-2xl sm:text-3xl font-bold text-violet-700 dark:text-violet-400 mb-3 text-center">
          Papel Fotográfico Fino (140 Grs)
        </h2>
        
        <p className="text-slate-600 dark:text-slate-300 text-center text-sm mb-6">
          Un papel fotográfico flexible y ultra liviano. Perfecto para volantes de alta gama, folletos promocionales, inserciones en packaging y láminas de gran definición cromática a un precio accesible.
        </p>

        {/* MUESTRA INTERACTIVA 3D DE LA HOJA A4 VERTICAL */}
        <div className="mb-8 perspective-[1000px] flex flex-col items-center">
          <div
            onMouseMove={manejarMouseMove}
            onMouseLeave={manejarMouseLeave}
            style={{
              transform: `rotateX(${rotacion.x}deg) rotateY(${rotacion.y}deg)`,
            }}
            className="relative w-64 aspect-[1/1.414] rounded-xl overflow-hidden shadow-2xl border-2 border-violet-200 dark:border-slate-600 transition-transform duration-150 ease-out cursor-pointer group"
          >
            {/* Imagen A4 Vertical (/public/foto-fino.webp) */}
            <Image
              src="/global-fotoFino-140grA4.jpg" 
              alt="Muestra de Papel Fotográfico Fino 140 Grs"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 256px"
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />

            <div className="absolute inset-0 bg-linear-to-tr from-transparent via-white/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </div>
        </div>

        <div className="space-y-6">
          
          {/* GRILLA DE ESPECIFICACIONES */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-700/50 border border-violet-100 dark:border-slate-600 space-y-1">
              <h3 className="font-bold text-slate-800 dark:text-slate-200 text-sm flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-violet-600 dark:text-violet-400" /> Gran Brillo Glossy
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Resalta colores vibrantes e imágenes complejas con la mejor terminación satinada.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-700/50 border border-violet-100 dark:border-slate-600 space-y-1">
              <h3 className="font-bold text-slate-800 dark:text-slate-200 text-sm flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Económico y Flexible
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Cuerpo liviano ideal para plegar, envolver o distribuir en cantidad sin perder calidad.
              </p>
            </div>
          </div>

          {/* BLOQUE DE PRECIO EXCLUSIVO */}
          <div className="p-4 rounded-xl bg-violet-50/50 dark:bg-slate-700/30 border border-violet-200 dark:border-slate-600 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-violet-100 dark:bg-violet-900/50 text-violet-700 dark:text-violet-300">
                <Tag className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-slate-500 dark:text-slate-400 block font-medium">Precio por hoja A4</span>
                <span className="text-xs text-violet-600 dark:text-violet-400 font-semibold">Foto Fino (140 Grs)</span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-2xl font-black text-slate-800 dark:text-slate-100">
                ${precioPapel.toLocaleString('es-AR')}
              </span>
            </div>
          </div>

          {/* BOTONES DE ACCIÓN */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Link 
              href="/upload" 
              className="flex-1 bg-violet-600 hover:bg-violet-700 text-white font-bold py-3 px-4 rounded-xl shadow-md transition-all duration-200 text-center flex items-center justify-center gap-2 text-sm"
            >
              Ir al Formulario De Envio <ArrowRight className="w-4 h-4" />
            </Link>

            <a 
              href={`https://wa.me/${numeroWhatsapp}?text=${mensajeWsp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-4 rounded-xl shadow-md transition-all duration-200 text-center flex items-center justify-center gap-2 text-sm"
            >
              <MessageCircle className="w-4 h-4" /> Consultar por WhatsApp
            </a>
          </div>

        </div>
      </div>

    </div>
  );
}
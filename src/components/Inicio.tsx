"use client"; // Es interactivo, lo necesita porque usa useState

import { useState } from 'react';
import Consultas from '@/components/Consultas'; 
import { FileUp } from 'lucide-react';

// 1. Definimos la estructura de una Resma para que TypeScript sea feliz
interface Resma {
  id: string;
  nombre: string;
  descripcion: string;
  imagen: string;
}

const resmas: Resma[] = [
  { id: "mateFino", nombre: "Mate fino 110 Grs", descripcion: "Ideal para impresiones suaves, flyers y papelería económica.", imagen: "./global-matefino-110grA4.jpg" },
  { id: "mateGrueso", nombre: "Mate grueso 210 Grs", descripcion: "Perfecto para tarjetas de presentación, invitaciones y gráficas con cuerpo.", imagen: "global-mateGruesoSimple-210grA4.webp" },
  { id: "mateBifaz", nombre: "Mate bifaz 200 Grs", descripcion: "Impresión doble faz sin transparencias. Ideal catálogos o folletos.", imagen: "arjet-mateBifaz-200grA4.webp" },
  { id: "fotoFino", nombre: "Foto fino 140 Grs", descripcion: "Acabado brillante para resaltar colores en fotos o catálogos livianos.", imagen: "global-fotoFino-140grA4.jpg" },
  { id: "fotoGrueso", nombre: "Foto grueso 200 Grs", descripcion: "Alta calidad fotográfica. Excelente para cuadros y fotos sueltas.", imagen: "arjet-fotoGrueso-200grA4.webp" },
  { id: "fotoPremium", nombre: "Foto premium 260 Grs", descripcion: "Acabado superior y rígido para fotografías de alta definición y retratos.", imagen: "global-fotoPremium-260grA4.jpg" },
  { id: "autoadhesivo", nombre: "Autoadhesivo 135 Grs", descripcion: "Ideal para imprimir tus planchas de stickers y etiquetas personalizadas.", imagen: "global-autadhesivo-135grA4.webp" },
  { id: "autoadhesivoPremium", nombre: "Autoadhesivo premium 115 Grs", descripcion: "Stickers de alta calidad con mejor adherencia para el packaging de tu marca.", imagen: "arjet-autoadhesivoPremium-115grA4.webp" },
  { id: "autoadhesivoResistente", nombre: "Autoadhesivo resistente 88 Mic.", descripcion: "Etiquetas duraderas que soportan la humedad. Perfectas para frascos o envases.", imagen: "arjet-filmiloBlancoResistente-88micronesA4.webp" },
];

export default function Inicio() {
  // 2. Usamos el tipo Resma | null en el estado
  const [resmaSeleccionada, setResmaSeleccionada] = useState<Resma | null>(null);

  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 transition-colors duration-300">
      
      <div className="bg-white dark:bg-slate-800 border border-violet-200 dark:border-slate-700 rounded-xl shadow-lg dark:shadow-black/40 p-6 sm:p-8 text-center transition-all duration-300 hover:shadow-xl mb-10">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-violet-800 dark:text-violet-400 tracking-tight transition-colors duration-300">
          Impresión en Planchas de Stickers, Fotos y Etiquetas en <span className="text-violet-600 dark:text-violet-300 block sm:inline">Alta Calidad</span>
        </h1>
        
        <p className="text-base sm:text-lg text-gray-700 dark:text-slate-300 mb-4 max-w-3xl mx-auto transition-colors duration-300">
          ¿Tenés tus diseños armados en Canva o Illustrator? Subí tu archivo PDF, elegí el papel fotográfico o autoadhesivo que necesites, y te lo mandamos impreso a tu domicilio.
        </p>
        
        <div className="inline-block bg-violet-50 dark:bg-slate-900/50 border border-violet-100 dark:border-violet-900 rounded-lg p-3 mt-2 mb-4">
          <p className="text-sm sm:text-base text-violet-700 dark:text-violet-300 font-medium transition-colors duration-300">
            📌 Recordatorio: Para garantizar la mejor resolución, aceptamos únicamente archivos en formato PDF (Tamaño A4).
          </p>
        </div>

        <div className="mb-4">
          <a
            href="/upload"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-bold text-white bg-violet-600 rounded-xl shadow-lg hover:bg-violet-700 hover:shadow-violet-500/25 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-violet-300 dark:focus:ring-violet-800"
          >
            <FileUp className="w-6 h-6" />
            <span>Subir mi archivo PDF</span>
          </a>
        </div>

        <p className="text-sm text-gray-500 dark:text-slate-400 mt-2 transition-colors duration-300">
          Envíos a todo el país y entregas rápidas en Zona Sur.
        </p>
      </div>

      <div className="overflow-x-auto">
        <h2 className="text-xl sm:text-2xl font-semibold text-violet-700 dark:text-violet-400 mb-4 text-center transition-colors duration-300">
          Tipos de Papeles Especiales para tus Diseños
        </h2>
        <div className="flex space-x-4 pb-4">
          {resmas.map((resma) => (
            <button
              key={resma.id}
              onClick={() => setResmaSeleccionada(resma)}
              className="min-w-55 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-lg p-4 shadow-md shrink-0 transition transform hover:scale-105 text-left focus:outline-none focus:ring-2 focus:ring-violet-400 dark:focus:ring-violet-500"
            >
              <h3 className="text-md font-semibold text-gray-800 dark:text-slate-200 mb-1 transition-colors duration-300">{resma.nombre}</h3>
              <p className="text-sm text-gray-600 dark:text-slate-400 transition-colors duration-300">{resma.descripcion}</p>
            </button>
          ))}
        </div>
      </div>

      {resmaSeleccionada && (
        <div className="mt-8 bg-gray-50 dark:bg-slate-900/50 border border-gray-200 dark:border-slate-700 rounded-lg p-6 shadow-inner text-center transition-colors duration-300">
          <h2 className="text-xl font-bold text-violet-700 dark:text-violet-400 mb-4 transition-colors duration-300">{resmaSeleccionada.nombre}</h2>
          <p className="text-gray-700 dark:text-slate-300 mb-4 transition-colors duration-300">{resmaSeleccionada.descripcion}</p>
          <div className="bg-white dark:bg-slate-800 p-2 inline-block rounded-md shadow-sm transition-colors duration-300">
             <img
               src={resmaSeleccionada.imagen}
               alt={`Ejemplo de impresión en papel ${resmaSeleccionada.nombre}`}
               className="mx-auto max-w-xs rounded-md shadow"
             />
          </div>
        </div>
      )}

      <div className="mt-16">
        <Consultas />
      </div>
    </section>
  );
}
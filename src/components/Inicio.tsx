"use client"; // Es interactivo, lo necesita porque usa useState

import { useState } from 'react';
import Consultas from '@/components/Consultas'; 

// 1. Definimos la estructura de una Resma para que TypeScript sea feliz
interface Resma {
  id: string;
  nombre: string;
  descripcion: string;
  imagen: string;
}

const resmas: Resma[] = [
  { id: "mateFino", nombre: "Mate fino 110 Grs", descripcion: "Ideal para impresiones suaves y económicas.", imagen: "./global-matefino-110grA4.jpg" },
  { id: "mateGrueso", nombre: "Mate grueso 210 Grs", descripcion: "Perfecto para presentaciones con cuerpo y textura.", imagen: "global-mateGruesoSimple-210grA4.webp" },
  { id: "mateBifaz", nombre: "Mate bifaz 200 Grs", descripcion: "Impresión doble faz sin transparencias.", imagen: "arjet-mateBifaz-200grA4.webp" },
  { id: "fotoFino", nombre: "Foto fino 140 Grs", descripcion: "Acabado brillante, ideal para flyers y fotos.", imagen: "global-fotoFino-140grA4.jpg" },
  { id: "fotoGrueso", nombre: "Foto grueso 200 Grs", descripcion: "Alta calidad para impresiones premium.", imagen: "arjet-fotoGrueso-200grA4.webp" },
  { id: "fotoPremium", nombre: "Foto premium 260 Grs", descripcion: "Acabado superior para fotos de alta definición.", imagen: "global-fotoPremium-260grA4.jpg" },
  { id: "autoadhesivo", nombre: "Autoadhesivo 135 Grs", descripcion: "Pegatina estándar para etiquetas y promociones.", imagen: "global-autadhesivo-135grA4.webp" },
  { id: "autoadhesivoPremium", nombre: "Autoadhesivo premium 115 Grs", descripcion: "Pegatina de alta calidad con mejor adherencia.", imagen: "arjet-autoadhesivoPremium-115grA4.webp" },
  { id: "autoadhesivoResistente", nombre: "Autoadhesivo resistente al agua 88 Micrones", descripcion: "Ideal para etiquetas duraderas y resistentes a la humedad.", imagen: "arjet-filmiloBlancoResistente-88micronesA4.webp" },
];

export default function Inicio() {
  // 2. Usamos el tipo Resma | null en el estado
  const [resmaSeleccionada, setResmaSeleccionada] = useState<Resma | null>(null);

  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 transition-colors duration-300">
      
      <div className="bg-white dark:bg-slate-800 border border-violet-200 dark:border-slate-700 rounded-xl shadow-lg dark:shadow-black/40 p-6 sm:p-8 text-center transition-all duration-300 hover:shadow-xl mb-10">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-violet-800 dark:text-violet-400 tracking-tight transition-colors duration-300">
          Impresión de PDFs y Fotos Online con <span className="text-violet-600 dark:text-violet-300 block sm:inline">Envíos a todo el País</span>
        </h1>
        
        <p className="text-base sm:text-lg text-gray-700 dark:text-slate-300 mb-4 max-w-3xl mx-auto transition-colors duration-300">
          Subís tus archivos desde cualquier provincia, elegís el tipo de papel especial que necesitás, y nosotros nos encargamos del resto de forma rápida y económica.
        </p>
        
        <p className="text-base sm:text-lg text-violet-700 dark:text-violet-300 mb-4 font-medium transition-colors duration-300">
          Coordinamos el envío directo a tu domicilio para que recibas tus apuntes o cuadernillos sin moverte.
        </p>
      </div>

      <div className="overflow-x-auto">
        <h2 className="text-xl sm:text-2xl font-semibold text-violet-700 dark:text-violet-400 mb-4 text-center transition-colors duration-300">
          Tipos de Papeles y Resmas con los que Trabajamos
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
               alt={`Ejemplo de ${resmaSeleccionada.nombre}`}
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
// src/components/CargadorArchivo.tsx
"use client";

import { useRef } from "react";

interface CargadorArchivoProps {
  manejarCambioArchivo: (event: React.ChangeEvent<HTMLInputElement>) => void;
  totalPaginas: number | null;
}

export default function CargadorArchivo({ manejarCambioArchivo, totalPaginas }: CargadorArchivoProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex flex-col items-center justify-center w-full">
      {/* 1. EL BOTÓN GIGANTE (Es un label que activa el input oculto) */}
      <label 
        htmlFor="dropzone-file" 
        className="flex flex-col items-center justify-center w-full h-48 border-2 border-violet-300 border-dashed rounded-xl cursor-pointer bg-violet-50/50 dark:bg-slate-800/50 dark:border-slate-600 hover:bg-violet-100 dark:hover:bg-slate-700 transition-all duration-300 shadow-sm hover:shadow-md"
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6 px-4 text-center">
          {/* Iconito de nube (SVG) */}
          <svg className="w-10 h-10 mb-3 text-violet-500 dark:text-violet-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
          </svg>
          <p className="mb-2 text-sm text-slate-600 dark:text-slate-300">
            <span className="font-bold text-violet-700 dark:text-violet-400">Toca acá para subir</span> o arrastrá tus archivos
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Soporta fotos sueltas (JPG, PNG) o archivos PDF
          </p>
        </div>
        
        {/* 2. EL INPUT REAL (Oculto, pero con la magia de "multiple") */}
        <input 
          id="dropzone-file" 
          type="file" 
          className="hidden" 
          multiple // ¡La clave para que puedan seleccionar 10 fotos juntas!
          accept="application/pdf, image/png, image/jpeg, image/jpg" 
          onChange={manejarCambioArchivo}
          ref={inputRef}
        />
      </label>

      {/* 3. TEXTO DE AYUDA ACTUALIZADO */}
      <p className="text-xs text-slate-400 dark:text-slate-500 text-center transition-colors duration-300 mt-4 px-2">
        Podés seleccionar múltiples imágenes a la vez desde tu galería. Tamaño máximo por tanda: 100MB.
      </p>
    </div>
  );
}
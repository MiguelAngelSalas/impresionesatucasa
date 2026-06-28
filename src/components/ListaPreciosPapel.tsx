// src/components/ListaPreciosPapel.tsx

import { Tag } from 'lucide-react';

// Asegurate de definir la interfaz de tus precios, por ejemplo en un archivo types.ts
interface PrecioPapel {
  id: string;
  nombre: string;
  precio: number;
}

// Importación supuesta de tus datos
import preciosPorPapel from "../utilidades/preciosPorPapel"; 

export default function ListaPreciosPapel() {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md dark:shadow-black/40 border border-transparent dark:border-slate-700 p-4 w-full md:w-72 transition-colors duration-300">
      
      <h3 className="flex items-center justify-center gap-2 text-lg font-bold text-violet-700 dark:text-violet-400 mb-3 transition-colors duration-300">
        <Tag size={20} />
        Lista de precios
      </h3>
      
      <ul className="space-y-2 text-sm text-gray-700 dark:text-slate-300 transition-colors duration-300">
        {preciosPorPapel.map((item: PrecioPapel) => (
          <li 
            key={item.id} 
            className="flex justify-between border-b border-gray-200 dark:border-slate-700 pb-1 transition-colors duration-300"
          >
            <span>{item.nombre}</span>
            <span className="font-semibold text-violet-600 dark:text-violet-400 transition-colors duration-300">
              ${item.precio}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
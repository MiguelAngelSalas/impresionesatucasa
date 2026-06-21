import React from "react";
import preciosPorPapel from "./preciosPorPapel.jsx";

const ListaPreciosPapel = () => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md dark:shadow-black/40 border border-transparent dark:border-slate-700 p-4 w-full md:w-72 transition-colors duration-300">
      <h3 className="text-lg font-bold text-violet-700 dark:text-violet-400 mb-3 text-center transition-colors duration-300">
        💸 Lista de precios
      </h3>
      <ul className="space-y-2 text-sm text-gray-700 dark:text-slate-300 transition-colors duration-300">
        {preciosPorPapel.map((precios) => (
          <li key={precios.id} className="flex justify-between border-b border-gray-200 dark:border-slate-700 pb-1 transition-colors duration-300">
            <span>{precios.nombre}</span>
            <span className="font-semibold text-violet-600 dark:text-violet-400 transition-colors duration-300">
              ${precios.precio}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListaPreciosPapel;
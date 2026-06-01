import React from "react";
import preciosPorPapel  from "./preciosPorPapel.jsx";

const ListaPreciosPapel = () => {
  return (
    
    <div className="bg-white rounded-xl shadow-md p-4 w-full md:w-72">
      <h3 className="text-lg font-bold text-violet-700 mb-3 text-center">
        💸 Lista de precios
      </h3>
      <ul className="space-y-2 text-sm text-gray-700">
        {preciosPorPapel.map((precios) => (
          <li key={precios.id} className="flex justify-between border-b pb-1">
            <span>{precios.nombre}</span>
            <span className="font-semibold text-violet-600">${precios.precio}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListaPreciosPapel;

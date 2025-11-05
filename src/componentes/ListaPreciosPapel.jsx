import React from "react";

const precios = [
  { id: "comunByN", nombre: "Papel obra 80gr blanco y negro", precio: 200 },
  { id: "fotoFino", nombre: "Foto fino 140 Grs", precio: 1065 },
  { id: "fotoGrueso", nombre: "Foto Grueso 200 Grs", precio: 1140 },
  { id: "fotoPremium", nombre: "Foto Premium 260 Grs", precio: 1635 },
  { id: "mateFino", nombre: "Mate fino 110 Grs", precio: 1095 },
  { id: "mateGrueso", nombre: "Mate grueso 210 Grs", precio: 1155 },
  { id: "mateGruesoBiFaz", nombre: "Mate grueso bifaz 200 Grs", precio: 1275 },
  { id: "styckers", nombre: "Autoadhesivo resistente al agua (Styckers)", precio: 1830 },
  { id: "tatuajesTemporales", nombre: "Plancha de tatuajes temporales", precio: 6000}
];


const ListaPreciosPapel = () => {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 w-full md:w-72">
      <h3 className="text-lg font-bold text-violet-700 mb-3 text-center">
        💸 Lista de precios
      </h3>
      <ul className="space-y-2 text-sm text-gray-700">
        {precios.map((papel) => (
          <li key={papel.id} className="flex justify-between border-b pb-1">
            <span>{papel.nombre}</span>
            <span className="font-semibold text-violet-600">${papel.precio}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListaPreciosPapel;

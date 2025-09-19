import React, { useState } from 'react';

const resmas = [
  { id: "mateFino", nombre: "Mate fino 110 Grs", descripcion: "Ideal para impresiones suaves y económicas.", imagen: "./global-matefino-110grA4.jpg" },
  { id: "mateGrueso", nombre: "Mate grueso 210 Grs", descripcion: "Perfecto para presentaciones con cuerpo y textura.", imagen: "global-mateGruesoSimple-210grA4.webp" },
  { id: "mateBifaz", nombre: "Mate bifaz 200 Grs", descripcion: "Impresión doble faz sin transparencias.", imagen: "arjet-mateBifaz-200grA4.webp" },
  { id: "fotoFino", nombre: "Foto fino 140 Grs", descripcion: "Acabado brillante, ideal para flyers y fotos.", imagen: "global-fotoFino-140grA4.jpg" },
  { id: "fotoGrueso", nombre: "Foto grueso 200 Grs", descripcion: "Alta calidad para impresiones premium.", imagen: "arjet-fotoGrueso-200grA4.webp" },
  { id: "fotoPremium", nombre: "Foto premium 250 Grs", descripcion: "Acabado superior para fotos de alta definición.", imagen: "global-fotoPremium-260grA4.jpg" },
  { id: "autoadhesivo", nombre: "Autoadhesivo 150 Grs", descripcion: "Pegatina estándar para etiquetas y promociones.", imagen: "global-autadhesivo-135grA4.webp" },
  { id: "autoadhesivoPremium", nombre: "Autoadhesivo premium 200 Grs", descripcion: "Pegatina de alta calidad con mejor adherencia.", imagen: "arjet-autoadhesivoPremium-115grA4.webp" },
  { id: "autoadhesivoResistente", nombre: "Autoadhesivo resistente al agua 220 Grs", descripcion: "Ideal para etiquetas duraderas y resistentes a la humedad.", imagen: "arjet-filmiloBlancoResistente-88micronesA4.webp" },
];

const Inicio = () => {
  const [resmaSeleccionada, setResmaSeleccionada] = useState(null);

  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white border border-violet-200 rounded-xl shadow-lg p-6 sm:p-8 text-center transition-all duration-300 hover:shadow-xl mb-10">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-violet-800">
          Impresiones Personalizadas
        </h1>
        <p className="text-base sm:text-lg text-gray-700 mb-4">
          Subí tu archivo, elegí el tipo de papel y nosotros nos encargamos del resto.
        </p>
        <p className="text-base sm:text-lg text-gray-700 mb-4">
          El precio ya incluye el envío, y te lo mandamos directo a tu domicilio.
        </p>
        <p className="text-base sm:text-lg text-gray-700">
          Simple, rápido y hecho a tu medida.
        </p>
      </div>

      <div className="overflow-x-auto">
        <div className="flex space-x-4 pb-4">
          {resmas.map((resma) => (
            <button
              key={resma.id}
              onClick={() => setResmaSeleccionada(resma)}
              className="min-w-[220px] bg-white border border-gray-300 rounded-lg p-4 shadow-md flex-shrink-0 transition transform hover:scale-105 text-left"
            >
              <h3 className="text-md font-semibold text-gray-800 mb-1">{resma.nombre}</h3>
              <p className="text-sm text-gray-600">{resma.descripcion}</p>
            </button>
          ))}
        </div>
      </div>

      {resmaSeleccionada && (
        <div className="mt-8 bg-gray-50 border border-gray-200 rounded-lg p-6 shadow-inner text-center">
          <h2 className="text-xl font-bold text-violet-700 mb-4">{resmaSeleccionada.nombre}</h2>
          <p className="text-gray-700 mb-4">{resmaSeleccionada.descripcion}</p>
          <img
            src={resmaSeleccionada.imagen}
            alt={`Ejemplo de ${resmaSeleccionada.nombre}`}
            className="mx-auto max-w-xs rounded-md shadow"
          />
        </div>
      )}
    </section>
  );
};

export default Inicio;

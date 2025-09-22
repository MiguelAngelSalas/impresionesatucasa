import React from "react";

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

const Resmas = () => {
  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-violet-800 mb-8 text-center">
        Elegí tus resmas de papel
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {resmas.map((resma) => (
          <div
            key={resma.id}
            className="border border-violet-200 rounded-xl shadow-md p-6 bg-white hover:shadow-lg transition-all relative"
          >
            <div className="relative w-full h-40 rounded-md">
              <img
                src={resma.imagen}
                alt={resma.nombre}
                className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-150 hover:absolute hover:top-0 hover:left-0 hover:z-50 hover:w-auto hover:h-auto"
              />
            </div>
            <h3 className="text-lg font-semibold text-violet-700 mb-2 mt-4">
              {resma.nombre}
            </h3>
            <p className="text-sm text-gray-600">{resma.descripcion}</p>
            <button className="mt-4 w-full bg-violet-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-violet-700 transition">
              Agregar al pedido
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Resmas;
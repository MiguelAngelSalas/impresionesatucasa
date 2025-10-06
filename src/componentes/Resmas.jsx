import React from "react";

const resmas = [
  {
    id: "mateFino",
    nombre: "Mate fino 110 Grs",
    descripcion: "Ideal para impresiones suaves y económicas.",
    imagen: "./global-matefino-110grA4.jpg",
    precio: 16654.99, // ← completás vos
  },
  {
    id: "mateGrueso",
    nombre: "Mate grueso 210 Grs",
    descripcion: "Perfecto para presentaciones con cuerpo y textura.",
    imagen: "global-mateGruesoSimple-210grA4.webp",
    precio: 23879.99,
  },
  {
    id: "mateBifaz",
    nombre: "Mate bifaz 200 Grs",
    descripcion: "Impresión doble faz sin transparencias.",
    imagen: "arjet-mateBifaz-200grA4.webp",
    precio: 18354.99,
  },
  {
    id: "fotoFino",
    nombre: "Foto fino 140 Grs",
    descripcion: "Acabado brillante, ideal para flyers y fotos.",
    imagen: "global-fotoFino-140grA4.jpg",
    precio: 5059.99,
  },
  {
    id: "fotoGrueso",
    nombre: "Foto grueso 200 Grs",
    descripcion: "Alta calidad para impresiones premium.",
    imagen: "arjet-fotoGrueso-200grA4.webp",
    precio: 5099.99,
  },
  {
    id: "fotoPremium",
    nombre: "Foto premium 250 Grs",
    descripcion: "Acabado superior para fotos de alta definición.",
    imagen: "global-fotoPremium-260grA4.jpg",
    precio: 34819.99,
  },
  {
    id: "autoadhesivo",
    nombre: "Autoadhesivo 150 Grs",
    descripcion: "Pegatina estándar para etiquetas y promociones.",
    imagen: "global-autadhesivo-135grA4.webp",
    precio: 6579.99,
  },
  {
    id: "autoadhesivoPremium",
    nombre: "Autoadhesivo premium 200 Grs",
    descripcion: "Pegatina de alta calidad con mejor adherencia.",
    imagen: "arjet-autoadhesivoPremium-115grA4.webp",
    precio: 9114.99,
  },
  {
    id: "autoadhesivoResistente",
    nombre: "Autoadhesivo resistente al agua 220 Grs",
    descripcion: "Ideal para etiquetas duraderas y resistentes a la humedad.",
    imagen: "arjet-filmiloBlancoResistente-88micronesA4.webp",
    precio: 23199.99,
  },
];

const Resmas = ({ agregarAlCarrito }) => {
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
            <div className="relative w-full h-40 rounded-md overflow-hidden">
              <img
                src={resma.imagen}
                alt={resma.nombre}
                className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-150"
              />
            </div>
            <h3 className="text-lg font-semibold text-violet-700 mb-2 mt-4">
              {resma.nombre}
            </h3>
            <p className="text-sm text-gray-600 mb-2">{resma.descripcion}</p>
            <p className="text-sm text-gray-800 font-medium mb-4">
              Precio: <span className="text-violet-700">{resma.precio !== null ? `$${resma.precio}` : "—"}</span>
            </p>
            <button
              onClick={() =>
                agregarAlCarrito({
                  id: resma.id,
                  name: resma.nombre,
                  price: resma.precio || 0,
                  detalles: { tipo: "resma" },
                })
              }
              className="mt-auto w-full bg-violet-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-violet-700 transition"
            >
              Agregar al pedido
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Resmas;



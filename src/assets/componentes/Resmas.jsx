import React from 'react';

const resmas = [
  {
    id: 'mateFino',
    nombre: 'Mate fino 110 Grs',
    descripcion: 'Ideal para impresiones suaves y económicas.',
    imagen: 'https://m.media-amazon.com/images/I/71vZVf1zKDL._AC_SL1500_.jpg', // ejemplo
  },
  {
    id: 'mateGrueso',
    nombre: 'Mate grueso 210 Grs',
    descripcion: 'Perfecto para presentaciones con cuerpo y textura.',
    imagen: 'https://m.media-amazon.com/images/I/61XxZy3u1DL._AC_SL1500_.jpg',
  },
  {
    id: 'fotoFino',
    nombre: 'Foto fino 140 Grs',
    descripcion: 'Acabado brillante, ideal para flyers y fotos.',
    imagen: 'https://m.media-amazon.com/images/I/71yZzZKXKDL._AC_SL1500_.jpg',
  },
  {
    id: 'fotoGrueso',
    nombre: 'Foto grueso 200 Grs',
    descripcion: 'Alta calidad para impresiones premium.',
    imagen: 'https://m.media-amazon.com/images/I/61XxZy3u1DL._AC_SL1500_.jpg',
  },
  {
    id: 'mateGruesoBiFaz',
    nombre: 'Mate grueso bifaz 200 Grs',
    descripcion: 'Impresión doble faz sin transparencias.',
    imagen: 'https://m.media-amazon.com/images/I/71vZVf1zKDL._AC_SL1500_.jpg',
  },
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
            className="border border-violet-200 rounded-xl shadow-md p-6 bg-white hover:shadow-lg transition-all"
          >
            <img
              src={resma.imagen}
              alt={resma.nombre}
              className="w-full h-40 object-cover rounded-md mb-4"
            />
            <h3 className="text-lg font-semibold text-violet-700 mb-2">
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

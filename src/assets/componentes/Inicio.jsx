import React from 'react';

const tiposDePapel = [
  { nombre: 'Mate 150g', descripcion: 'Ideal para flyers y folletos', color: 'bg-violet-100' },
  { nombre: 'Brillante 200g', descripcion: 'Perfecto para fotos y posters', color: 'bg-yellow-100' },
  { nombre: 'Reciclado 120g', descripcion: 'Sustentable y elegante', color: 'bg-green-100' },
  { nombre: 'Adhesivo', descripcion: 'Para etiquetas y stickers', color: 'bg-pink-100' },
  { nombre: 'Cartulina 300g', descripcion: 'Resistente para tarjetas y portadas', color: 'bg-blue-100' },
];

const Inicio = () => {
  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
          {tiposDePapel.map((papel, index) => (
            <div
              key={index}
              className={`min-w-[200px] ${papel.color} border border-gray-300 rounded-lg p-4 shadow-md flex-shrink-0`}
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{papel.nombre}</h3>
              <p className="text-sm text-gray-600">{papel.descripcion}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Inicio;

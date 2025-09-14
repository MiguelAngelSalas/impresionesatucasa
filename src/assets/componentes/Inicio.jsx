import React from 'react';

const Inicio = () => {
  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white border border-violet-200 rounded-xl shadow-lg p-6 sm:p-8 text-center transition-all duration-300 hover:shadow-xl">
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
    </section>
  );
};

export default Inicio;
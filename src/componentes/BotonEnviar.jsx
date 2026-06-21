import React from "react";

const BotonEnviar = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full bg-violet-600 dark:bg-violet-700 text-white py-3 text-lg rounded-lg font-bold shadow-md dark:shadow-black/40 hover:bg-violet-700 dark:hover:bg-violet-600 transition-all duration-300 transform hover:-translate-y-0.5 border border-red-500 dark:border-red-400"
    >
      Enviar pedido
    </button>
  );
};

export default BotonEnviar;
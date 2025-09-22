import React from "react";

const BotonEnviar = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full bg-violet-600 text-white py-3 text-lg rounded-lg font-semibold hover:bg-violet-700 transition border border-red-500"
    >
      Enviar pedido
    </button>
  );
};

export default BotonEnviar;

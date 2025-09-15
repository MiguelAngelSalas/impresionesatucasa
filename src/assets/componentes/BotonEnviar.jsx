import React from "react";

const BotonEnviar = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full bg-violet-600 text-white py-2 rounded-lg font-medium hover:bg-violet-700 transition"
    >
      Enviar pedido
    </button>
  );
};

export default BotonEnviar;
import React from "react";

const MensajeEstado = ({ estado }) => {
  return estado ? (
    <p className="text-center text-sm text-gray-600 mt-4">{estado}</p>
  ) : null;
};

export default MensajeEstado;
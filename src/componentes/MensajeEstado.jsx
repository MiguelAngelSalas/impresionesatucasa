import React from "react";

const MensajeEstado = ({ estado }) => {
  return estado ? (
    <p className="text-center text-sm text-gray-600 dark:text-slate-300 mt-4 transition-colors duration-300">
      {estado}
    </p>
  ) : null;
};

export default MensajeEstado;
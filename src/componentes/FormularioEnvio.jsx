import React from "react";
import BotonEnviar from "./BotonEnviar";
import MensajeEstado from "./MensajeEstado";

const FormularioEnvio = ({ manejarEnvio, agregarAlCarrito, estado }) => (
  <>
    <BotonEnviar onClick={manejarEnvio} />
    <button
      onClick={agregarAlCarrito}
      className="w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold py-2 px-4 rounded-md shadow-sm transition"
    >
      🛒 Agregar al carrito
    </button>
    <MensajeEstado estado={estado} />
  </>
);

export default FormularioEnvio;

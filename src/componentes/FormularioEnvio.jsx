import React from "react";
import BotonEnviar from "./BotonEnviar"; // Mantenemos tu import original por si lo usás más adelante
import MensajeEstado from "./MensajeEstado";

const FormularioEnvio = ({ manejarEnvio, manejarAgregarAlCarrito, estado }) => (
  <>
    <button
      onClick={manejarAgregarAlCarrito}
      className="w-full bg-violet-600 dark:bg-violet-700 hover:bg-violet-700 dark:hover:bg-violet-600 text-white font-bold py-3 px-4 rounded-lg shadow-md dark:shadow-black/40 transition-all duration-300 transform hover:-translate-y-0.5"
    >
      🛒 Agregar al carrito
    </button>
    
    {/* Este ya lo pintamos hace un rato, así que va a heredar el modo oscuro perfecto */}
    <MensajeEstado estado={estado} />
  </>
);

export default FormularioEnvio;
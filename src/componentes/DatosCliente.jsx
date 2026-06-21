import React from "react";
import SelectorPapel from "./SelectorPapel";
import InputCliente from "./InputCliente";

const DatosCliente = ({
  tipoPapel,
  setTipoPapel,
  nombreCliente,
  setNombreCliente,
  telefonoCliente,
  setTelefonoCliente,
}) => (
  <>
    {/* Estos dos ya vienen con la magia del modo oscuro incorporada */}
    <SelectorPapel value={tipoPapel} onChange={setTipoPapel} />
    <InputCliente value={nombreCliente} onChange={setNombreCliente} />
    
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 transition-colors duration-300">
        📱 Teléfono de contacto
      </label>
      <input
        type="tel"
        inputMode="numeric"
        value={telefonoCliente}
        onChange={(e) => setTelefonoCliente(e.target.value)}
        placeholder="Ej: 11-1234-5678"
        required
        className="w-full px-4 py-2 bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-lg text-gray-700 dark:text-slate-100 placeholder-gray-400 dark:placeholder-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-400 dark:focus:ring-violet-500 transition-colors duration-300 text-sm"
      />
    </div>
  </>
);

export default DatosCliente;
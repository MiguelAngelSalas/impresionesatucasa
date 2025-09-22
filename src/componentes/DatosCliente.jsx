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
    <SelectorPapel value={tipoPapel} onChange={setTipoPapel} />
    <InputCliente value={nombreCliente} onChange={setNombreCliente} />
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">📱 Teléfono de contacto</label>
      <input
        type="tel"
        inputMode="numeric"
        value={telefonoCliente}
        onChange={(e) => setTelefonoCliente(e.target.value)}
        placeholder="Ej: 11-1234-5678"
        required
        className="w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:ring-violet-500 focus:border-violet-500 text-sm"
      />
    </div>
  </>
);

export default DatosCliente;

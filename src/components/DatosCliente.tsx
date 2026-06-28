import React from "react";
import SelectorPapel from "./SelectorPapel";
import InputCliente from "./InputCliente";

interface DatosClienteProps {
  // Opcionales para el papel
  tipoPapel?: string;
  setTipoPapel?: React.Dispatch<React.SetStateAction<string>>;
  
  // Opcionales para los datos de cliente
  nombreCliente?: string;
  setNombreCliente?: React.Dispatch<React.SetStateAction<string>>;
  telefonoCliente?: string;
  setTelefonoCliente?: React.Dispatch<React.SetStateAction<string>>;
}

export default function DatosCliente({
  tipoPapel, setTipoPapel,
  nombreCliente, setNombreCliente,
  telefonoCliente, setTelefonoCliente,
}: DatosClienteProps) {
  return (
    <div className="space-y-4">
      {/* 1. SECCIÓN PAPEL: Solo se muestra si pasas tipoPapel */}
      {tipoPapel !== undefined && setTipoPapel && (
        <SelectorPapel value={tipoPapel} onChange={setTipoPapel} />
      )}

      {/* 2. SECCIÓN CLIENTE: Solo se muestra si pasas nombreCliente */}
      {nombreCliente !== undefined && setNombreCliente && (
        <InputCliente value={nombreCliente} onChange={setNombreCliente} />
      )}

      {/* 3. SECCIÓN TELÉFONO: Solo se muestra si pasas telefonoCliente */}
      {telefonoCliente !== undefined && setTelefonoCliente && (
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-slate-300">
            📱 Teléfono de contacto
          </label>
          <input
            type="tel"
            value={telefonoCliente}
            onChange={(e) => setTelefonoCliente(e.target.value)}
            placeholder="Ej: 11-1234-5678"
            className="w-full px-4 py-2 bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-lg text-sm"
          />
        </div>
      )}
    </div>
  );
}
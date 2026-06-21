import React from "react";
import InputArchivo from "./InputArchivo";

const CargadorArchivo = ({ manejarCambioArchivo, totalPaginas }) => (
  <>
    {/* Este ya hace su magia por dentro */}
    <InputArchivo onChange={manejarCambioArchivo} totalPaginas={totalPaginas} />
    
    <p className="text-sm text-gray-500 dark:text-slate-400 text-center transition-colors duration-300 mt-2">
      Solo archivos PDF. Tamaño máximo 20MB.
    </p>
  </>
);

export default CargadorArchivo;
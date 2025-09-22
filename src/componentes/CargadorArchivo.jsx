import React from "react";
import InputArchivo from "./InputArchivo";

const CargadorArchivo = ({ manejarCambioArchivo, totalPaginas }) => (
  <>
    <InputArchivo onChange={manejarCambioArchivo} totalPaginas={totalPaginas} />
    <p className="text-sm text-gray-500 text-center">
      Solo archivos PDF. Tamaño máximo 20MB.
    </p>
  </>
);

export default CargadorArchivo;

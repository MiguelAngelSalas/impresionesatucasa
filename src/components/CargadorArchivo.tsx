// src/components/CargadorArchivo.tsx

import InputArchivo from "@/components/InputArchivo"; // <--- ¡ESTA ES LA LÍNEA QUE FALTA!

interface CargadorArchivoProps {
  manejarCambioArchivo: (event: React.ChangeEvent<HTMLInputElement>) => void;
  totalPaginas: number | null;
}

export default function CargadorArchivo({ manejarCambioArchivo, totalPaginas }: CargadorArchivoProps) {
  return (
    <>
      <InputArchivo onChange={manejarCambioArchivo} totalPaginas={totalPaginas} />
      
      <p className="text-sm text-gray-500 dark:text-slate-400 text-center transition-colors duration-300 mt-2">
        Solo archivos PDF. Tamaño máximo 100MB.
      </p>
    </>
  );
}
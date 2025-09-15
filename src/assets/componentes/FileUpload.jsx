import React, { useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";

import InputArchivo from "./InputArchivo";
import SelectorPapel from "./SelectorPapel";
import InputCliente from "./InputCliente";
import BotonEnviar from "./BotonEnviar";
import MensajeEstado from "./MensajeEstado";
import { subirArchivo } from "../../services/api";

// configuración del worker de pdf.js
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

const FileUploader = () => {
  const [archivo, setArchivo] = useState(null);
  const [tipoPapel, setTipoPapel] = useState("");
  const [nombreCliente, setNombreCliente] = useState("");
  const [estado, setEstado] = useState("");
  const [totalPaginas, setTotalPaginas] = useState(null);

  // 🔹 valor fijo por página (ejemplo)
  const precioUnitario = 50;
  const precioEstimado = totalPaginas ? totalPaginas * precioUnitario : null;

  const manejarCambioArchivo = async (e) => {
    const archivoSeleccionado = e.target.files[0];
    if (!archivoSeleccionado) return;

    if (archivoSeleccionado.type !== "application/pdf") {
      setArchivo(null);
      setEstado("❌ Solo se aceptan archivos PDF.");
      setTotalPaginas(null);
      return;
    }

    if (archivoSeleccionado.size > 20 * 1024 * 1024) {
      setArchivo(null);
      setEstado("❌ El archivo supera el tamaño máximo de 20MB.");
      setTotalPaginas(null);
      return;
    }

    try {
      const reader = new FileReader();
      reader.onload = async (ev) => {
        const typedArray = new Uint8Array(ev.target.result);
        const pdf = await pdfjsLib.getDocument(typedArray).promise;
        setTotalPaginas(pdf.numPages);
        setEstado(`✅ Archivo listo. Total páginas: ${pdf.numPages}`);
      };
      reader.readAsArrayBuffer(archivoSeleccionado);
      setArchivo(archivoSeleccionado);
    } catch (error) {
      console.error(error);
      setEstado("❌ Error al leer el archivo PDF.");
      setArchivo(null);
      setTotalPaginas(null);
    }
  };

  const manejarEnvio = async () => {
    if (!archivo || !tipoPapel) {
      setEstado("⚠️ Faltan datos: seleccioná archivo y tipo de papel.");
      return;
    }

    const { mensaje, pedido } = await subirArchivo({
      archivo,
      tipoPapel,
      nombreCliente,
      paginas: totalPaginas, // 🔹 ahora mandamos la cantidad desde el front
    });

    setEstado(mensaje);

    // si el back devuelve algo distinto, lo podemos mostrar también
    if (pedido?.paginas) {
      setTotalPaginas(pedido.paginas);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-100 to-white flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md sm:max-w-lg md:max-w-xl bg-white rounded-xl shadow-lg p-6 sm:p-8">
        <h2 className="text-xl sm:text-2xl font-bold text-violet-700 mb-6 text-center">
          Subí tu archivo para imprimir
        </h2>

        <div className="space-y-4">
          <InputArchivo
            onChange={manejarCambioArchivo}
            totalPaginas={totalPaginas}
          />

          <p className="text-sm text-gray-500 text-center">
            Solo archivos PDF. Tamaño máximo 20MB.
          </p>

          {totalPaginas && (
            <p className="text-lg font-semibold text-violet-700 text-center">
              📄 Total páginas: {totalPaginas} <br />
              💰 Precio estimado: ${precioEstimado}
            </p>
          )}

          <SelectorPapel value={tipoPapel} onChange={setTipoPapel} />
          <InputCliente value={nombreCliente} onChange={setNombreCliente} />
          <BotonEnviar onClick={manejarEnvio} />
          <MensajeEstado estado={estado} />
        </div>
      </div>
    </div>
  );
};

export default FileUploader;

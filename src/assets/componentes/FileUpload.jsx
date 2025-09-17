import React, { useState, useEffect } from "react";
import * as pdfjsLib from "pdfjs-dist";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker?url";

import InputArchivo from "./InputArchivo";
import SelectorPapel from "./SelectorPapel";
import InputCliente from "./InputCliente";
import BotonEnviar from "./BotonEnviar";
import MensajeEstado from "./MensajeEstado";
import ListaPreciosPapel from "./ListaPreciosPapel";
import { subirArchivo } from "../../services/api";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

const preciosPorPapel = {
  fotoFino: 1420,
  fotoGrueso: 1520,
  fotoPremium: 2180,
  mateFino: 1460,
  mateGrueso: 1540,
  mateGruesoBiFaz: 1700,
  styckers: 2440,
};

const calcularDescuento = (paginas) => {
  if (paginas > 50) return 0.3;
  if (paginas > 30) return 0.2;
  if (paginas > 20) return 0.15;
  if (paginas > 10) return 0.1;
  return 0;
};

const FileUploader = () => {
  useEffect(() => {
    if (window.location.protocol === "http:") {
      window.location.href = window.location.href.replace("http:", "https:");
    }
  }, []);

  const [archivo, setArchivo] = useState(null);
  const [tipoPapel, setTipoPapel] = useState("");
  const [nombreCliente, setNombreCliente] = useState("");
  const [telefonoCliente, setTelefonoCliente] = useState("");
  const [estado, setEstado] = useState("");
  const [totalPaginas, setTotalPaginas] = useState(null);
  const [mostrarMensajeContacto, setMostrarMensajeContacto] = useState(false);

  const precioUnitario = preciosPorPapel[tipoPapel] || 0;
  const descuento = calcularDescuento(totalPaginas || 0);
  const precioSinDescuento =
    totalPaginas && tipoPapel ? totalPaginas * precioUnitario : null;
  const precioFinal =
    precioSinDescuento ? Math.round(precioSinDescuento * (1 - descuento)) : null;

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
    const telefonoNormalizado = telefonoCliente.trim().replace(/\s+/g, '');

    if (!archivo || !tipoPapel || !telefonoNormalizado) {
      setEstado("⚠️ Faltan datos: archivo, tipo de papel y teléfono.");
      return;
    }

    const extension = archivo.name.split(".").pop();
    const nuevoNombre = `${nombreCliente}_${telefonoNormalizado}_${totalPaginas}.${extension}`;
    const archivoRenombrado = new File([archivo], nuevoNombre, { type: archivo.type });

    const { mensaje, pedido } = await subirArchivo({
      archivo: archivoRenombrado,
      tipoPapel,
      nombreCliente,
      telefonoCliente: telefonoNormalizado,
      paginas: totalPaginas,
    });

    setEstado(mensaje);
    if (pedido?.paginas) setTotalPaginas(pedido.paginas);
    setMostrarMensajeContacto(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-100 to-white flex items-center justify-center px-4 py-10 overflow-y-auto relative">
      <div className="flex flex-col md:flex-row gap-6 w-full max-w-md mx-auto">
        <div className="flex-1 min-w-0 bg-white rounded-xl shadow-lg p-6 sm:p-8">
          <div className="bg-violet-50 border border-violet-200 text-violet-700 my-4 text-sm sm:text-base font-medium px-4 py-2 rounded-lg shadow-sm text-center break-words">
            🎉 ¡Descuento automático desde 10 hojas en adelante!
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-violet-700 mb-6 text-center break-words">
            Subí tu archivo para imprimir
          </h2>

          <div className="space-y-6 sm:space-y-4 pb-20">
            <InputArchivo onChange={manejarCambioArchivo} totalPaginas={totalPaginas} />
            <p className="text-sm text-gray-500 text-center break-words">Solo archivos PDF. Tamaño máximo 20MB.</p>
            <SelectorPapel value={tipoPapel} onChange={setTipoPapel} />
            <InputCliente value={nombreCliente} onChange={setNombreCliente} />

            <div>
              <label className="block text-sm font-medium text-gray-700">📱 Teléfono de contacto</label>
              <input
                type="tel"
                inputMode="numeric"
                value={telefonoCliente}
                onChange={(e) => setTelefonoCliente(e.target.value)}
                placeholder="Ej: 11-1234-5678"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-violet-500 focus:border-violet-500 sm:text-sm"
                required
              />
            </div>

            {totalPaginas && tipoPapel && (
              <div className="text-center text-violet-700 font-semibold text-lg space-y-1 break-words">
                📄 Total páginas: {totalPaginas} <br />
                🧾 Papel seleccionado: {tipoPapel} <br />
                {descuento > 0 ? (
                  <>
                    💰 Precio original: <span className="line-through text-gray-500">${precioSinDescuento}</span> <br />
                    🎉 Descuento aplicado: {descuento * 100}% <br />
                    💸 Precio final: ${precioFinal}
                  </>
                ) : (
                  <>💰 Precio estimado: ${precioFinal}</>
                )}
              </div>
            )}

            {/* Botón visible en desktop */}
            <div className="hidden md:block">
              <BotonEnviar onClick={manejarEnvio} />
            </div>

            <MensajeEstado estado={estado} />

            {mostrarMensajeContacto && (
              <div className="bg-green-100 border border-green-300 text-green-800 text-sm font-medium px-4 py-2 rounded-lg shadow-sm text-center mt-4 break-words">
                📞 En breve nos comunicaremos desde el número <strong>11-2390-9529</strong>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col items-center gap-4 w-full md:w-72">
          <ListaPreciosPapel />
          <div className="bg-violet-100 text-violet-700 text-sm font-semibold px-4 py-2 rounded-lg shadow text-center break-words">
            🚚 ¡Envío gratis en todos tus pedidos!
          </div>
        </div>
      </div>

      {/* Botón flotante solo en mobile */}
      <div className="fixed bottom-4 left-4 right-4 z-50 md:hidden">
        <BotonEnviar onClick={manejarEnvio} />
      </div>
    </div>
  );
};

export default FileUploader;

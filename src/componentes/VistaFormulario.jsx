import React, { useState, useEffect } from "react";
import * as pdfjsLib from "pdfjs-dist";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker?url";

import CargadorArchivo from "./CargadorArchivo";
import DatosCliente from "./DatosCliente";
import DetallePrecio from "./DetallePrecio";
import FormularioEnvio from "./FormularioEnvio";
import MensajeContacto from "./MensajeContacto";
import ListaPreciosPapel from "./ListaPreciosPapel";

import { preciosPorPapel } from "./preciosPorPapel";
import { calcularDescuento } from "../utilidades/calcularDescuento";
import { subirArchivo } from "../servicios/api";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

const VistaFormulario = ({ agregarAlCarrito }) => {
  useEffect(() => {
    if (
      window.location.hostname !== "localhost" &&
      window.location.protocol === "http:"
    ) {
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
  const precioProyectadoConDescuento = precioSinDescuento
    ? Math.round(precioSinDescuento * (1 - descuento))
    : null;

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

  const subirACloudinary = async (archivo) => {
    const url = "https://api.cloudinary.com/v1_1/<tu-cloud-name>/upload";
    const preset = "<tu-upload-preset>"; // creado en Cloudinary

    const formData = new FormData();
    formData.append("file", archivo);
    formData.append("upload_preset", preset);

    try {
      const res = await fetch(url, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      return data.secure_url;
    } catch (error) {
      console.error("❌ Error al subir a Cloudinary:", error);
      return null;
    }
  };

  const manejarEnvio = async () => {
    const telefonoNormalizado = telefonoCliente.trim().replace(/\s+/g, "");

    if (!archivo || !tipoPapel || !telefonoNormalizado) {
      setEstado("⚠️ Faltan datos: archivo, tipo de papel y teléfono.");
      return;
    }

    const extension = archivo.name.split(".").pop();
    const nuevoNombre = `${nombreCliente}_${telefonoNormalizado}_${totalPaginas}.${extension}`;
    const archivoRenombrado = new File([archivo], nuevoNombre, {
      type: archivo.type,
    });

    // ✅ Subir a Cloudinary
    const urlCloudinary = await subirACloudinary(archivoRenombrado);
    if (!urlCloudinary) {
      setEstado("❌ No se pudo subir el archivo a Cloudinary.");
      return;
    }

    // ✅ Enviar pedido al backend
    const { mensaje, pedido } = await subirArchivo({
      archivoUrl: urlCloudinary,
      tipoPapel,
      nombreCliente,
      telefonoCliente: telefonoNormalizado,
      paginas: totalPaginas,
    });

    setEstado(mensaje);
    if (pedido?.paginas) setTotalPaginas(pedido.paginas);
    setMostrarMensajeContacto(true);
  };

  const manejarAgregarAlCarrito = () => {
    if (!archivo || !tipoPapel || !totalPaginas || !precioSinDescuento) {
      setEstado("⚠️ Faltan datos para agregar al carrito.");
      return;
    }

    const producto = {
      id: `${archivo.name}-${tipoPapel}-${totalPaginas}-${Date.now()}`,
      name: `Impresión PDF (${tipoPapel})`,
      quantity: 1,
      price: precioSinDescuento,
      detalles: {
        tipo: "impresion",
        archivo: archivo.name,
        paginas: totalPaginas,
        papel: tipoPapel,
      },
    };

    console.log("📦 Producto listo para carrito:", producto);
    agregarAlCarrito(producto);
    setEstado("🛒 Agregado al carrito correctamente.");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-100 to-white flex items-center justify-center px-4 py-10 overflow-y-auto">
      <div className="flex flex-col md:flex-row flex-wrap gap-6 w-full max-w-4xl mx-auto">
        <div className="flex-1 w-full bg-white rounded-xl shadow-lg p-6 sm:p-8">
          <div className="bg-violet-50 border border-violet-200 text-violet-700 my-4 text-sm sm:text-base font-medium px-4 py-2 rounded-lg shadow-sm text-center">
            🎉 ¡Descuento automático desde 10 hojas en adelante!
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-violet-700 mb-4 text-center">
            Subí tu archivo para imprimir
          </h2>

          <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 mb-6 text-sm sm:text-base font-medium px-4 py-2 rounded-lg shadow-sm text-center">
            📐 Las hojas se imprimen en tamaño A4 (210 × 297 mm)
          </div>

          <div className="space-y-6 sm:space-y-4">
            <CargadorArchivo
              manejarCambioArchivo={manejarCambioArchivo}
              totalPaginas={totalPaginas}
            />
            <DatosCliente
              tipoPapel={tipoPapel}
              setTipoPapel={setTipoPapel}
              nombreCliente={nombreCliente}
              setNombreCliente={setNombreCliente}
              telefonoCliente={telefonoCliente}
              setTelefonoCliente={setTelefonoCliente}
            />
            <DetallePrecio
              totalPaginas={totalPaginas}
              tipoPapel={tipoPapel}
              precioSinDescuento={precioSinDescuento}
              descuento={descuento}
              precioFinal={precioProyectadoConDescuento}
            />
            <FormularioEnvio
              manejarEnvio={manejarEnvio}
              manejarAgregarAlCarrito={manejarAgregarAlCarrito}
              estado={estado}
            />
            {mostrarMensajeContacto && <MensajeContacto />}
          </div>
        </div>

        <div className="w-full md:w-72 flex flex-col items-center gap-4">
          <ListaPreciosPapel />
        </div>
      </div>
    </div>
  );
};

export default VistaFormulario;

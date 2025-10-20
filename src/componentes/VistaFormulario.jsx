// VistaFormulario.jsx
import React, { useState, useEffect } from "react";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf";
import workerUrl from "pdfjs-dist/legacy/build/pdf.worker?url";
pdfjsLib.GlobalWorkerOptions.workerSrc = workerUrl;

import CargadorArchivo from "./CargadorArchivo";
import DatosCliente from "./DatosCliente";
import DetallePrecio from "./DetallePrecio";
import FormularioEnvio from "./FormularioEnvio";
import MensajeContacto from "./MensajeContacto";
import ListaPreciosPapel from "./ListaPreciosPapel";

import { preciosPorPapel } from "./preciosPorPapel";
import { calcularDescuento } from "../utilidades/calcularDescuento";

const API_BASE = "https://site--backendpedidos--5lz4hq4qwsk5.code.run"; // ⚡ Cambiar por la URL de producción

const VistaFormulario = ({
  nombreCliente,
  setNombreCliente,
  telefonoCliente,
  setTelefonoCliente,
  agregarAlCarrito,
  carrito,
  vaciarCarrito,
}) => {
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

  // Contar páginas PDF
  const manejarCambioArchivo = async (e) => {
    const archivoSeleccionado = e.target.files?.[0];
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
        setArchivo(archivoSeleccionado);
      };
      reader.readAsArrayBuffer(archivoSeleccionado);
    } catch (error) {
      console.error(error);
      setEstado("❌ Error al leer el archivo PDF.");
      setArchivo(null);
      setTotalPaginas(null);
    }
  };

  // Agregar al carrito
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
        archivo: archivo, // ✅ mantener el File original
        paginas: totalPaginas,
        papel: tipoPapel,
      },
    };

    agregarAlCarrito(producto);
    setEstado("🛒 Agregado al carrito correctamente.");
  };

  // Enviar pedido al backend
  const manejarEnvio = async () => {
    if (!nombreCliente || !telefonoCliente || carrito.length === 0) {
      setEstado("⚠️ Faltan datos: cliente, teléfono o carrito vacío.");
      return;
    }

    const telefonoNormalizado = telefonoCliente.trim().replace(/\s+/g, "_");

    const formData = new FormData();

    carrito.forEach((producto) => {
      const archivoOriginal = producto.detalles.archivo;
      formData.append("archivos", archivoOriginal);
      formData.append("tiposPapel[]", producto.detalles.papel);
    });

    formData.append("cliente", nombreCliente);
    formData.append("telefono", telefonoNormalizado);
    formData.append("pedido", JSON.stringify({ items: carrito }));

    setEstado("⏳ Enviando pedido...");

    try {
      const response = await fetch(`${API_BASE}/api/pedidos`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("❌ Error en la respuesta del backend:", errorText);
        setEstado("❌ Error al procesar el pedido. Revisá la consola.");
        return;
      }

      const data = await response.json();
      console.log("✅ Pedido enviado:", data);
      setEstado(data.mensaje || "✅ Pedido enviado correctamente.");
      setMostrarMensajeContacto(true);

      // Limpiar formulario y carrito
      setArchivo(null);
      setTipoPapel("");
      setTotalPaginas(null);
      setNombreCliente("");
      setTelefonoCliente("");
      vaciarCarrito();
    } catch (error) {
      console.error("❌ Error al enviar el pedido al backend:", error);
      setEstado("❌ No se pudo contactar con el servidor.");
    }
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

        <div className="w-full md:w-72 flex flex-col gap-4">
          <ListaPreciosPapel />
        </div>
      </div>
    </div>
  );
};

export default VistaFormulario;

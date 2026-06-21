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

import preciosPorPapel from "./preciosPorPapel";
import { calcularDescuento } from "../utilidades/calcularDescuento";

const API_BASE = "https://api.impresionesatucasa.com.ar";

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
  const [cantidadCopias, setCantidadCopias] = useState(1);
  const [mostrarMensajeContacto, setMostrarMensajeContacto] = useState(false);

  // === LÓGICA DE PRECIOS ===
  const papelSelecionado = preciosPorPapel.find((p) => p.id == tipoPapel);
  const precioUnitario = papelSelecionado ? papelSelecionado.precio : 0;
  
  const paginasTotalesAImprimir = (totalPaginas || 0) * cantidadCopias;
  const descuento = calcularDescuento(paginasTotalesAImprimir);
  
  const precioSinDescuentoTotal = totalPaginas && tipoPapel ? paginasTotalesAImprimir * precioUnitario : null;
  const precioFinalTotal = precioSinDescuentoTotal ? Math.round(precioSinDescuentoTotal * (1 - descuento)) : null;

  const precioPorCopia = totalPaginas ? Math.round(precioFinalTotal / cantidadCopias) : 0;

  // Contar páginas PDF
  const manejarCambioArchivo = async (e) => {
    const archivoSeleccionado = e.target.files?.[0];
    if (!archivoSeleccionado) return;

    if (archivoSeleccionado.type !== "application/pdf") {
      setArchivo(null);
      setEstado("❌ Solo se aceptan archivos PDF.");
      setTotalPaginas(null);
      setCantidadCopias(1);
      return;
    }

    if (archivoSeleccionado.size > 100 * 1024 * 1024) {
      setArchivo(null);
      setEstado("❌ El archivo supera el tamaño máximo de 100MB.");
      setTotalPaginas(null);
      setCantidadCopias(1);
      return;
    }

    try {
      setEstado("⏳ Procesando páginas del PDF...");
      const reader = new FileReader();
      reader.onload = async (ev) => {
        const typedArray = new Uint8Array(ev.target.result);
        const pdf = await pdfjsLib.getDocument(typedArray).promise;
        setTotalPaginas(pdf.numPages);
        setCantidadCopias(1);
        setEstado(`✅ Archivo listo. Total páginas: ${pdf.numPages}`);
        setArchivo(archivoSeleccionado);
      };
      reader.readAsArrayBuffer(archivoSeleccionado);
    } catch (error) {
      console.error(error);
      setEstado("❌ Error al leer el archivo PDF.");
      setArchivo(null);
      setTotalPaginas(null);
      setCantidadCopias(1);
    }
  };

  // Agregar al carrito
  const manejarAgregarAlCarrito = () => {
    if (!archivo || !tipoPapel || !totalPaginas || !precioSinDescuentoTotal) {
      setEstado("⚠️ Faltan datos para agregar al carrito.");
      return;
    }

    const producto = {
      id: `${archivo.name}-${tipoPapel}-${totalPaginas}-${Date.now()}`,
      name: `Impresión PDF (${tipoPapel}) - ${totalPaginas} págs`,
      cantidad: cantidadCopias, 
      price: precioPorCopia, 
      detalles: {
        tipo: "impresion",
        archivo: archivo, 
        paginas: totalPaginas,
        papel: tipoPapel,
        copias: cantidadCopias
      },
    };

    agregarAlCarrito(producto);
    setEstado("🛒 Agregado al carrito correctamente.");
    
    setArchivo(null);
    setTotalPaginas(null);
    setCantidadCopias(1);
  };

  // Enviar pedido
  const manejarEnvio = async () => {
    if (!nombreCliente || !telefonoCliente || carrito.length === 0) {
      setEstado("⚠️ Faltan datos: cliente, teléfono o carrito vacío.");
      return;
    }

    const formData = new FormData();

    carrito.forEach((producto) => {
      formData.append("archivos", producto.detalles.archivo);
    });

    formData.append("cliente", nombreCliente.trim());
    formData.append("telefono", telefonoCliente.trim());
    formData.append("pedido", JSON.stringify({ items: carrito }));

    setEstado("⏳ Subiendo archivos y generando link de pago...");

    try {
      const response = await fetch(`${API_BASE}/api/pedidos`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("❌ Error en la respuesta del backend:", errorText);
        setEstado("❌ Error al procesar el pedido.");
        return;
      }

      const data = await response.json();
      setEstado("🚀 Redirigiéndote a Mercado Pago...");

      setArchivo(null);
      setTipoPapel("");
      setTotalPaginas(null);
      setCantidadCopias(1);
      setNombreCliente("");
      setTelefonoCliente("");
      vaciarCarrito();

      if (data.initPoint) {
        window.location.href = data.initPoint;
      } else {
        setMostrarMensajeContacto(true);
      }

    } catch (error) {
      console.error("❌ Error al enviar el pedido:", error);
      setEstado("❌ No se pudo contactar con el servidor.");
    }
  };

  return (
    // CONTENEDOR PRINCIPAL: Gradient violeta claro de día, y slate muy oscuro de noche
<div className="min-h-screen bg-linear-to-br from-violet-50 to-white dark:from-slate-900 dark:to-slate-950 flex items-center justify-center px-4 py-10 overflow-y-auto transition-colors duration-300">      <div className="flex flex-col md:flex-row flex-wrap gap-6 w-full max-w-4xl mx-auto">
        
        {/* TARJETA PRINCIPAL DEL FORMULARIO */}
        <div className="flex-1 w-full bg-white dark:bg-slate-800 rounded-xl shadow-xl dark:shadow-black/40 border border-transparent dark:border-slate-700 p-6 sm:p-8 transition-colors duration-300">
          
          {/* BANNER DE DESCUENTO */}
          <div className="bg-violet-50 dark:bg-violet-900/30 border border-violet-200 dark:border-violet-800/50 text-violet-700 dark:text-violet-300 my-4 text-sm sm:text-base font-medium px-4 py-2 rounded-lg shadow-sm text-center transition-colors duration-300">
            🎉 ¡Descuento automático desde 10 hojas en adelante!
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-violet-700 dark:text-violet-400 mb-4 text-center transition-colors duration-300">
            Subí tu archivo para imprimir
          </h2>

          {/* BANNER DE ADVERTENCIA (TAMAÑO A4) */}
          <div className="bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-800/50 text-yellow-700 dark:text-yellow-300 mb-6 text-sm sm:text-base font-medium px-4 py-2 rounded-lg shadow-sm text-center transition-colors duration-300">
            📐 Las hojas se imprimen en tamaño A4 (210 × 297 mm)
          </div>

          <div className="space-y-6 sm:space-y-4">
            
            <div className="relative">
              {/* COMPONENTE HIJO: Seguramente le pasemos el pincel en un rato */}
              <CargadorArchivo
                manejarCambioArchivo={manejarCambioArchivo}
                totalPaginas={totalPaginas}
              />
              
              {/* 🌟 SELECTOR DE COPIAS 🌟 */}
              {archivo && totalPaginas && (
                <div className="flex justify-end -mt-3 relative z-10 pr-2">
                  <div className="flex items-center gap-2 bg-white dark:bg-slate-800 border border-violet-200 dark:border-slate-600 py-1 px-2 rounded-lg shadow-sm transition-colors duration-300">
                    <span className="text-xs font-semibold text-violet-700 dark:text-violet-400">
                      Copias:
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => setCantidadCopias(Math.max(1, cantidadCopias - 1))}
                        className="bg-violet-50 dark:bg-slate-700 hover:bg-violet-200 dark:hover:bg-slate-600 text-violet-800 dark:text-slate-200 w-6 h-6 flex items-center justify-center rounded text-sm font-bold transition-colors duration-300"
                      >
                        -
                      </button>
                      <span className="font-bold text-sm w-4 text-center text-slate-800 dark:text-slate-100">
                        {cantidadCopias}
                      </span>
                      <button
                        type="button"
                        onClick={() => setCantidadCopias(cantidadCopias + 1)}
                        className="bg-violet-50 dark:bg-slate-700 hover:bg-violet-200 dark:hover:bg-slate-600 text-violet-800 dark:text-slate-200 w-6 h-6 flex items-center justify-center rounded text-sm font-bold transition-colors duration-300"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* COMPONENTES HIJOS */}
            <DatosCliente
              tipoPapel={tipoPapel}
              setTipoPapel={setTipoPapel}
              nombreCliente={nombreCliente}
              setNombreCliente={setNombreCliente}
              telefonoCliente={telefonoCliente}
              setTelefonoCliente={setTelefonoCliente}
            />
            
            <DetallePrecio
              totalPaginas={paginasTotalesAImprimir} 
              tipoPapel={tipoPapel}
              precioSinDescuento={precioSinDescuentoTotal}
              descuento={descuento}
              precioFinal={precioFinalTotal}
            />
            
            <FormularioEnvio
              manejarEnvio={manejarEnvio}
              manejarAgregarAlCarrito={manejarAgregarAlCarrito}
              estado={estado}
            />
            {mostrarMensajeContacto && <MensajeContacto />}
          </div>
        </div>

        {/* LISTA LATERAL DE PRECIOS */}
        <div className="w-full md:w-72 flex flex-col gap-4">
          <ListaPreciosPapel />
        </div>
      </div>
    </div>
  );
};

export default VistaFormulario;
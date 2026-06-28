"use client";

import { useState, useContext } from "react";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf";
import { GlobalContext } from "@/context/GlobalContext";
import { calcularDescuento } from "@/utilidades/calcularDescuento"; 
import preciosPorPapel from "@/utilidades/preciosPorPapel"; 

import CargadorArchivo from "./CargadorArchivo";
import DatosCliente from "./DatosCliente";
import DetallePrecio from "./DetallePrecio";
import FormularioEnvio from "./FormularioEnvio";
import ListaPreciosPapel from "./ListaPreciosPapel";
import MensajeEstado from "./MensajeEstado";

const workerUrl = new URL('pdfjs-dist/legacy/build/pdf.worker.min.mjs', import.meta.url);
pdfjsLib.GlobalWorkerOptions.workerSrc = workerUrl.toString();

export default function VistaFormulario() {
  const { 
    agregarAlCarrito, 
    nombreCliente, setNombreCliente, 
    telefonoCliente, setTelefonoCliente 
  } = useContext(GlobalContext);
  
  const [archivo, setArchivo] = useState<File | null>(null);
  const [totalPaginas, setTotalPaginas] = useState<number | null>(null);
  const [tipoPapel, setTipoPapel] = useState("");
  const [estado, setEstado] = useState<string>("");
  const [cantidadCopias, setCantidadCopias] = useState<number>(1); // <-- Estado de copias

  // --- 1. Lógica Matemática de Precios ---
  const papelSeleccionado = preciosPorPapel.find((p) => p.id === tipoPapel);
  const precioUnitario = papelSeleccionado?.precio || 0;
  
  const paginasTotalesAImprimir = (totalPaginas || 0) * cantidadCopias; 
  const precioSinDescuento = paginasTotalesAImprimir * precioUnitario;
  
  // Para la vista previa del formulario calculamos el descuento
  const descuentoPrevio = calcularDescuento(paginasTotalesAImprimir);
  
  // EL CAMBIO CLAVE: Para el carrito, necesitamos el precio base de UNA copia, SIN descuento.
  // El GlobalContext se encargará de aplicar el descuento al final.
  const precioBasePorCopia = (totalPaginas || 0) * precioUnitario;

  const manejarCambioArchivo = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setEstado("⏳ Procesando páginas...");
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      setTotalPaginas(pdf.numPages);
      setArchivo(file);
      setCantidadCopias(1); // Reseteamos copias al subir archivo nuevo
      setEstado(`✅ Archivo listo: ${pdf.numPages} páginas.`);
    } catch (err) {
      setEstado("❌ Error al procesar el PDF.");
    }
  };

  // --- 2. Función Real del Carrito ---
  const manejarAgregarAlCarrito = () => {
    if (!archivo || !tipoPapel || !totalPaginas) {
      setEstado("⚠️ Faltan datos (archivo o tipo de papel).");
      return;
    }

    // Armamos el producto tal cual lo exige TypeScript
    agregarAlCarrito({
      id: `${archivo.name}-${tipoPapel}-${totalPaginas}-${Date.now()}`,
      name: `Impresión PDF (${tipoPapel}) - ${totalPaginas} págs`,
      price: precioBasePorCopia,
      cantidad: cantidadCopias,
      detalles: { 
        tipo: 'impresion', 
        paginas: totalPaginas,
        // @ts-ignore - Ignoramos error temporal si File choca con el tipo
        archivo: archivo, 
        copias: cantidadCopias,
        papel:tipoPapel,
      }
    });

    setEstado("🛒 Agregado al carrito correctamente.");
    setArchivo(null);
    setTotalPaginas(null);
    setCantidadCopias(1);
    setTipoPapel("");
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 items-start justify-center max-w-6xl mx-auto px-4 py-10">
      
      {/* COLUMNA IZQUIERDA: FORMULARIO */}
      <div className="flex-1 w-full max-w-2xl bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg border border-violet-100 dark:border-slate-700 transition-colors duration-300">
        <h2 className="text-2xl font-bold text-violet-700 dark:text-violet-400 mb-6 text-center">
          Subí tu archivo para imprimir
        </h2>
        
        <div className="space-y-6">
          <div className="relative">
            <CargadorArchivo manejarCambioArchivo={manejarCambioArchivo} totalPaginas={totalPaginas} />
            
            {/* CONTADOR DE COPIAS */}
            {archivo && totalPaginas && (
              <div className="flex justify-end -mt-3 relative z-10 pr-2">
                <div className="flex items-center gap-2 bg-white dark:bg-slate-800 border border-violet-200 dark:border-slate-600 py-1 px-2 rounded-lg shadow-sm transition-colors duration-300">
                  <span className="text-xs font-semibold text-violet-700 dark:text-violet-400">Copias:</span>
                  <div className="flex items-center gap-1">
                    <button type="button" onClick={() => setCantidadCopias(Math.max(1, cantidadCopias - 1))} className="bg-violet-50 dark:bg-slate-700 hover:bg-violet-200 dark:hover:bg-slate-600 text-violet-800 dark:text-slate-200 w-6 h-6 flex items-center justify-center rounded text-sm font-bold transition-colors duration-300">-</button>
                    <span className="font-bold text-sm w-4 text-center text-slate-800 dark:text-slate-100">{cantidadCopias}</span>
                    <button type="button" onClick={() => setCantidadCopias(cantidadCopias + 1)} className="bg-violet-50 dark:bg-slate-700 hover:bg-violet-200 dark:hover:bg-slate-600 text-violet-800 dark:text-slate-200 w-6 h-6 flex items-center justify-center rounded text-sm font-bold transition-colors duration-300">+</button>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <DatosCliente 
  tipoPapel={tipoPapel} 
  setTipoPapel={setTipoPapel} 
/>

          <MensajeEstado estado={estado} />
          
          <DetallePrecio 
            totalPaginas={paginasTotalesAImprimir} // Pasamos el total multiplicado
            tipoPapel={tipoPapel || null} 
            precioSinDescuento={precioSinDescuento} 
            descuento={descuentoPrevio}
          />
          
          <FormularioEnvio 
            estado={estado}
            manejarAgregarAlCarrito={manejarAgregarAlCarrito}
            manejarEnvio={async () => {
              //console.log("Iniciando flujo de pago...");
            }}
          />
        </div>
      </div>

      {/* COLUMNA DERECHA: CARRITO Y PRECIOS */}
      <div className="w-full md:w-80 flex flex-col gap-6">
        <ListaPreciosPapel />
      </div>
    </div>
  );
}
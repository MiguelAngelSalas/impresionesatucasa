// src/components/VistaFormulario.tsx (o la ruta donde lo tengas)

"use client";

import { useState, useContext } from "react";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf";
import { GlobalContext } from "@/context/GlobalContext";
import { calcularDescuento } from "@/utilidades/calcularDescuento"; 
import preciosPorPapel from "@/utilidades/preciosPorPapel"; 
import { calcularAnillado } from "@/utilidades/anillados"; 

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
  const [cantidadCopias, setCantidadCopias] = useState<number>(1); 
  const [quiereAnillado, setQuiereAnillado] = useState(false);

  // --- 1. Lógica Matemática de Precios ---
  const papelSeleccionado = preciosPorPapel.find((p) => p.id === tipoPapel);
  const precioUnitario = papelSeleccionado?.precio || 0;
  
  const paginasTotalesAImprimir = (totalPaginas || 0) * cantidadCopias; 
  const precioSinDescuento = paginasTotalesAImprimir * precioUnitario;
  const descuentoPrevio = calcularDescuento(paginasTotalesAImprimir);
  const precioBasePorCopia = (totalPaginas || 0) * precioUnitario;

  // Lógica de Anillado en tiempo real
  const anilladoRecomendado = calcularAnillado(totalPaginas || 0);
  const costoAnillado = quiereAnillado && anilladoRecomendado ? anilladoRecomendado.precio : 0;

  const manejarCambioArchivo = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setEstado("⏳ Procesando páginas...");
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      setTotalPaginas(pdf.numPages);
      setArchivo(file);
      setCantidadCopias(1); 
      setQuiereAnillado(false); // Reseteamos el anillado por las dudas
      setEstado(`✅ Archivo listo: ${pdf.numPages} páginas.`);
    } catch (err) {
      setEstado("❌ Error al procesar el PDF.");
    }
  };

  // --- 2. Función Real del Carrito ---
  const manejarAgregarAlCarrito = (datosExtras: { quiereAnillado: boolean, costoAnillado: number }) => {
    if (!archivo || !tipoPapel || !totalPaginas) {
      setEstado("⚠️ Faltan datos (archivo o tipo de papel).");
      return;
    }

    // Le sumamos al precio base el costo del anillado (si lo pidió)
    const precioBaseFinal = precioBasePorCopia + datosExtras.costoAnillado;
    const extraNombre = datosExtras.quiereAnillado ? '+ Anillado' : '';

    agregarAlCarrito({
      id: `${archivo.name}-${tipoPapel}-${totalPaginas}-${Date.now()}`,
      name: `Impresión PDF (${tipoPapel}) - ${totalPaginas} págs ${extraNombre}`,
      price: precioBaseFinal,
      cantidad: cantidadCopias,
      detalles: { 
        tipo: 'impresion', 
        paginas: totalPaginas,
        // @ts-ignore
        archivo: archivo, 
        copias: cantidadCopias,
        papel: tipoPapel,
        quiereAnillado: datosExtras.quiereAnillado,
        costoAnillado: datosExtras.costoAnillado
      }
    });

    setEstado("🛒 Agregado al carrito correctamente.");
    setArchivo(null);
    setTotalPaginas(null);
    setCantidadCopias(1);
    setTipoPapel("");
    setQuiereAnillado(false);
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
            totalPaginas={paginasTotalesAImprimir}
            tipoPapel={tipoPapel || null} 
            precioSinDescuento={precioSinDescuento} 
            descuento={descuentoPrevio}
            quiereAnillado={quiereAnillado}
            costoAnillado={costoAnillado}
          />
          
          <FormularioEnvio 
            estado={estado}
            cantidadHojas={totalPaginas || 0} 
            manejarAgregarAlCarrito={manejarAgregarAlCarrito}
            manejarEnvio={async () => {}}
            quiereAnillado={quiereAnillado}
            setQuiereAnillado={setQuiereAnillado}
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
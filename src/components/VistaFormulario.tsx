// src/components/VistaFormulario.tsx
"use client";

import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf";
import { GlobalContext } from "@/context/GlobalContext";
import { calcularDescuento } from "@/utilidades/calcularDescuento"; 
import preciosPorPapel from "@/utilidades/preciosPorPapel"; 
import { calcularAnillado } from "@/utilidades/anillados"; 
import toast from "react-hot-toast";

import CargadorArchivo from "./CargadorArchivo";
import DatosCliente from "./DatosCliente";
import DetallePrecio from "./DetallePrecio";
import FormularioEnvio from "./FormularioEnvio";
import ListaPreciosPapel from "./ListaPreciosPapel";
import MensajeEstado from "./MensajeEstado";

const workerUrl = new URL('pdfjs-dist/legacy/build/pdf.worker.min.mjs', import.meta.url);
pdfjsLib.GlobalWorkerOptions.workerSrc = workerUrl.toString();

export default function VistaFormulario() {
  const router = useRouter(); 
  
  const { 
    agregarAlCarrito, 
    nombreCliente, setNombreCliente, 
    telefonoCliente, setTelefonoCliente 
  } = useContext(GlobalContext);
  
  // --- ESTADOS MULTIFORMATO ---
  const [archivosGuardados, setArchivosGuardados] = useState<File[]>([]);
  const [esPDF, setEsPDF] = useState(false);
  
  // --- ESTADO DEL VISOR ESTILO WINDOWS ---
  const [fotosPorHoja, setFotosPorHoja] = useState<number>(2); 

  const [totalPaginas, setTotalPaginas] = useState<number | null>(null);
  const [tipoPapel, setTipoPapel] = useState("");
  const [estado, setEstado] = useState<string>("");
  const [cantidadCopias, setCantidadCopias] = useState<number>(1); 
  const [quiereAnillado, setQuiereAnillado] = useState(false);
  
  // NUEVO: Estado para saber si el toast de anillado está abierto
  const [esperandoConfirmacionAnillado, setEsperandoConfirmacionAnillado] = useState(false);

  // --- RECALCULO AUTOMÁTICO DE HOJAS ---
  useEffect(() => {
    if (!esPDF && archivosGuardados.length > 0) {
      const hojasCalculadas = Math.ceil(archivosGuardados.length / fotosPorHoja);
      setTotalPaginas(hojasCalculadas);
      setEstado(`✅ Listo: ${archivosGuardados.length} fotos (Ocupan ${hojasCalculadas} hojas A4 base).`);
    }
  }, [fotosPorHoja, archivosGuardados, esPDF]);

  // --- MATEMÁTICA DE PRECIOS EXACTA ---
  const papelSeleccionado = preciosPorPapel.find((p) => p.id === tipoPapel);
  const precioUnitario = papelSeleccionado?.precio || 0;
  
  // 1. Páginas totales para cobrar la TINTA / IMPRESIÓN
  const paginasTotalesAImprimir = esPDF
      ? (totalPaginas || 0) * cantidadCopias
      : Math.ceil((archivosGuardados.length * cantidadCopias) / fotosPorHoja);

  // 2. Hojas FÍSICAS de UNA SOLA COPIA para calcular el grosor del ANILLADO
  // Si es PDF, dividimos por 2 (redondeando arriba) porque va doble faz.
  const hojasFisicasPorCopia = esPDF 
      ? Math.ceil((totalPaginas || 0) / 2) 
      : Math.ceil(archivosGuardados.length / fotosPorHoja);

  const precioSinDescuento = paginasTotalesAImprimir * precioUnitario;
  const descuentoPrevio = calcularDescuento(paginasTotalesAImprimir);
  const precioBasePorCopia = paginasTotalesAImprimir * precioUnitario;

  // 3. Calculamos el anillado usando el grosor de UNA copia física
  const anilladoRecomendado = calcularAnillado(hojasFisicasPorCopia);
  const costoAnillado = quiereAnillado && anilladoRecomendado ? anilladoRecomendado.precio : 0;

  // --- FUNCIÓN DE GUARDADO FINAL ---
  const ejecutarGuardadoEnCarrito = (opcionesAnillado: { quiereAnillado: boolean, costoAnillado: number, multiplicarAnillado: boolean }) => {
    const precioBaseFinal = precioBasePorCopia + opcionesAnillado.costoAnillado;
    
    let extraNombre = '';
    if (opcionesAnillado.quiereAnillado) {
      extraNombre = opcionesAnillado.multiplicarAnillado 
        ? `+ Anillado x${cantidadCopias} (Todas las copias)` 
        : '+ Anillado (1 ejemplar)';
    }

    const nombreProducto = esPDF 
        ? 'Impresión PDF' 
        : `Impresión Fotos (x${fotosPorHoja} por hoja) - Total: ${paginasTotalesAImprimir} planchas`;

    const descripcionesTamano: Record<number, string> = {
      1: "Página completa (1 foto por hoja A4)",
      2: "10 x 15 cm o 13 x 18 cm (2 fotos por hoja A4)",
      4: "9 x 13 cm (4 fotos por hoja A4)",
      9: "Billetera / Contacto (9 fotos por hoja A4)",
      35: "Miniaturas (35 fotos por hoja A4)"
    };
    
    const textoTamañoElegido = esPDF ? "Documento PDF (A4 Estandar)" : (descripcionesTamano[fotosPorHoja] || `Fotos x${fotosPorHoja} por hoja`);

    agregarAlCarrito({
      id: `${archivosGuardados[0].name}-${tipoPapel}-${Date.now()}`,
      name: `${nombreProducto} - ${tipoPapel} ${extraNombre}`,
      price: precioBaseFinal,
      cantidad: 1, 
      detalles: { 
        tipo: 'impresion', 
        paginas: paginasTotalesAImprimir, 
        // @ts-ignore
        archivos: archivosGuardados, 
        esPDF: esPDF,
        copias: cantidadCopias,
        papel: tipoPapel,
        quiereAnillado: opcionesAnillado.quiereAnillado,
        costoAnillado: opcionesAnillado.costoAnillado,
        tamanioSeleccionado: textoTamañoElegido
      }
    });

    setEstado("🛒 Preparando tu carrito...");
    router.push("/carrito"); 
  };

  // --- EFECTO REACTIVO PARA EL TOAST ---
  useEffect(() => {
    if (esperandoConfirmacionAnillado) {
      if (cantidadCopias <= 1) {
        toast.dismiss("toast-anillado-reactivo");
        setEsperandoConfirmacionAnillado(false);
        return;
      }

      toast((t) => (
        <div className="flex flex-col gap-2">
          <p className="font-semibold text-sm text-slate-800 dark:text-slate-100">
            Pediste {cantidadCopias} copias con anillado. ¿Cómo querés aplicarlo?
          </p>
          <div className="flex flex-col gap-2 mt-1">
            <div className="flex gap-2">
              <button
                className="bg-violet-600 text-white px-3 py-1.5 rounded text-xs font-bold hover:bg-violet-700 cursor-pointer flex-1"
                onClick={() => {
                  toast.dismiss(t.id);
                  setEsperandoConfirmacionAnillado(false);
                  ejecutarGuardadoEnCarrito({
                    quiereAnillado: true,
                    costoAnillado: costoAnillado * cantidadCopias,
                    multiplicarAnillado: true
                  });
                }}
              >
                Anillar todas (x{cantidadCopias})
              </button>
              <button
                className="bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 px-3 py-1.5 rounded text-xs font-bold hover:bg-slate-300 cursor-pointer flex-1"
                onClick={() => {
                  toast.dismiss(t.id);
                  setEsperandoConfirmacionAnillado(false);
                  ejecutarGuardadoEnCarrito({
                    quiereAnillado: true,
                    costoAnillado: costoAnillado,
                    multiplicarAnillado: false
                  });
                }}
              >
                Solo 1 anillado
              </button>
            </div>
            <button
              className="text-gray-400 hover:text-gray-600 dark:text-gray-500 text-xs underline cursor-pointer self-center mt-1"
              onClick={() => {
                toast.dismiss(t.id);
                setEsperandoConfirmacionAnillado(false);
              }}
            >
              Cancelar
            </button>
          </div>
        </div>
      ), { id: "toast-anillado-reactivo", duration: Infinity });
    }
  }, [cantidadCopias, costoAnillado, esperandoConfirmacionAnillado]);

  // --- PROCESADOR DE ARCHIVOS ---
  const manejarCambioArchivo = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    if (files[0].type === "application/pdf") {
      try {
        setEstado("⏳ Procesando PDF...");
        const arrayBuffer = await files[0].arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        
        setArchivosGuardados(files);
        setEsPDF(true);
        setTotalPaginas(pdf.numPages);
        setCantidadCopias(1); 
        setQuiereAnillado(false);
        setEstado(`✅ Archivo listo: PDF de ${pdf.numPages} páginas.`);
      } catch (err) {
        setEstado("❌ Error al procesar el PDF.");
      }
      return;
    }

    const soloImagenes = files.filter(file => file.type.startsWith("image/"));
    if (soloImagenes.length > 0) {
      setEstado("⏳ Calculando fotos...");
      setArchivosGuardados(soloImagenes);
      setEsPDF(false);
      setCantidadCopias(1);
      setQuiereAnillado(false);
    } else {
      setEstado("❌ Formato no válido. Subí imágenes o un PDF.");
    }
  };

  // --- BOTÓN AGREGAR AL CARRITO ---
  const manejarAgregarAlCarrito = (datosExtras: { quiereAnillado: boolean, costoAnillado: number }) => {
    if (archivosGuardados.length === 0 || !tipoPapel || !totalPaginas) {
      setEstado("⚠️ Faltan datos (archivo o tipo de papel).");
      return;
    }

    if (datosExtras.quiereAnillado && cantidadCopias > 1 && datosExtras.costoAnillado > 0) {
      setEsperandoConfirmacionAnillado(true);
    } else {
      ejecutarGuardadoEnCarrito({
        quiereAnillado: datosExtras.quiereAnillado,
        costoAnillado: datosExtras.costoAnillado,
        multiplicarAnillado: false
      });
    }
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
            
            {/* SELECTOR DE TAMAÑO ESTILO WINDOWS */}
            {archivosGuardados.length > 0 && !esPDF && (
              <div className="mt-6 flex flex-col gap-2 bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                <label className="text-sm font-semibold text-violet-700 dark:text-violet-400">
                  ¿A qué tamaño querés imprimir las fotos?
                </label>
                <select 
                  className="p-2.5 border rounded-lg bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 outline-none focus:border-violet-500"
                  value={fotosPorHoja}
                  onChange={(e) => setFotosPorHoja(parseInt(e.target.value))}
                >
                  <option value="1">Página completa (1 foto por hoja A4)</option>
                  <option value="2">10 x 15 cm o 13 x 18 cm (2 fotos por hoja A4)</option>
                  <option value="4">9 x 13 cm (4 fotos por hoja A4)</option>
                  <option value="9">Billetera / Contacto (9 fotos por hoja A4)</option>
                  <option value="35">Miniaturas (35 fotos por hoja A4)</option>
                </select>
              </div>
            )}

            {/* CONTADOR DE COPIAS */}
            {archivosGuardados.length > 0 && totalPaginas && (
              <div className="flex justify-end mt-4 pr-2">
                <div className="flex items-center gap-2 bg-white dark:bg-slate-800 border border-violet-200 dark:border-slate-600 py-1.5 px-3 rounded-lg shadow-sm">
                  <span className="text-xs font-semibold text-violet-700 dark:text-violet-400">{!esPDF ? "Copias por foto" : "Copias del PDF"}</span>
                  <div className="flex items-center gap-1">
                    <button type="button" onClick={() => setCantidadCopias(Math.max(1, cantidadCopias - 1))} className="bg-violet-50 dark:bg-slate-700 hover:bg-violet-200 dark:hover:bg-slate-600 text-violet-800 dark:text-slate-200 w-7 h-7 flex items-center justify-center rounded text-sm font-bold">-</button>
                    <span className="font-bold text-sm w-6 text-center text-slate-800 dark:text-slate-100">{cantidadCopias}</span>
                    <button type="button" onClick={() => setCantidadCopias(cantidadCopias + 1)} className="bg-violet-50 dark:bg-slate-700 hover:bg-violet-200 dark:hover:bg-slate-600 text-violet-800 dark:text-slate-200 w-7 h-7 flex items-center justify-center rounded text-sm font-bold">+</button>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <DatosCliente tipoPapel={tipoPapel} setTipoPapel={setTipoPapel} />
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
            // 👈 PASAMOS LAS HOJAS FÍSICAS DE 1 COPIA PARA QUE EL COMPONENTE NO SE ROMPA CON LOS LÍMITES (Ej: 500 hojas)
            cantidadHojas={hojasFisicasPorCopia || 0} 
            manejarAgregarAlCarrito={manejarAgregarAlCarrito}
            manejarEnvio={async () => {}}
            quiereAnillado={quiereAnillado}
            setQuiereAnillado={setQuiereAnillado}
          />
        </div>
      </div>

      {/* COLUMNA DERECHA: PRECIOS */}
      <div className="w-full md:w-80 flex flex-col gap-6">
        <ListaPreciosPapel />
      </div>
    </div>
  );
}
// src/components/SeccionCodigo.tsx
"use client";

import { useState, useContext } from "react";
import { Tag, CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { GlobalContext } from "@/context/GlobalContext";

export default function SeccionCodigo() {
  // Traemos codigoAplicado del contexto para guardarlo
  const { envioGratis, setEnvioGratis, codigoAplicado, setCodigoAplicado } = useContext(GlobalContext);
  
  const [mostrarInput, setMostrarInput] = useState(false);
  const [codigo, setCodigo] = useState("");
  // Agregamos el estado "cargando" para la petición al servidor
  const [estadoValidacion, setEstadoValidacion] = useState<"idle" | "cargando" | "exito" | "error">("idle");
  const [mensajeError, setMensajeError] = useState(""); 

  const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

  const validarCodigo = async () => {
    const codigoIngresado = codigo.trim().toUpperCase();
    if (!codigoIngresado) return;
    
    setEstadoValidacion("cargando");

    try {
      // Le preguntamos al backend si el código está libre en el .json
      const response = await fetch(`${API_BASE}/api/pedidos/cupones/validar?codigo=${codigoIngresado}`);
      const data = await response.json();

      if (data.valido) {
        setEnvioGratis(true);
        if (setCodigoAplicado) setCodigoAplicado(codigoIngresado);
        setEstadoValidacion("exito");
      } else {
        setEnvioGratis(false);
        if (setCodigoAplicado) setCodigoAplicado("");
        setMensajeError(data.error || "Código inválido");
        setEstadoValidacion("error");
      }
    } catch (error) {
      setEnvioGratis(false);
      if (setCodigoAplicado) setCodigoAplicado("");
      setMensajeError("Error de conexión con el servidor.");
      setEstadoValidacion("error");
    }
  };

  return (
    <div className="mt-4 border-t border-violet-100 dark:border-slate-700 pt-4 transition-all duration-300">
      
      {!mostrarInput && !envioGratis && (
        <button
          onClick={() => setMostrarInput(true)}
          className="flex items-center gap-2 text-violet-600 dark:text-violet-400 hover:text-violet-800 dark:hover:text-violet-300 font-medium text-sm transition-colors"
        >
          <Tag size={18} />
          ¿Tenés un código de envío gratis?
        </button>
      )}

      {mostrarInput && !envioGratis && (
        <div className="flex flex-col gap-2 animate-in fade-in slide-in-from-top-2 duration-300">
          <label className="text-sm text-gray-600 dark:text-gray-300 font-medium">
            Ingresá tu código:
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={codigo}
              onChange={(e) => {
                setCodigo(e.target.value);
                setEstadoValidacion("idle");
              }}
              disabled={estadoValidacion === "cargando"}
              placeholder="Ej: BIENVENIDO10"
              className="flex-1 px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-violet-500 outline-none uppercase disabled:opacity-50"
            />
            <button
              onClick={validarCodigo}
              disabled={estadoValidacion === "cargando"}
              className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 flex items-center justify-center min-w-20"
            >
              {estadoValidacion === "cargando" ? <Loader2 size={18} className="animate-spin" /> : "Aplicar"}
            </button>
          </div>
          
          {estadoValidacion === "error" && (
            <div className="flex items-center gap-1 text-red-500 text-sm mt-1">
              <XCircle size={14} />
              <span>{mensajeError}</span>
            </div>
          )}
        </div>
      )}

      {/* Mensaje de Éxito cuando ya se aplicó */}
      {envioGratis && (
        <div className="flex items-center justify-between bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 p-3 rounded-lg animate-in fade-in zoom-in duration-300">
          <div className="flex items-center gap-2 text-green-700 dark:text-green-400">
            <CheckCircle2 size={20} />
            {/* Ahora muestra dinámicamente qué código se usó */}
            <span className="font-medium text-sm">¡Código {codigoAplicado} aplicado!</span>
          </div>
          <button
            onClick={() => {
              setEnvioGratis(false);
              if (setCodigoAplicado) setCodigoAplicado("");
              setCodigo("");
              setMostrarInput(false);
              setEstadoValidacion("idle");
            }}
            className="text-gray-400 hover:text-red-500 transition-colors"
            title="Quitar código"
          >
            <XCircle size={18} />
          </button>
        </div>
      )}
      
    </div>
  );
}
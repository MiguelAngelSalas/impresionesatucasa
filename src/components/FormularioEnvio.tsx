// src/components/FormularioEnvio.tsx

import MensajeEstado from "./MensajeEstado";
import { calcularAnillado } from "@/utilidades/anillados";

interface FormularioEnvioProps {
  manejarEnvio: () => void;
  manejarAgregarAlCarrito: (datosExtras: { quiereAnillado: boolean, costoAnillado: number }) => void;
  estado: string;
  cantidadHojas: number;
  quiereAnillado: boolean;
  setQuiereAnillado: (valor: boolean) => void;
}

export default function FormularioEnvio({ 
  manejarEnvio, 
  manejarAgregarAlCarrito, 
  estado,
  cantidadHojas,
  quiereAnillado,
  setQuiereAnillado
}: FormularioEnvioProps) {
  
  const anilladoRecomendado = calcularAnillado(cantidadHojas);
  const excedeLimite = cantidadHojas > 0 && !anilladoRecomendado;

  const alHacerClickCarrito = () => {
    manejarAgregarAlCarrito({
      quiereAnillado,
      costoAnillado: quiereAnillado && anilladoRecomendado ? anilladoRecomendado.precio : 0
    });
  };

  return (
    <div className="space-y-4">
      {/* SECCIÓN DE ANILLADO */}
      <div className="bg-white dark:bg-slate-800 p-4 border border-violet-100 dark:border-slate-700 rounded-lg shadow-sm">
        <label className="flex items-start space-x-3 cursor-pointer">
          <input
            type="checkbox"
            checked={quiereAnillado}
            onChange={(e) => setQuiereAnillado(e.target.checked)}
            disabled={excedeLimite || cantidadHojas === 0}
            className="mt-1 w-5 h-5 text-violet-600 rounded border-gray-300 focus:ring-violet-500 dark:border-slate-600 dark:bg-slate-700 disabled:opacity-50"
          />
          <div className="flex flex-col">
            <span className="text-gray-800 dark:text-gray-200 font-medium">
              Anillado
            </span>
            
            
            {cantidadHojas === 0 ? (
              <span className="text-sm text-gray-500">
                Ingresá la cantidad de hojas primero.
              </span>
            ) : excedeLimite ? (
              <span className="text-sm text-red-500 font-medium">
                Supera el límite máximo para anillar (500 hojas).
              </span>
            ) : anilladoRecomendado ? (
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Corresponde a {anilladoRecomendado.nombre}. 
                <strong className="text-violet-600 dark:text-violet-400 ml-1">
                  +${anilladoRecomendado.precio}
                </strong>
              </span>
            ) : null}
          </div>
        </label>
      </div>

      <button
        onClick={alHacerClickCarrito}
        disabled={quiereAnillado && excedeLimite}
        className="w-full bg-violet-600 dark:bg-violet-700 hover:bg-violet-700 dark:hover:bg-violet-600 text-white font-bold py-3 px-4 rounded-lg shadow-md dark:shadow-black/40 transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
      >
        🛒 Agregar al carrito
      </button>
      
      <MensajeEstado estado={estado} />
    </div>
  );
}
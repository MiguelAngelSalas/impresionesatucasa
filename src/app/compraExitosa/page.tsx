"use client"
import Link from "next/link";
// Cambiamos Bike por Truck
import { Suspense,useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle2, FileText, PackageCheck, Truck } from "lucide-react"; 


function ContenidoExitoso() {

  const router = useRouter()
  const serchParams = useSearchParams()

  const [autorizado, setAutorizado] = useState(false)
    const estadoPago = serchParams.get("collections_status")

    const pagoAprovado = estadoPago==="approved"
  useEffect(()=>{
    
    
    if (!pagoAprovado){
        router.push("/");
    }
  }, [pagoAprovado, router])
  if (!pagoAprovado){
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-900">
        <div className="animate-pulse flex flex-col items-center">
           {/* Un texto de carga sutil para que no quede la pantalla en blanco */}
           <p className="text-violet-600 dark:text-violet-400 font-medium mt-4">Validando seguridad...</p>
        </div>
      </div>
    );
  }
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 transition-colors duration-300">
      
      <div className="bg-white dark:bg-slate-800 border border-violet-200 dark:border-slate-700 rounded-xl shadow-lg dark:shadow-black/40 p-8 sm:p-12 text-center transition-all duration-300 hover:shadow-xl">
        
        <div className="flex justify-center mb-6">
          <CheckCircle2 className="w-16 h-16 text-green-500 dark:text-green-400 animate-bounce" />
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-violet-800 dark:text-violet-400 tracking-tight transition-colors duration-300">
          ¡Pedido confirmado!
        </h1>
        <p className="text-base sm:text-lg text-gray-700 dark:text-slate-300 mb-8 max-w-2xl mx-auto transition-colors duration-300">
          Tu pago se procesó correctamente y ya recibimos tus archivos para imprimir.
        </p>

        <div className="bg-violet-50 dark:bg-slate-900/50 border border-violet-100 dark:border-violet-900 rounded-lg p-6 sm:p-8 text-left mb-8 max-w-2xl mx-auto inline-block w-full">
          <h2 className="text-xl sm:text-2xl font-semibold text-violet-700 dark:text-violet-300 mb-6 transition-colors duration-300 text-center sm:text-left">
            ¿Qué sigue ahora?
          </h2>
          
          <ul className="space-y-4">
            <li className="flex items-center text-gray-700 dark:text-slate-300 transition-colors duration-300">
              {/* Icono con soporte oscuro: text-violet-600 en luz, dark:text-violet-400 en sombra */}
              <FileText className="w-6 h-6 text-violet-600 dark:text-violet-400 mr-4 shrink-0" />
              <span>Revisamos que el formato de tus documentos sea el correcto.</span>
            </li>
            
            <li className="flex items-center text-gray-700 dark:text-slate-300 transition-colors duration-300">
              <PackageCheck className="w-6 h-6 text-violet-600 dark:text-violet-400 mr-4 shrink-0" />
              <span>Imprimimos y empaquetamos tu pedido con el papel seleccionado.</span>
            </li>
            
            <li className="flex items-center text-gray-700 dark:text-slate-300 transition-colors duration-300 font-medium">
              {/* ACÁ ESTÁ EL CAMIÓN */}
              <Truck className="w-6 h-6 text-violet-600 dark:text-violet-400 mr-4 shrink-0" />
              <span>Te avisamos por WhatsApp apenas tu pedido sale para el domicilio.</span>
            </li>
          </ul>
        </div>

        <p className="text-sm sm:text-base text-gray-500 dark:text-slate-400 mb-10 max-w-xl mx-auto transition-colors duration-300">
          Si tenés alguna duda o querés sumar algo de último momento, escribinos a nuestro WhatsApp adjuntando el comprobante de pago.
        </p>

        <Link href="/">
          <button 
            type="button"
            className="inline-block bg-violet-600 hover:bg-violet-700 dark:bg-violet-500 dark:hover:bg-violet-600 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-offset-2 dark:focus:ring-offset-slate-800"
          >
            Volver al inicio
          </button>
        </Link>
        
      </div>
    </main>
  );
}

export default function CompraExitosa(){
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-900">
                <p className="text-violet-600 dark:text-violet-400 font-medium animate-pulse">Cargando...</p>
            </div>
        }>
            <ContenidoExitoso/>
        </Suspense>
    )
}
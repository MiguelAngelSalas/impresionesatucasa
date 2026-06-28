"use client";

import { useContext, useState } from "react";
import { GlobalContext } from "@/context/GlobalContext";
import { Trash2, CheckCircle, ShoppingBag, User, Phone, Loader2 } from "lucide-react";

const formatoPrecio = (valor: number) =>
  valor.toLocaleString("es-AR", { style: "currency", currency: "ARS" });

export default function ResumenCarrito() {
  const [cargando, setCargando] = useState(false); // Estado para bloquear el botón

  const { 
    carrito, 
    eliminarDelCarrito, 
    manejarEnviarPedido,
    nombreCliente, setNombreCliente,
    telefonoCliente, setTelefonoCliente,
    totalPaginas,
    totalImpresionesSinDescuento,
    descuento,
    totalFinal
  } = useContext(GlobalContext);

  const ejecutarPago = async () => {
    setCargando(true);
    try {
      await manejarEnviarPedido();
    } finally {
      // Si el pedido falla, liberamos el botón para que pueda reintentar
      // Si el pedido tiene éxito, la redirección a MP lo sacará de esta pantalla
      setCargando(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border border-violet-200 dark:border-slate-700">
      <h2 className="text-2xl font-bold text-violet-700 dark:text-violet-400 mb-6 text-center flex items-center justify-center gap-2">
        <ShoppingBag /> Resumen del Carrito
      </h2>

      {(carrito?.length ?? 0) === 0 ? (
        <p className="text-gray-500 dark:text-slate-400 text-center">El carrito está vacío</p>
      ) : (
        <>
          <ul className="divide-y divide-gray-200 dark:divide-slate-700">
            {carrito.map((item) => (
              <li key={item.id} className="py-4 flex justify-between items-center">
                <div>
                  <p className="font-semibold text-gray-800 dark:text-slate-100">{item.name}</p>
                  <p className="text-sm text-gray-600 dark:text-slate-300">
                    {item.detalles?.tipo === "impresion" 
                      ? `${item.detalles?.paginas} pág × ${item.cantidad} (${item.detalles?.papel})` 
                      : `${item.cantidad} resma(s)`}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-bold text-violet-700 dark:text-violet-400">
                    {formatoPrecio(item.price * item.cantidad)}
                  </span>
                  <button 
                    onClick={() => eliminarDelCarrito(item.id)} 
                    disabled={cargando}
                    className="text-red-500 hover:text-red-700 disabled:opacity-50"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-6 border-t pt-4 space-y-4">
            <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300">Tus datos para el pedido:</h3>
            
            <div className="relative">
              <User className="absolute left-3 top-3 text-slate-400" size={18} />
              <input 
                type="text"
                placeholder="Nombre y Apellido"
                value={nombreCliente}
                disabled={cargando}
                onChange={(e) => setNombreCliente(e.target.value)}
                className="w-full pl-10 p-2.5 border rounded-lg dark:bg-slate-700 dark:border-slate-600 outline-none focus:ring-2 focus:ring-violet-500 disabled:opacity-50"
              />
            </div>

            <div className="relative">
              <Phone className="absolute left-3 top-3 text-slate-400" size={18} />
              <input 
                type="tel"
                placeholder="WhatsApp (ej: 1122334455)"
                value={telefonoCliente}
                disabled={cargando}
                onChange={(e) => setTelefonoCliente(e.target.value)}
                className="w-full pl-10 p-2.5 border rounded-lg dark:bg-slate-700 dark:border-slate-600 outline-none focus:ring-2 focus:ring-violet-500 disabled:opacity-50"
              />
            </div>
          </div>

          <div className="mt-6 border-t pt-4 text-sm space-y-2">
            <p>Total páginas: <strong>{totalPaginas}</strong></p>
            <p>Subtotal: <strong>{formatoPrecio(totalImpresionesSinDescuento)}</strong></p>
            <p>Descuento aplicado: <strong>{(descuento * 100).toFixed(0)}%</strong></p>
            <p className="text-lg font-bold text-violet-800 dark:text-violet-300">
              Total a pagar: {formatoPrecio(totalFinal)}
            </p>
          </div>

          <button 
            onClick={ejecutarPago}
            disabled={cargando}
            className={`w-full mt-6 py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-all ${
              cargando 
                ? "bg-gray-400 cursor-not-allowed" 
                : "bg-green-600 hover:bg-green-700 text-white"
            }`}
          >
            {cargando ? (
              <>
                <Loader2 className="animate-spin" size={20} /> Procesando pedido...
              </>
            ) : (
              <>
                <CheckCircle size={20} /> Pagar y Enviar Pedido
              </>
            )}
          </button>
        </>
      )}
    </div>
  );
}
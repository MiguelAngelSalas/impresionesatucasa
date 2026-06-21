import React, { useEffect, useState } from "react";
import { API_URL } from "../servicios/api";
import { toast } from "react-hot-toast";

// Importamos la info de precios y descuentos para hacer la matemática acá adentro
import preciosPorPapel from "./preciosPorPapel";
import { calcularDescuento } from "../utilidades/calcularDescuento";

const formatoPrecio = (valor) =>
  valor.toLocaleString("es-AR", { style: "currency", currency: "ARS" });

const calcularPrecioResma = (item) => {
  const cantidad = item.cantidad || 1;
  const pagadas = cantidad - Math.floor(cantidad / 5); // Promo 5x4
  return item.price * pagadas;
};

const calcularPrecioImpresion = (item) => {
  return item.price * (item.cantidad || 1);
};

const ResumenCarrito = ({
  carrito,
  nombreCliente,
  telefonoCliente,
  removeFromCart,
  vaciarCarrito,
}) => {
  const [pedidoEnviado, setPedidoEnviado] = useState(false);

  useEffect(() => {
    console.log("🛒 Carrito recibido en ResumenCarrito:", carrito);
  }, [carrito]);

  // ==========================================
  // 🧮 CÁLCULOS INTERNOS DINÁMICOS (CON COPIAS)
  // ==========================================
  
  const totalPaginas = carrito.reduce((acc, item) => {
    if (item.detalles?.tipo === "impresion") {
      return acc + (item.detalles.paginas * (item.cantidad || 1));
    }
    return acc;
  }, 0);

  const descuento = calcularDescuento(totalPaginas);

  const totalImpresionesSinDescuento = carrito.reduce((acc, item) => {
    if (item.detalles?.tipo === "impresion") {
      const papel = preciosPorPapel.find((p) => p.id === item.detalles.papel);
      const precioOriginalUnitario = papel ? papel.precio : 0;
      return acc + (precioOriginalUnitario * item.detalles.paginas * (item.cantidad || 1));
    }
    return acc;
  }, 0);

  const totalImpresionesConDescuento = carrito.reduce((acc, item) => {
    if (item.detalles?.tipo === "impresion") {
      return acc + calcularPrecioImpresion(item);
    }
    return acc;
  }, 0);

  const totalResmas = carrito.reduce((acc, item) => {
    if (item.detalles?.tipo === "resma") {
      return acc + calcularPrecioResma(item);
    }
    return acc;
  }, 0);

  const totalFinal = totalImpresionesConDescuento + totalResmas;

  // ==========================================
  // 🚀 LÓGICA DE ENVÍO Y SUBIDA A CLOUDFLARE R2
  // ==========================================
  const manejarEnviarPedido = async () => {
    if (!carrito.length) {
      toast.error("El carrito está vacío 🛒");
      toast.error("El carrito está vacío 🛒");
      return;
    }
    if (!nombreCliente || !nombreCliente.trim()) {
      toast.error("Por favor ingrese su nombre 👤");
      toast.error("Por favor ingrese su nombre 👤");
      return;
    }
    if (!telefonoCliente || !telefonoCliente.trim()) {
      toast.error("Por favor ingrese su teléfono 📱");
      toast.error("Por favor ingrese su teléfono 📱");
      return;
    }

    // Le pasamos toda la responsabilidad de asincronía al toast.promise
    toast.promise(
      (async () => {
        const carritoProcesado = [];

        // 1. Recorremos el carrito para subir los PDFs directo a R2
        for (const item of carrito) {
          if (item.detalles?.tipo === "impresion" && item.detalles.archivo instanceof File) {
            const archivoPdf = item.detalles.archivo;

            // Pedimos el permiso (URL pre-firmada)
            const resFirma = await fetch(`${API_URL}/pedidos/firma-r2`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                nombreArchivo: archivoPdf.name,
                tipoArchivo: archivoPdf.type,
              }),
            });

            if (!resFirma.ok) throw new Error(`No se pudo autorizar el archivo ${archivoPdf.name}`);
            const { urlFirma, fileKey } = await resFirma.json();

            // Subimos directamente a la nube de Cloudflare (bypass del backend)
            const resSubida = await fetch(urlFirma, {
              method: "PUT",
              body: archivoPdf,
              headers: {
                "Content-Type": archivoPdf.type,
              },
            });

            if (!resSubida.ok) throw new Error(`Fallo al subir ${archivoPdf.name}`);

            // Guardamos el item modificado con la ruta en texto
            carritoProcesado.push({
              ...item,
              detalles: {
                ...item.detalles,
                archivo: fileKey,
              },
            });
          } else {
            // Si es resma o no tiene archivo físico, pasa de largo
            carritoProcesado.push(item);
          }
        }

        // 2. Armamos el JSON liviano final
        const payloadPedido = {
          cliente: nombreCliente.trim(),
          telefono: telefonoCliente.trim(),
          pedido: { items: carritoProcesado },
        };

        // 3. Enviamos el pedido oficial a tu base de datos
        const res = await fetch(`${API_URL}/pedidos`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // Vital para no perder el body por CORS
          body: JSON.stringify(payloadPedido),
        });

        const data = await res.json();
        
        if (!res.ok) {
          throw new Error(data.error || "Error al procesar el pedido en el servidor.");
        }

        // 4. Redirigimos a Mercado Pago
        if (data.initPoint) {
          setTimeout(() => {
            window.location.href = data.initPoint;
          }, 1500);
        }
        
        setPedidoEnviado(true); 
        vaciarCarrito();        
        return data;            
      })(),
      {
        loading: "Procesando archivos y preparando pago... ⏳",
        success: "¡Pedido enviado con éxito! 🚀",
        error: (err) => `Error: ${err.message} ❌`,
      },
      {
        style: {
          minWidth: '250px',
        },
        success: {
          duration: 4000,
          icon: '🔥',
        },
      }
    );
  };

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg dark:shadow-black/40 border border-violet-200 dark:border-slate-700 animate-borderPulse transition-colors duration-300">
      <h2 className="text-2xl font-bold text-violet-700 dark:text-violet-400 mb-6 text-center transition-colors duration-300">
        🛒 Resumen del Carrito
      </h2>

      {pedidoEnviado && (
        <div className="mb-6 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800/50 text-green-800 dark:text-green-300 px-4 py-3 rounded-lg text-center shadow-sm transition-colors duration-300">
          ✅ ¡Gracias por tu pedido! Será confirmado a la brevedad por WhatsApp desde <strong>impresionesATuCasa</strong>.
        </div>
      )}

      {carrito.length === 0 ? (
        <p className="text-gray-500 dark:text-slate-400 text-center transition-colors duration-300">
          El carrito está vacío
        </p>
      ) : (
        <>
          <ul className="divide-y divide-gray-200 dark:divide-slate-700 transition-colors duration-300">
            {carrito.map((item, index) => (
              <li
                key={item.id || index}
                className="py-4 flex justify-between items-center hover:bg-violet-50 dark:hover:bg-slate-700/50 transition-colors duration-300 rounded-md px-2 fade-in"
              >
                <div>
                  <p className="font-semibold text-gray-800 dark:text-slate-100 transition-colors duration-300">
                    {item.name || "Producto sin nombre"}
                  </p>

                  {item.detalles?.tipo === "impresion" ? (
                    <>
                      <p className="text-sm text-gray-600 dark:text-slate-300 transition-colors duration-300">
                        {item.detalles?.paginas || 0} páginas <span className="font-bold text-violet-700 dark:text-violet-400 ml-1 transition-colors duration-300">× {item.cantidad || 1} copia(s)</span>
                      </p>
                      <p className="text-xs text-gray-400 dark:text-slate-500 capitalize transition-colors duration-300">
                        Papel: {item.detalles?.papel}
                      </p>
                    </>
                  ) : item.detalles?.tipo === "resma" ? (
                    <>
                      <p className="text-sm text-gray-500 dark:text-slate-400 transition-colors duration-300">
                        {item.cantidad || 1} resma(s) ×{" "}
                        {item.detalles?.hojasPorResma || 20} hojas
                      </p>
                      {item.cantidad >= 5 && (
                        <p className="text-xs text-green-600 dark:text-green-400 font-medium transition-colors duration-300">
                          Promo aplicada: {Math.floor(item.cantidad / 5)}{" "}
                          resma(s) bonificada(s)
                        </p>
                      )}
                    </>
                  ) : (
                    <p className="text-sm text-red-500 dark:text-red-400 transition-colors duration-300">
                      ⚠️ Tipo de producto no definido
                    </p>
                  )}
                </div>

                <div className="flex items-center space-x-3">
                  <p className="font-semibold text-violet-700 dark:text-violet-400 transition-colors duration-300">
                    {formatoPrecio(
                      item.detalles?.tipo === "resma"
                        ? calcularPrecioResma(item)
                        : calcularPrecioImpresion(item)
                    )}
                  </p>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition transform hover:scale-110"
                    title="Eliminar del carrito"
                  >
                    ❌
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-6 border-t dark:border-slate-700 pt-4 space-y-2 text-sm text-gray-700 dark:text-slate-300 transition-colors duration-300">
            <p>
              Total de páginas impresas: <strong>{totalPaginas}</strong>
            </p>
            <p>
              Impresiones sin descuento:{" "}
              <strong className="dark:text-slate-200">{formatoPrecio(totalImpresionesSinDescuento)}</strong>
            </p>
            <p>
              Descuento aplicado: <strong className="dark:text-slate-200">{descuento * 100}%</strong>
            </p>
            <p>
              Impresiones con descuento:{" "}
              <strong className="dark:text-slate-200">{formatoPrecio(totalImpresionesConDescuento)}</strong>
            </p>
            <p>
              Resmas (promo 5x4 aplicada):{" "}
              <strong className="dark:text-slate-200">{formatoPrecio(totalResmas)}</strong>
            </p>
            <p className="text-lg font-bold text-violet-800 dark:text-violet-300 mt-2 border-t border-violet-100 dark:border-slate-700 pt-2 transition-colors duration-300">
              Total final: {formatoPrecio(totalFinal)}
            </p>
          </div>

          <div className="mt-6 text-center space-y-3 flex flex-col items-center">
            <button
              onClick={vaciarCarrito}
              className="bg-red-500 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 transition w-full sm:w-auto"
            >
              Vaciar carrito 🧹
            </button>
            <button
              onClick={manejarEnviarPedido}
              className="bg-green-600 text-white px-8 py-3 rounded-lg text-base font-bold hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-500 transition shadow-md w-full sm:w-auto"
            >
              Pagar y Enviar pedido ✅
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ResumenCarrito;
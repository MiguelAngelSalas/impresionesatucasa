import React, { useEffect, useState } from "react";

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
  totalPaginas,
  descuento,
  totalImpresionesSinDescuento,
  totalImpresionesConDescuento,
  totalResmas,
  totalFinal,
}) => {
  const [pedidoEnviado, setPedidoEnviado] = useState(false);

  useEffect(() => {
    console.log("🛒 Carrito recibido en ResumenCarrito:", carrito);
  }, [carrito]);

  const manejarEnviarPedido = async () => {
    if (!carrito.length) {
      alert("El carrito está vacío");
      return;
    }
    if (!nombreCliente || !nombreCliente.trim()) {
      alert("Por favor ingrese su nombre");
      return;
    }
    if (!telefonoCliente || !telefonoCliente.trim()) {
      alert("Por favor ingrese su teléfono");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("cliente", nombreCliente);
      formData.append("telefono", telefonoCliente);
      formData.append("pedido", JSON.stringify({ items: carrito }));

      carrito.forEach((item) => {
        if (
          item.detalles?.tipo === "impresion" &&
          item.detalles.archivo instanceof File
        ) {
          formData.append("files", item.detalles.archivo);
        }
      });

      const res = await fetch("https://backendpedidos-production.up.railway.app/api/pedidos", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        setPedidoEnviado(true); // ✅ activa el mensaje
        alert("Pedido enviado correctamente");
        console.log("✅ Pedido enviado:", data);
      } else {
        alert("Error al enviar pedido: " + data.error);
        console.error("❌ Error enviando pedido:", data);
      }
    } catch (err) {
      alert("Error en el envío: " + err.message);
      console.error("❌ Error en fetch:", err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-lg border border-violet-200 animate-borderPulse">
      <h2 className="text-2xl font-bold text-violet-700 mb-6 text-center">
        🛒 Resumen del Carrito
      </h2>

      {pedidoEnviado && (
        <div className="mb-6 bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg text-center shadow-sm">
          ✅ ¡Gracias por tu pedido! Será confirmado a la brevedad por WhatsApp desde <strong>impresionesATuCasa</strong>.
        </div>
      )}

      {carrito.length === 0 ? (
        <p className="text-gray-500 text-center">El carrito está vacío</p>
      ) : (
        <>
          <ul className="divide-y divide-gray-200">
            {carrito.map((item, index) => (
              <li
                key={item.id || index}
                className="py-4 flex justify-between items-center hover:bg-violet-50 transition rounded-md px-2 fade-in"
              >
                <div>
                  <p className="font-semibold text-gray-800">
                    {item.name || "Producto sin nombre"}
                  </p>

                  {item.detalles?.tipo === "impresion" ? (
                    <p className="text-sm text-gray-500">
                      {item.detalles?.paginas || 0} páginas
                    </p>
                  ) : item.detalles?.tipo === "resma" ? (
                    <>
                      <p className="text-sm text-gray-500">
                        {item.cantidad || 1} resma(s) ×{" "}
                        {item.detalles?.hojasPorResma || 20} hojas
                      </p>
                      {item.cantidad >= 5 && (
                        <p className="text-xs text-green-600 font-medium">
                          Promo aplicada: {Math.floor(item.cantidad / 5)}{" "}
                          resma(s) bonificada(s)
                        </p>
                      )}
                    </>
                  ) : (
                    <p className="text-sm text-red-500">
                      ⚠️ Tipo de producto no definido
                    </p>
                  )}
                </div>

                <div className="flex items-center space-x-3">
                  <p className="font-semibold text-violet-700">
                    {formatoPrecio(
                      item.detalles?.tipo === "resma"
                        ? calcularPrecioResma(item)
                        : calcularPrecioImpresion(item)
                    )}
                  </p>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700 transition transform hover:scale-110"
                    title="Eliminar del carrito"
                  >
                    ❌
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-6 border-t pt-4 space-y-2 text-sm text-gray-700">
            <p>
              Total de páginas: <strong>{totalPaginas}</strong>
            </p>
            <p>
              Impresiones sin descuento:{" "}
              <strong>{formatoPrecio(totalImpresionesSinDescuento)}</strong>
            </p>
            <p>
              Descuento aplicado: <strong>{descuento * 100}%</strong>
            </p>
            <p>
              Impresiones con descuento:{" "}
              <strong>{formatoPrecio(totalImpresionesConDescuento)}</strong>
            </p>
            <p>
              Resmas (promo 5x4 aplicada):{" "}
              <strong>{formatoPrecio(totalResmas)}</strong>
            </p>
            <p className="text-lg font-bold text-violet-800">
              Total final: {formatoPrecio(totalFinal)}
            </p>
          </div>

          <div className="mt-6 text-center space-y-3">
            <button
              onClick={vaciarCarrito}
              className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-600 transition"
            >
              Vaciar carrito 🧹
            </button>
            <button
              onClick={manejarEnviarPedido}
              className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition"
            >
              Enviar pedido ✅
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ResumenCarrito;

import React, { useEffect } from "react";

const ResumenCarrito = ({
  carrito,
  removeFromCart,
  totalPaginas,
  totalSinDescuento,
  descuento,
  totalConDescuento,
}) => {
  useEffect(() => {
    console.log("🧾 Props recibidos en ResumenCarrito:", {
      carrito,
      totalPaginas,
      totalSinDescuento,
      descuento,
      totalConDescuento,
    });
  }, [carrito]);

  return (
    <div className="mt-10 bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm">
      <h2 className="text-xl font-bold text-violet-700 mb-2">🛒 Carrito actual</h2>

      {Array.isArray(carrito) && carrito.length === 0 ? (
        <p className="text-gray-500">Todavía no hay productos en el carrito.</p>
      ) : (
        <>
          <ul className="space-y-3 mb-6">
            {carrito.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center bg-white border border-gray-200 rounded-md px-4 py-2 shadow-sm"
              >
                <div>
                  <span className="font-medium text-violet-700">{item.name}</span> – ${item.price} <br />
                  <span className="text-sm text-gray-600">
                    📄 {item.detalles?.paginas} hoja{item.detalles?.paginas > 1 ? "s" : ""}
                  </span>
                </div>
                <button
                  onClick={() => {
                    console.log("🗑 Eliminando:", item.id);
                    removeFromCart(item.id);
                  }}
                  className="bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold px-3 py-1 rounded-md shadow-sm transition"
                >
                  ❌ Eliminar
                </button>
              </li>
            ))}
          </ul>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm sm:text-base font-semibold text-violet-700">
            <div>📄 Total de páginas: {totalPaginas ?? "?"}</div>
            <div>
              💰 Precio sin descuento:{" "}
              <span className="line-through text-gray-500">
                ${totalSinDescuento ?? "?"}
              </span>
            </div>
            <div>🎉 Descuento aplicado: {(descuento ?? 0) * 100}%</div>
            <div className="text-green-700 text-lg sm:text-xl">
              💸 Total final a pagar: ${totalConDescuento ?? "?"}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ResumenCarrito;

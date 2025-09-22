import React from "react";

// ✅ Formato de precio argentino
const formatoPrecio = (valor) =>
  valor.toLocaleString("es-AR", { style: "currency", currency: "ARS" });

const ResumenCarrito = ({
  carrito,
  removeFromCart,
  vaciarCarrito,
  totalPaginas,
  totalSinDescuento,
  descuento,
  totalConDescuento,
}) => {
  // 🧹 Confirmación antes de vaciar
  const confirmarVaciado = () => {
    if (window.confirm("¿Estás seguro de que querés vaciar el carrito?")) {
      vaciarCarrito();
    }
  };

  return (
    <div className="mt-10 bg-white border border-violet-200 rounded-xl p-6 shadow-md">
      <h2 className="text-2xl font-bold text-violet-700 mb-4 text-center">🛒 Carrito actual</h2>

      {carrito.length === 0 ? (
        <p className="text-center text-gray-500">Todavía no hay productos en el carrito.</p>
      ) : (
        <>
          <ul className="space-y-4 mb-6">
            {carrito.map((item) => (
              <li
                key={item.id}
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-violet-50 border border-violet-200 rounded-lg px-4 py-3 shadow-sm"
              >
                <div className="text-sm sm:text-base">
                  <p className="font-semibold text-violet-800">{item.name}</p>
                  <p className="text-gray-700">
                    📄 {item.detalles.paginas} hoja{item.detalles.paginas > 1 ? "s" : ""} – {item.detalles.archivo}
                  </p>
                  <p className="text-violet-600 font-bold mt-1">
                    💰 {formatoPrecio(item.price)}
                  </p>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="mt-3 sm:mt-0 bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold px-3 py-1 rounded-md shadow-sm transition"
                >
                  ❌ Eliminar
                </button>
              </li>
            ))}
          </ul>

          {/* 🧹 Botón para vaciar todo el carrito */}
          <div className="flex justify-end mb-6">
            <button
              onClick={confirmarVaciado}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-semibold px-4 py-2 rounded-md shadow-sm transition"
            >
              🧹 Vaciar carrito
            </button>
          </div>

          {/* 📊 Resumen de totales */}
          <hr className="my-6 border-violet-200" />
          <div className="bg-violet-100 border border-violet-300 rounded-lg p-4 text-violet-800 font-semibold text-sm sm:text-base space-y-2">
            <div>📄 Total de páginas: {totalPaginas}</div>
            <div>
              💰 Precio sin descuento:{" "}
              <span className="line-through text-gray-500">
                {formatoPrecio(totalSinDescuento)}
              </span>
            </div>
            <div>🎉 Descuento aplicado: {descuento * 100}%</div>
            <div className="text-green-700 text-lg sm:text-xl">
              💸 Total final a pagar: {formatoPrecio(totalConDescuento)}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ResumenCarrito;

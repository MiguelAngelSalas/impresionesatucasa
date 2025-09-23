import React from "react";

const ResumenCarrito = ({
  carrito,
  removeFromCart,
  totalPaginas,
  totalSinDescuento,
  descuento,
  totalConDescuento,
}) => {
  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">🛒 Resumen del Carrito</h2>

      {carrito.length === 0 ? (
        <p className="text-gray-600">El carrito está vacío</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {carrito.map((item, index) => (
            <li key={item.id || index} className="py-3 flex justify-between items-center">
              <div>
                <p className="font-medium">{item.name || "Producto sin nombre"}</p>
                <p className="text-sm text-gray-500">{item.detalles?.paginas || 0} páginas</p>
              </div>
              <div className="flex items-center space-x-3">
                <p className="font-semibold">${item.price || 0}</p>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  ❌
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {carrito.length > 0 && (
        <div className="mt-6 border-t pt-4 space-y-2">
          <p>Total de páginas: <strong>{totalPaginas}</strong></p>
          <p>Total sin descuento: <strong>${totalSinDescuento}</strong></p>
          <p>Descuento aplicado: <strong>{descuento * 100}%</strong></p>
          <p className="text-lg font-bold">
            Total con descuento: ${totalConDescuento}
          </p>
        </div>
      )}
    </div>
  );
};

export default ResumenCarrito;

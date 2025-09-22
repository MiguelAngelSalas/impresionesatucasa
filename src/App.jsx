import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import FileUpload from "./assets/componentes/FileUpload";
import Header from "./assets/componentes/Header";
import Inicio from "./assets/componentes/Inicio";
import Resmas from "./assets/componentes/Resmas";

// Función para calcular descuento según cantidad de páginas
const calcularDescuento = (paginas) => {
  if (paginas > 50) return 0.3;
  if (paginas > 30) return 0.2;
  if (paginas > 20) return 0.15;
  if (paginas > 10) return 0.1;
  return 0;
};

function App() {
  const [carrito, setCarrito] = useState([]);

  const addToCart = (producto) => {
    setCarrito((prevCarrito) => [...prevCarrito, producto]);
    console.log("🛒 Producto agregado:", producto);
  };

  const removeFromCart = (id) => {
    setCarrito((prevCarrito) => prevCarrito.filter((item) => item.id !== id));
  };

  const totalPaginas = carrito.reduce(
    (acc, item) => acc + (item.detalles.paginas || 0),
    0
  );

  const totalSinDescuento = carrito.reduce((acc, item) => acc + item.price, 0);

  const descuento = calcularDescuento(totalPaginas);
  const totalConDescuento = Math.round(totalSinDescuento * (1 - descuento));

  return (
    <>
      <Header />
      <main className="py-6 px-4">
        <Routes>
          <Route path="/resmas" element={<Resmas />} />
          <Route path="/" element={<Inicio />} />
          <Route path="/upload" element={<FileUpload addToCart={addToCart} />} />
        </Routes>

        {/* Vista del carrito con resumen y opción de eliminar */}
        <div className="mt-10 bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm">
          <h2 className="text-xl font-bold text-violet-700 mb-2">🛒 Carrito actual</h2>

          {carrito.length === 0 ? (
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
                      <span className="font-medium text-violet-700">{item.name}</span> – ${item.price}
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold px-3 py-1 rounded-md shadow-sm transition"
                    >
                      ❌ Eliminar
                    </button>
                  </li>
                ))}
              </ul>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm sm:text-base font-semibold text-violet-700">
                <div>📄 Total de páginas: {totalPaginas}</div>
                <div>💰 Precio sin descuento: <span className="line-through text-gray-500">${totalSinDescuento}</span></div>
                <div>🎉 Descuento aplicado: {descuento * 100}%</div>
                <div className="text-green-700 text-lg sm:text-xl">
                  💸 Total final a pagar: ${totalConDescuento}
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </>
  );
}

export default App;

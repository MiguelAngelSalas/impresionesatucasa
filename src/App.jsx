import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import FileUpload from "./assets/componentes/FileUpload";
import Header from "./assets/componentes/Header";
import Inicio from "./assets/componentes/Inicio";
import Resmas from "./assets/componentes/Resmas";

function App() {
  const [carrito, setCarrito] = useState([]);

  const addToCart = (producto) => {
    setCarrito((prevCarrito) => [...prevCarrito, producto]);
    console.log("🛒 Producto agregado:", producto);
  };

  return (
    <>
@@ -17,11 +24,27 @@ function App() {
        <Routes>
          <Route path="/resmas" element={<Resmas />} />
          <Route path="/" element={<Inicio />} />
          <Route path="/upload" element={<FileUpload addToCart={addToCart} />} />
        </Routes>

        {/* Vista rápida del carrito */}
        <div className="mt-10 bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm">
          <h2 className="text-xl font-bold text-violet-700 mb-2">🛒 Carrito actual</h2>
          {carrito.length === 0 ? (
            <p className="text-gray-500">Todavía no hay productos en el carrito.</p>
          ) : (
            <ul className="list-disc pl-5 space-y-1">
              {carrito.map((item) => (
                <li key={item.id}>
                  <span className="font-medium">{item.name}</span> – ${item.price}
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </>
  );
}

export default App;

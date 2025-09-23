import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import Header from "./componentes/Header";
import Inicio from "./componentes/Inicio";
import Resmas from "./componentes/Resmas";
import VistaFormulario from "./componentes/VistaFormulario";
import ResumenCarrito from "./componentes/ResumenCarrito";

import { calcularDescuento } from "./utilidades/calcularDescuento";

function App() {
  const [carrito, setCarrito] = useState([]);

  // ✅ Restaurar carrito desde localStorage al montar
  useEffect(() => {
    const guardado = localStorage.getItem("carrito");
    if (guardado) setCarrito(JSON.parse(guardado));
  }, []);

  // ✅ Guardar carrito en localStorage cada vez que cambia
  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  const addToCart = (producto) => {
    if (!producto || !producto.id || !producto.price || !producto.detalles?.paginas) {
      console.warn("❌ Producto inválido:", producto);
      return;
    }
    setCarrito((prevCarrito) => [...prevCarrito, producto]);
    console.log("🛒 Producto agregado:", producto);
  };

  const removeFromCart = (id) => {
    setCarrito((prevCarrito) => prevCarrito.filter((item) => item.id !== id));
  };

  const totalPaginas = carrito.reduce(
    (acc, item) => acc + (item.detalles?.paginas || 0),
    0
  );

  const totalSinDescuento = carrito.reduce(
    (acc, item) => acc + (item.price || 0),
    0
  );

  const descuento = calcularDescuento(totalPaginas);
  const totalConDescuento = Math.round(totalSinDescuento * (1 - descuento));

  return (
    <>
      <Header cartCount={carrito.length} />
      <main className="py-6 px-4">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/resmas" element={<Resmas />} />
          <Route
            path="/upload"
            element={<VistaFormulario agregarAlCarrito={addToCart} />}
          />
          <Route
            path="/carrito"
            element={
              <ResumenCarrito
                carrito={carrito}
                removeFromCart={removeFromCart}
                totalPaginas={totalPaginas}
                totalSinDescuento={totalSinDescuento}
                descuento={descuento}
                totalConDescuento={totalConDescuento}
              />
            }
          />
        </Routes>
      </main>
    </>
  );
}

export default App;

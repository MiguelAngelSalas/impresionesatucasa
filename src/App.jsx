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

  // 🔄 Cargar carrito desde localStorage al iniciar
  useEffect(() => {
    const carritoGuardado = localStorage.getItem("carrito");
    if (carritoGuardado) {
      setCarrito(JSON.parse(carritoGuardado));
    }
  }, []);

  // 💾 Guardar carrito en localStorage cada vez que cambie
  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  const addToCart = (producto) => {
    setCarrito((prevCarrito) => [...prevCarrito, producto]);
    console.log("🛒 Producto agregado:", producto);
  };

  const removeFromCart = (id) => {
    setCarrito((prevCarrito) => prevCarrito.filter((item) => item.id !== id));
  };

  const vaciarCarrito = () => {
    setCarrito([]);
    localStorage.removeItem("carrito");
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
          <Route path="/upload" element={<VistaFormulario addToCart={addToCart} />} />
        </Routes>

        <ResumenCarrito
          carrito={carrito}
          removeFromCart={removeFromCart}
          vaciarCarrito={vaciarCarrito} // ✅ nuevo prop
          totalPaginas={totalPaginas}
          totalSinDescuento={totalSinDescuento}
          descuento={descuento}
          totalConDescuento={totalConDescuento}
        />
      </main>
    </>
  );
}

export default App;

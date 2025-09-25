import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import Header from "./componentes/Header";
import Inicio from "./componentes/Inicio";
import Resmas from "./componentes/Resmas";
import VistaFormulario from "./componentes/VistaFormulario";
import ResumenCarrito from "./componentes/ResumenCarrito";

import { calcularDescuento } from "./utilidades/calcularDescuento.jsx";

const obtenerCarritoInicial = () => {
  try {
    const guardado = localStorage.getItem("carrito");
    const parsed = JSON.parse(guardado);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

function App() {
  const [carrito, setCarrito] = useState(obtenerCarritoInicial);

  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  const agregarAlCarrito = (producto) => {
    if (!producto || !producto.id || !producto.name || producto.price == null) {
      console.warn("❌ Producto inválido:", producto);
      return;
    }

    setCarrito((prevCarrito) => {
      const existe = prevCarrito.find((item) => item.id === producto.id);
      if (existe && producto.detalles?.tipo === "resma") {
        return prevCarrito.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: (item.cantidad || 1) + 1 }
            : item
        );
      } else {
        return [...prevCarrito, { ...producto, cantidad: 1 }];
      }
    });
  };

  const eliminarDelCarrito = (id) => {
    setCarrito((prevCarrito) => prevCarrito.filter((item) => item.id !== id));
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  // ✅ Separar productos por tipo
  const impresiones = carrito.filter(item => item.detalles?.tipo === "impresion");
  const resmas = carrito.filter(item => item.detalles?.tipo === "resma");

  // ✅ Calcular totales por tipo
  const totalPaginas = impresiones.reduce(
    (acc, item) => acc + (item.detalles?.paginas || 0) * (item.cantidad || 1),
    0
  );

  const descuento = calcularDescuento(totalPaginas);

  const totalImpresionesSinDescuento = impresiones.reduce(
    (acc, item) => acc + item.price * (item.cantidad || 1),
    0
  );

  const totalImpresionesConDescuento = Math.round(totalImpresionesSinDescuento * (1 - descuento));

  const totalResmas = resmas.reduce((acc, item) => {
    const cantidad = item.cantidad || 1;
    const pagadas = cantidad - Math.floor(cantidad / 5); // promo 5x4
    return acc + item.price * pagadas;
  }, 0);

  const totalFinal = totalImpresionesConDescuento + totalResmas;

  return (
    <>
      <Header cartCount={carrito.length} />
      <main className="py-6 px-4">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route
            path="/resmas"
            element={<Resmas agregarAlCarrito={agregarAlCarrito} />}
          />
          <Route
            path="/upload"
            element={<VistaFormulario agregarAlCarrito={agregarAlCarrito} />}
          />
          <Route
            path="/carrito"
            element={
              <ResumenCarrito
                carrito={carrito}
                removeFromCart={eliminarDelCarrito}
                vaciarCarrito={vaciarCarrito}
                totalPaginas={totalPaginas}
                descuento={descuento}
                totalImpresionesSinDescuento={totalImpresionesSinDescuento}
                totalImpresionesConDescuento={totalImpresionesConDescuento}
                totalResmas={totalResmas}
                totalFinal={totalFinal}
              />
            }
          />
        </Routes>
      </main>
    </>
  );
}

export default App;

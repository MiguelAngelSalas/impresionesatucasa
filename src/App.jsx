import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import preciosPorPapel from "./componentes/preciosPorPapel.jsx";
import Header from "./componentes/Header";
import Inicio from "./componentes/Inicio";
import Resmas from "./componentes/Resmas";
import VistaFormulario from "./componentes/VistaFormulario";
import ResumenCarrito from "./componentes/ResumenCarrito";
import Footer from "./componentes/Footer";
import { calcularDescuento } from "./utilidades/calcularDescuento.jsx";
<<<<<<< HEAD
import { Toaster } from "react-hot-toast";
=======
import { Toaster } from 'react-hot-toast';
>>>>>>> 55df30219cc499d9a8be6e04b3b8f357dc2fdd26

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
  const [nombreCliente, setNombreCliente] = useState("");
  const [telefonoCliente, setTelefonoCliente] = useState("");

  // 🌙 LÓGICA DE MODO OSCURO
  const [modoOscuro, setModoOscuro] = useState(() => {
    const temaGuardado = localStorage.getItem("tema");
    if (temaGuardado) return temaGuardado === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (modoOscuro) {
      root.classList.add("dark");
      localStorage.setItem("tema", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("tema", "light");
    }
  }, [modoOscuro]);

  const toggleModoOscuro = () => setModoOscuro(!modoOscuro);

  // 🛒 LÓGICA DEL CARRITO
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
        return [...prevCarrito, { ...producto, cantidad: producto.cantidad || 1 }];
      }
    });
  };

  const eliminarDelCarrito = (id) => {
    setCarrito((prevCarrito) => prevCarrito.filter((item) => item.id !== id));
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  // 📊 CÁLCULOS DE TOTALES
  const impresiones = carrito.filter((item) => item.detalles?.tipo === "impresion");
  const resmas = carrito.filter((item) => item.detalles?.tipo === "resma");

  const totalPaginas = impresiones.reduce(
    (acc, item) => acc + (item.detalles?.paginas || 0) * (item.cantidad || 1),
    0
  );

  const descuento = calcularDescuento(totalPaginas);

  const totalImpresionesSinDescuento = impresiones.reduce(
    (acc, item) => acc + item.price * (item.cantidad || 1),
    0
  );

  const totalImpresionesConDescuento = Math.round(
    totalImpresionesSinDescuento * (1 - descuento)
  );

  const totalResmas = resmas.reduce((acc, item) => {
    const cantidad = item.cantidad || 1;
    const pagadas = cantidad - Math.floor(cantidad / 5); // Promo 5x4
    return acc + item.price * pagadas;
  }, 0);

  const totalFinal = totalImpresionesConDescuento + totalResmas;

  return (
    <>
      <Header
        cartCount={carrito.length}
        modoOscuro={modoOscuro}
        toggleModoOscuro={toggleModoOscuro}
      />

      {/* Acá está la magia global: 
        bg-slate-50 / text-slate-900 (Modo claro)
        dark:bg-slate-900 / dark:text-slate-100 (Modo oscuro)
      */}
      <main className="py-6 px-4 min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-900 dark:text-slate-100 transition-colors duration-300">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route
            path="/resmas"
            element={<Resmas agregarAlCarrito={agregarAlCarrito} />}
          />
          <Route
            path="/upload"
            element={
              <VistaFormulario
                agregarAlCarrito={agregarAlCarrito}
                nombreCliente={nombreCliente}
                setNombreCliente={setNombreCliente}
                telefonoCliente={telefonoCliente}
                setTelefonoCliente={setTelefonoCliente}
                carrito={carrito}
                vaciarCarrito={vaciarCarrito}
              />
            }
          />
          <Route
            path="/carrito"
            element={
              <ResumenCarrito
                carrito={carrito}
                nombreCliente={nombreCliente}
                telefonoCliente={telefonoCliente}
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
<<<<<<< HEAD
      
      <Footer />
=======
      <Footer/>
>>>>>>> 55df30219cc499d9a8be6e04b3b8f357dc2fdd26
      <Toaster position="bottom-right" reverseOrder={false} />
    </>
  );
}

export default App;
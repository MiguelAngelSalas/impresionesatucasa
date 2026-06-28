// src/components/Header.tsx
"use client"; // Es necesario porque usamos useContext

import Link from "next/link";
import { useContext } from "react";
import { GlobalContext } from "@/context/GlobalContext";

export default function Header() {
  // Ahora el Header "se entera" de los datos solo, sin recibir nada por props
  const { carrito, modoOscuro, toggleModoOscuro } = useContext(GlobalContext);
  const cartCount = carrito.length;

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-violet-200 dark:border-slate-800 shadow-sm transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        
        <Link href="/" className="text-xl font-bold text-violet-700 dark:text-violet-400 tracking-wide hover:text-violet-900 dark:hover:text-violet-300 transition-colors duration-300">
          Impresiones A Tu Casa
        </Link>

        <nav className="flex space-x-4 sm:space-x-6 items-center">
          <Link href="/" className="text-sm font-medium text-violet-700 dark:text-slate-300 hover:text-violet-900 dark:hover:text-white transition-colors duration-300">
            Inicio
          </Link>
          <Link href="/upload" className="text-sm font-medium text-violet-700 dark:text-slate-300 hover:text-violet-900 dark:hover:text-white transition-colors duration-300">
            Impresiones
          </Link>
          
          <button 
            onClick={toggleModoOscuro}
            className="p-1.5 rounded-full bg-violet-50 dark:bg-slate-800 text-slate-800 dark:text-yellow-400 border border-violet-200 dark:border-slate-700 hover:bg-violet-100 dark:hover:bg-slate-700 transition-all duration-300 shadow-sm hover:scale-110"
            title={modoOscuro ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
          >
            {modoOscuro ? "☀️" : "🌙"}
          </button>

          <Link href="/carrito" className="relative text-sm font-medium text-violet-700 dark:text-slate-300 hover:text-violet-900 dark:hover:text-white transition-colors duration-300 flex items-center gap-1">
            🛒 <span className="hidden sm:inline">Carrito</span>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-3 sm:-right-4 bg-red-500 dark:bg-red-600 text-white text-[10px] font-bold rounded-full px-1.5 py-0.5 shadow-sm">
                {cartCount}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}
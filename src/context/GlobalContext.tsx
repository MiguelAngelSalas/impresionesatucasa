// src/context/GlobalContext.tsx
"use client";

import React, { createContext, useState, useEffect, ReactNode, Dispatch, SetStateAction } from "react";
import { calcularDescuento } from "@/utilidades/calcularDescuento";
import toast from "react-hot-toast";

export interface Producto {
  id: string;
  name: string;
  price: number;
  detalles: { 
    tipo: 'impresion' | 'resma'; 
    paginas?: number;
    archivo?: File; 
    archivoUrl?: string; 
    papel?: string;
    copias?: number;
    quiereAnillado?: boolean;
    costoAnillado?: number;
  };
  cantidad: number;
}

export interface TipoEnvio{
  nombre: string,
  costo: number,
}

export interface GlobalContextType {
  carrito: Producto[];
  agregarAlCarrito: (producto: Producto) => void;
  eliminarDelCarrito: (id: string) => void;
  vaciarCarrito: () => void;
  nombreCliente: string;
  setNombreCliente: Dispatch<SetStateAction<string>>; 
  telefonoCliente: string;
  setTelefonoCliente: Dispatch<SetStateAction<string>>; 
  domicilioCliente: string;
  setDomicilioCliente: Dispatch<SetStateAction<string>>;
  localidadCliente: string;
  setLocalidadCliente: Dispatch<SetStateAction<string>>;
  totalPaginas: number;
  totalImpresionesSinDescuento: number;
  descuento: number;
  totalFinal: number;
  manejarEnviarPedido: () => Promise<void>;
  modoOscuro: boolean;
  toggleModoOscuro: () => void;
  envio: TipoEnvio;
  setEnvio: Dispatch<SetStateAction<TipoEnvio>>;
  envioGratis: boolean;
  setEnvioGratis: (valor: boolean) => void;
  // NUEVO: Para guardar qué código exacto se usó
  codigoAplicado: string;
  setCodigoAplicado: Dispatch<SetStateAction<string>>;
}

export const GlobalContext = createContext<GlobalContextType>({} as GlobalContextType);

export function GlobalProvider({ children }: { children: ReactNode }) {
  const [carrito, setCarrito] = useState<Producto[]>([]);
  const [nombreCliente, setNombreCliente] = useState("");
  const [telefonoCliente, setTelefonoCliente] = useState("");
  const [modoOscuro, setModoOscuro] = useState(false);
  const [envio, setEnvio] = useState<TipoEnvio>({nombre: "Retiro en punto de encuentro (Gratis)", costo: 0});
  const [domicilioCliente, setDomicilioCliente] = useState("");
  const [localidadCliente, setLocalidadCliente] = useState("");
  const [envioGratis, setEnvioGratis] = useState<boolean>(false);
  // NUEVO: Estado para el código
  const [codigoAplicado, setCodigoAplicado] = useState<string>("");

  const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

  useEffect(() => {
    const isDark = localStorage.getItem("theme") === "dark";
    setModoOscuro(isDark);
    if (isDark) document.documentElement.classList.add("dark");
  }, []);

  const toggleModoOscuro = () => {
    const newMode = !modoOscuro;
    setModoOscuro(newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
    document.documentElement.classList.toggle("dark");
  };

  const agregarAlCarrito = (producto: Producto) => setCarrito((prev) => [...prev, producto]);
  const eliminarDelCarrito = (id: string) => setCarrito((prev) => prev.filter((i) => i.id !== id));
  const vaciarCarrito = () => setCarrito([]);

  const impresiones = carrito.filter((i) => i.detalles?.tipo === "impresion");
  const totalPaginas = impresiones.reduce((acc, i) => acc + (i.detalles?.paginas || 0) * i.cantidad, 0);
  const totalImpresionesSinDescuento = impresiones.reduce((acc, i) => acc + (i.price * i.cantidad), 0);
  const descuento = calcularDescuento(totalPaginas);
  const montoDescuento = totalImpresionesSinDescuento * descuento;
  const precioEnvio = envioGratis ? 0 : envio.costo;
  const totalFinal = (totalImpresionesSinDescuento - montoDescuento) + precioEnvio;
  
  const manejarEnviarPedido = async () => {
    const esEnvio = envio.nombre !== "Retiro en punto de encuentro (Gratis)";

    if (!nombreCliente.trim() || !telefonoCliente.trim() || carrito.length === 0 || (esEnvio && (!domicilioCliente.trim() || !localidadCliente.trim()))) {
      toast.error("⚠️ Faltan datos: Asegurate de ingresar tu nombre, teléfono y tener productos en el carrito.");
      return;
    }

    const loadingToast = toast.loading("Subiendo archivos y procesando pedido...");

    try {
      const itemsProcesados = [];

      for (const producto of carrito) {
        if (producto.detalles?.tipo === "impresion" && producto.detalles?.archivo) {
          const file = producto.detalles.archivo as File;

          const respuestaFirma = await fetch(`${API_BASE}/api/pedidos/firma-r2`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              nombreArchivo: file.name,
              tipoArchivo: file.type,
            }),
          });

          if (!respuestaFirma.ok) {
            const errorText = await respuestaFirma.text();
            console.error("Error al obtener firma:", respuestaFirma.status, errorText);
            throw new Error(`Servidor respondió: ${respuestaFirma.status}`);
          }
          
          const { urlFirma, fileKey } = await respuestaFirma.json();

          const respuestaR2 = await fetch(urlFirma, {
            method: "PUT",
            headers: { "Content-Type": file.type },
            body: file,
          });

          if (!respuestaR2.ok) throw new Error("Falló la subida a Cloudflare R2.");

          itemsProcesados.push({
            ...producto,
            detalles: { ...producto.detalles, archivo: fileKey },
          });
        } else {
          itemsProcesados.push(producto);
        }
      }

      const response = await fetch(`${API_BASE}/api/pedidos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            cliente: nombreCliente.trim(),
            telefono: telefonoCliente.trim(),
            // NUEVO: Le sumamos el aviso al domicilio para que lo leas rápido
            domicilio: esEnvio 
              ? `${domicilioCliente.trim()} ${envioGratis ? `(🎁 CÓDIGO: ${codigoAplicado})` : ""}`
              : "Con envio",
            localidad: esEnvio ? localidadCliente.trim() : "Retiro en punto de encuentro (Gratis)",
            pedido: { items: itemsProcesados },
            precioEnvio: precioEnvio,
            montoDescuento: montoDescuento,
            // NUEVO: Lo pasamos al backend (opcional, para tener el registro)
            codigoUsado: envioGratis ? codigoAplicado : null
        }),
      });

      if (!response.ok) throw new Error("Error al crear el pedido en el servidor.");

      const data = await response.json();
      
      toast.dismiss(loadingToast);
      
      if (data.initPoint) {
        toast.success("¡Pedido exitoso! Redirigiendo a pago...");
        
        // NUEVO: Guardamos el código en localStorage ANTES de ir a MercadoPago
        if (envioGratis && codigoAplicado) {
          localStorage.setItem("codigoDescuentoEnUso", codigoAplicado);
        }

        // Limpiamos los campos
        setNombreCliente("");
        setTelefonoCliente("");
        setDomicilioCliente("");
        setLocalidadCliente("");
        setEnvioGratis(false);
        setCodigoAplicado(""); // Limpiamos el código
        vaciarCarrito();
        
        setTimeout(() => {
            window.location.href = data.initPoint;
        }, 1500);
      } else {
        toast.success("🚀 Pedido enviado. ¡Nos contactaremos pronto!");
        setNombreCliente("");
        setTelefonoCliente("");
        setDomicilioCliente("");
        setLocalidadCliente("");
        setEnvioGratis(false);
        setCodigoAplicado(""); // Limpiamos el código
        vaciarCarrito();
      }

    } catch (error) {
      console.error("❌ Error completo:", error);
      toast.dismiss(loadingToast);
      toast.error("❌ Error: Verifica la conexión con el servidor.");
    }
  };

  return (
    <GlobalContext.Provider value={{
      carrito, agregarAlCarrito, eliminarDelCarrito, vaciarCarrito,
      nombreCliente, setNombreCliente, telefonoCliente, setTelefonoCliente,
      totalPaginas, totalImpresionesSinDescuento, descuento, totalFinal, manejarEnviarPedido,
      modoOscuro, toggleModoOscuro, envio, setEnvio, domicilioCliente, setDomicilioCliente, localidadCliente, setLocalidadCliente,
      envioGratis, setEnvioGratis,
      codigoAplicado, setCodigoAplicado // NUEVO: Pasamos las variables al provider
    }}>
      {children}
    </GlobalContext.Provider>
  );
}
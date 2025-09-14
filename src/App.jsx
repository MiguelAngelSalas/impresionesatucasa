import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import FileUpload from "./assets/componentes/FileUpload";
import Header from "./assets/componentes/Header";
import Inicio from "./assets/componentes/Inicio";
import Resmas from "./assets/componentes/Resmas";

function App() {
  // Test de conexión con el backend en Railway
  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL;

    fetch(`${API_URL}/ping`)
      .then((res) => res.text())
      .then((data) => console.log("✅ Conexión con backend:", data))
      .catch((err) => console.error("❌ Error al conectar con Railway:", err));
  }, []);

  return (
    <>
      <Header />
      <main className="py-6 px-4">
        <Routes>
          <Route path="/resmas" element={<Resmas />} />
          <Route path="/" element={<Inicio />} />
          <Route path="/upload" element={<FileUpload />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
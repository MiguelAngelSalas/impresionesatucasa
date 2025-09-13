import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import Header from "./assets/componentes/Header";
import Inicio from "./assets/componentes/Inicio";
import FileUpload from "./assets/componentes/FileUpload";

// Si tenés más componentes como Impresiones o Resmas, podés importarlos acá:
// import Impresiones from "./assets/componentes/Impresiones";
// import Resmas from "./assets/componentes/Resmas";

function App() {
  return (
    <Router>
      <Header />
      <main className="py-6 px-4">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/upload" element={<FileUpload />} />
          {/* Agregá más rutas si querés: */}
          {/* <Route path="/impresiones" element={<Impresiones />} /> */}
          {/* <Route path="/resmas" element={<Resmas />} /> */}
        </Routes>
      </main>
    </Router>
  );
}

export default App;
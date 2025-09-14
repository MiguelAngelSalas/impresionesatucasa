import React, { useState } from "react";
import {Routes, Route} from "react-router-dom"
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import FileUpload from "./assets/componentes/FileUpload";
import Header from "./assets/componentes/Header";
import Inicio from "./assets/componentes/Inicio"
import Resmas from "./assets/componentes/Resmas";
function App() {
  return (
    <>
      <Header/>
      <main className="py-6 px-4">
        <Routes>
          <Route path="/resmas" element={<Resmas/>}></Route>
          <Route path="/" element={<Inicio />} />
          <Route path="/upload" element={<FileUpload />} />
        </Routes>
      </main>
    </>
  );
}

export default App;

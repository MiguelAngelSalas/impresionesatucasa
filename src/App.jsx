import React, { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import FileUpload from "./assets/componentes/FileUpload";
import Header from "./assets/componentes/Header";
function App() {
  return (
    <>
      <Header />
      <FileUpload />
    </>
  );
}

export default App;

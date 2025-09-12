import React, { useState } from "react";

const FileUploader = () => {
  const [file, setFile] = useState(null);
  const [paperType, setPaperType] = useState("");
  const [clientName, setClientName] = useState("");
  const [status, setStatus] = useState("");

  const API_URL = import.meta.env.VITE_API_URL;

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (selectedFile && allowedTypes.includes(selectedFile.type)) {
      setFile(selectedFile);
      setStatus("");
    } else {
      setFile(null);
      setStatus("Tipo de archivo no permitido. Solo PDF, DOC y DOCX.");
    }
  };

  const handleUpload = async () => {
    if (!file || !paperType) {
      setStatus("Faltan datos: seleccioná archivo y tipo de papel.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("paperType", paperType);
    formData.append("clientName", clientName);

    try {
      const API_URL = import.meta.env.VITE_API_URL;
      const response = await fetch(`${API_URL}/upload`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        setStatus(`Pedido recibido: ${result.message}`);
      } else {
        setStatus("Error al subir el archivo.");
      }
    } catch (error) {
      console.error("Error:", error);
      setStatus("Error de conexión con el servidor.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-100 to-white flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-violet-700 mb-6 text-center">
          Subí tu archivo para imprimir
        </h2>

        <div className="space-y-4">
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-white file:bg-violet-600 hover:file:bg-violet-700"
          />

          <select
            value={paperType}
            onChange={(e) => setPaperType(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-violet-400"
          >
            <option value="">Seleccioná tipo de papel</option>
            <option value="A4">A4</option>
            <option value="Fotográfico">Fotográfico</option>
            <option value="Reciclado">Reciclado</option>
          </select>

          <input
            type="text"
            placeholder="Tu nombre o contacto (opcional)"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-violet-400"
          />

          <button
            onClick={handleUpload}
            className="w-full bg-violet-600 text-white py-2 rounded-lg font-medium hover:bg-violet-700 transition"
          >
            Enviar pedido
          </button>
            console.log("API_URL:", import.meta.env.VITE_API_URL);
          {status && (
            <p className="text-center text-sm text-gray-600 mt-4">{status}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileUploader;
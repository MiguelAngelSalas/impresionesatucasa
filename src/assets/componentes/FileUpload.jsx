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
    ];

    if (selectedFile && allowedTypes.includes(selectedFile.type)) {
      setFile(selectedFile);
      setStatus("");
    } else {
      setFile(null);
      setStatus("Tipo de archivo no permitido. Solo PDF.");
    }
  };

  const renameFileWithPaperType = (originalFile, paperType) => {
    const extension = originalFile.name.split(".").pop();
    const baseName = originalFile.name.replace(/\.[^/.]+$/, "");
    const newName = `${baseName}-${paperType}.${extension}`;
    return new File([originalFile], newName, { type: originalFile.type });
  };

  const handleUpload = async () => {
    if (!file || !paperType) {
      setStatus("Faltan datos: seleccioná archivo y tipo de papel.");
      return;
    }

    const renamedFile = renameFileWithPaperType(file, paperType);

    const formData = new FormData();
    formData.append("file", renamedFile);
    formData.append("paperType", paperType);
    formData.append("clientName", clientName);

    try {
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
      console.error("Error al conectar con el servidor:", error);
      setStatus("Error de conexión con el servidor.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-100 to-white flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md sm:max-w-lg md:max-w-xl bg-white rounded-xl shadow-lg p-6 sm:p-8">
        <h2 className="text-xl sm:text-2xl font-bold text-violet-700 mb-6 text-center">
          Subí tu archivo para imprimir
        </h2>

        <div className="space-y-4">
          {/* File input */}
          <div>
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-white file:bg-violet-600 hover:file:bg-violet-700"
            />
            <p className="text-xs text-gray-500 mt-1">
              Aceptamos archivos PDF. Tamaño máximo: 20MB.
            </p>
          </div>

          {/* Paper type */}
          <div>
            <select
              value={paperType}
              onChange={(e) => setPaperType(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-violet-400"
            >
              <option value="">Seleccioná tipo de papel</option>
              <option value="fotoFino">Foto fino 140 Grs</option>
              <option value="fotoGrueso">Foto Grueso 200 Grs</option>
              <option value="fotoPremium">Foto Grueso Premium 260 Grs</option>
              <option value="mateFino">Mate fino 110 Grs</option>
              <option value="mateGrueso">Mate grueso 210 Grs</option>
              <option value="mateGruesoBiFaz">Mate grueso bifaz 200 Grs</option>
              <option value="styckers">Autoadhesivo resistente al agua (Styckers)</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">
              Elegí el papel que mejor se adapte a tu diseño. Si no estás seguro, podés consultarnos.
            </p>
          </div>

          {/* Client name */}
          <div>
            <input
              type="text"
              placeholder="Tu nombre o contacto (opcional)"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-violet-400"
            />
            <p className="text-xs text-gray-500 mt-1">
              Este dato nos ayuda a identificar tu pedido. No es obligatorio.
            </p>
          </div>

          {/* Upload button */}
          <button
            onClick={handleUpload}
            className="w-full bg-violet-600 text-white py-2 rounded-lg font-medium hover:bg-violet-700 transition"
          >
            Enviar pedido
          </button>

          {/* Status message */}
          {status && (
            <p className="text-center text-sm text-gray-600 mt-4">{status}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileUploader;
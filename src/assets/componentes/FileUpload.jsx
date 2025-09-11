import React, { useState } from 'react';

const FileUploader = () => {
  const [file, setFile] = useState(null);
  const [paperType, setPaperType] = useState('');
  const [clientName, setClientName] = useState('');
  const [status, setStatus] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];

    if (selectedFile && allowedTypes.includes(selectedFile.type)) {
      setFile(selectedFile);
      setStatus('');
    } else {
      setFile(null);
      setStatus('Tipo de archivo no permitido. Solo PDF, DOC y DOCX.');
    }
  };

  const handleUpload = async () => {
    if (!file || !paperType) {
      setStatus('Faltan datos: seleccioná archivo y tipo de papel.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('paperType', paperType);
    formData.append('clientName', clientName);

    try {
      const response = await fetch('http://localhost:3001/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        setStatus(`Pedido recibido: ${result.message}`);
      } else {
        setStatus('Error al subir el archivo.');
      }
    } catch (error) {
      console.error('Error:', error);
      setStatus('Error de conexión con el servidor.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8 bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4 text-center">Subí tu archivo para imprimir</h2>

        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
          className="w-full mb-4 border border-gray-300 rounded px-2 py-1"
        />

        <select
          value={paperType}
          onChange={(e) => setPaperType(e.target.value)}
          className="w-full mb-4 border border-gray-300 rounded px-2 py-1"
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
          className="w-full mb-4 border border-gray-300 rounded px-2 py-1"
        />

        <button
          onClick={handleUpload}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Enviar pedido
        </button>

        {status && (
          <p className="mt-4 text-sm text-center text-gray-700">{status}</p>
        )}
      </div>
    </div>
  );
};

export default FileUploader;
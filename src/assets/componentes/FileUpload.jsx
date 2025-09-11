import React, { useState } from 'react';

const FileUploader = () => {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

    if (selectedFile && allowedTypes.includes(selectedFile.type)) {
      setFile(selectedFile);
      setStatus('');
    } else {
      setFile(null);
      setStatus('Tipo de archivo no permitido. Solo PDF, DOC y DOCX.');
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setStatus('Por favor selecciona un archivo válido.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:3001/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        setStatus(`Archivo subido correctamente: ${result.message}`);
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
        <h2 className="text-xl font-semibold mb-4 text-center">Subir archivo PDF o Word</h2>
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
          className="w-full mb-4 border border-gray-300 rounded px-2 py-1"
        />
        <button
          onClick={handleUpload}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Subir
        </button>
        {status && (
          <p className="mt-4 text-sm text-center text-gray-700">{status}</p>
        )}
      </div>
    </div>
  );
};

export default FileUploader;

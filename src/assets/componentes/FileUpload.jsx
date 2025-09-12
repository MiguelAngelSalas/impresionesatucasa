importimport { useState } from "react";
import axios from "axios";

export default function UploadForm() {
  const [file, setFile] = useState(null);
  const [customName, setCustomName] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return alert("Subí un archivo primero!");
    if (!customName.trim()) return alert("Poné un nombre personalizado!");

    try {
      const formData = new FormData();

      // Le agregamos el customName adelante
      const renamedFile = new File(
        [file],
        `${customName}_${file.name}`,
        { type: file.type }
      );

      formData.append("file", renamedFile);

      // Mandar al backend
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/upload`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      alert("Archivo subido con éxito!");
    } catch (err) {
      alert("Hubo un error al subir el archivo");
    }
  };

  return (
    <div className="p-4 flex flex-col gap-4 items-center">
      <input
        type="text"
        placeholder="Nombre personalizado"
        value={customName}
        onChange={(e) => setCustomName(e.target.value)}
        className="border rounded p-2 w-full max-w-sm"
      />

      <input
        type="file"
        onChange={handleFileChange}
        className="border rounded p-2 w-full max-w-sm"
      />

      <button
        onClick={handleUpload}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
      >
        Subir archivo
      </butto
    </div>
  );
}export default FileUploader;

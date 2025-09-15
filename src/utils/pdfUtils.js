import * as pdfjsLib from "pdfjs-dist";
import "pdfjs-dist/build/pdf.worker"; // Esto asegura que el worker se incluya en el bundle

// Usamos el CDN oficial para evitar errores con Vite
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export const obtenerPaginasPDF = async (archivo) => {
  return new Promise((resolve, reject) => {
    const lector = new FileReader();

    lector.onload = async function () {
      const typedArray = new Uint8Array(this.result);
      try {
        const pdf = await pdfjsLib.getDocument(typedArray).promise;
        resolve(pdf.numPages);
      } catch (error) {
        console.error("Error al leer PDF:", error);
        reject(null);
      }
    };

    lector.readAsArrayBuffer(archivo);
  });
};

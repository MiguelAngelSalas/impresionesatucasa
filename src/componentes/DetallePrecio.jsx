import React from "react";

// Diccionario de nombres legibles basado en los IDs del array precios
const nombresPapel = {
  comunByN: "Papel obra 80gr blanco y negro",
  fotoFino: "Foto fino 140 Grs",
  fotoGrueso: "Foto grueso 200 Grs",
  fotoPremium: "Foto premium 260 Grs",
  mateFino: "Mate fino 110 Grs",
  mateGrueso: "Mate grueso 210 Grs",
  mateGruesoBiFaz: "Mate grueso bifaz 200 Grs",
  styckers: "Autoadhesivo resistente al agua (Stickers)",
  tatuajesTemporales: "Tatuajes temporales",
  adhesivoComun: "Autoadhesivo comun 135 gr",
  adhesivoPremium: "Autoadhesivo premium 115 gr",
};

const formatearTipoPapel = (tipo) => {
  return nombresPapel[tipo] || tipo;
};

const DetallePrecio = ({ totalPaginas, tipoPapel, precioSinDescuento, descuento }) => {
  if (!totalPaginas || !tipoPapel) return null;

  return (
    <div className="bg-violet-50 dark:bg-slate-800/50 border border-violet-100 dark:border-slate-600/50 rounded-lg p-4 text-center text-violet-700 dark:text-violet-300 font-semibold text-base sm:text-lg space-y-2 transition-colors duration-300 shadow-sm mt-4">
      <p>
        📄 Total páginas: <span className="text-violet-900 dark:text-violet-100">{totalPaginas}</span>
      </p>
      <p>
        🧾 Papel seleccionado: <span className="text-violet-900 dark:text-violet-100">{formatearTipoPapel(tipoPapel)}</span>
      </p>
      <p>
        💰 Precio estimado: <span className="text-violet-900 dark:text-violet-100">${precioSinDescuento}</span>
      </p>
      
      {descuento > 0 && (
        <p className="text-green-700 dark:text-green-400 font-bold mt-2 pt-2 border-t border-violet-200 dark:border-slate-600/50 transition-colors duration-300">
          🎉 Descuento proyectado: {descuento * 100}%
        </p>
      )}
    </div>
  );
};

export default DetallePrecio;
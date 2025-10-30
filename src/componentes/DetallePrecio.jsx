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
};

const formatearTipoPapel = (tipo) => {
  return nombresPapel[tipo] || tipo;
};

const DetallePrecio = ({ totalPaginas, tipoPapel, precioSinDescuento, descuento }) => {
  if (!totalPaginas || !tipoPapel) return null;

  return (
    <div className="text-center text-violet-700 font-semibold text-lg space-y-1">
      📄 Total páginas: {totalPaginas} <br />
      🧾 Papel seleccionado: {formatearTipoPapel(tipoPapel)} <br />
      💰 Precio estimado: ${precioSinDescuento} <br />
      {descuento > 0 && (
        <>
          🎉 Descuento proyectado: {descuento * 100}% <br />
        </>
      )}
    </div>
  );
};

export default DetallePrecio;

import React from "react";

const DetallePrecio = ({ totalPaginas, tipoPapel, precioSinDescuento, descuento, precioFinal }) => {
  if (!totalPaginas || !tipoPapel) return null;

  return (
    <div className="text-center text-violet-700 font-semibold text-lg space-y-1">
      📄 Total páginas: {totalPaginas} <br />
      🧾 Papel seleccionado: {tipoPapel} <br />
      {descuento > 0 ? (
        <>
          💰 Precio original: <span className="line-through text-gray-500">${precioSinDescuento}</span> <br />
          🎉 Descuento aplicado: {descuento * 100}% <br />
          💸 Precio final: ${precioFinal}
        </>
      ) : (
        <>💰 Precio estimado: ${precioFinal}</>
      )}
    </div>
  );
};

export default DetallePrecio;

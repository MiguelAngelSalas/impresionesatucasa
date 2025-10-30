import React from "react";

const DetallePrecio = ({ totalPaginas, tipoPapel, precioSinDescuento, descuento }) => {
  if (!totalPaginas || !tipoPapel) return null;

  return (
    <div className="text-center text-violet-700 font-semibold text-lg space-y-1">
      📄 Total páginas: {totalPaginas} <br />
      🧾 Papel seleccionado: {tipoPapel} <br />
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

import React from "react";

const SelectorPapel = ({ value, onChange }) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-violet-400"
    >
      <option value="">Seleccioná tipo de papel</option>
      <option value="comunByN">Papel obra 80 grs</option>
      <option value="fotoFino">Foto fino 140 Grs</option>
      <option value="fotoGrueso">Foto Grueso 200 Grs</option>
      <option value="fotoPremium">Foto Premium 260 Grs</option>
      <option value="mateFino">Mate fino 110 Grs</option>
      <option value="mateGrueso">Mate grueso 210 Grs</option>
      <option value="mateGruesoBiFaz">Mate grueso bifaz 200 Grs</option>
      <option value="styckers">Autoadhesivo resistente al agua (Styckers)</option>
    </select>
  );
};


export default SelectorPapel;

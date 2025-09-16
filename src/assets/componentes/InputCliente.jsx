import React from "react";

const InputCliente = ({ value, onChange }) => {
  return (
    <input
      type="text"
      placeholder="Tu nombre (opcional pero importante)"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-violet-400"
    />
  );
};


export default InputCliente;

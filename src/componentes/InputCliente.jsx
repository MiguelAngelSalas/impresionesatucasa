import React from "react";

const InputCliente = ({ value, onChange }) => {
  return (
    <input
      type="text"
      placeholder="Tu nombre (opcional pero importante)"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-lg px-3 py-2 text-gray-700 dark:text-slate-100 placeholder-gray-400 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-400 dark:focus:ring-violet-500 transition-colors duration-300"
    />
  );
};

export default InputCliente;
import React from "react";

const InputArchivo = ({ onChange, totalPaginas }) => {
  return (
    <div className="relative flex items-center gap-4">
      <input
        type="file"
        accept=".pdf"
        onChange={onChange}
        className="block w-full text-sm text-gray-700 dark:text-slate-300 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-white file:bg-violet-600 hover:file:bg-violet-700 dark:file:bg-violet-700 dark:hover:file:bg-violet-600 transition-colors duration-300 cursor-pointer"
      />
      {totalPaginas !== null && (
        <div className="bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300 font-semibold px-3 py-1 rounded-lg text-sm shadow-sm whitespace-nowrap transition-colors duration-300">
          {totalPaginas} páginas
        </div>
      )}
    </div>
  );
};

export default InputArchivo;
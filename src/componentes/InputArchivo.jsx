import React from "react";

const InputArchivo = ({ onChange, totalPaginas }) => {
  return (
    <div className="relative flex items-center gap-4">
      <input
        type="file"
        accept=".pdf"
        onChange={onChange}
        className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-white file:bg-violet-600 hover:file:bg-violet-700"
      />
      {totalPaginas !== null && (
        <div className="bg-violet-100 text-violet-700 font-semibold px-3 py-1 rounded-lg text-sm shadow-sm whitespace-nowrap">
          {totalPaginas} páginas
        </div>
      )}
    </div>
  );
};

export default InputArchivo;
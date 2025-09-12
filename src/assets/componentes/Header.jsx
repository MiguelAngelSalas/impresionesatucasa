import React from 'react';

const Header = () => {
  return (
    <header className="bg-violet-100 border-b border-violet-300 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <h1 className="text-xl font-bold text-violet-700 tracking-wide">
          impresiones A Tu Casa
        </h1>

        <nav className="flex space-x-4">
          <button className="text-sm font-medium text-violet-700 hover:text-violet-900 transition">
            Inicio
          </button>
          <button className="text-sm font-medium text-violet-700 hover:text-violet-900 transition">
            Impresiones
          </button>
          <button className="text-sm font-medium text-violet-700 hover:text-violet-900 transition">
            Resmas
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ cartCount }) => {
  return (
    <header className="bg-violet-100 border-b border-violet-300 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <h1 className="text-xl font-bold text-violet-700 tracking-wide">
          impresiones A Tu Casa
        </h1>

        <nav className="flex space-x-4 items-center">
          <Link to="/" className="text-sm font-medium text-violet-700 hover:text-violet-900 transition">
            Inicio
          </Link>
          <Link to="/upload" className="text-sm font-medium text-violet-700 hover:text-violet-900 transition">
            Impresiones
          </Link>
          {/*<Link to="/resmas" className="text-sm font-medium text-violet-700 hover:text-violet-900 transition">
            Resmas
          </Link>*/}
          <Link to="/carrito" className="relative text-sm font-medium text-violet-700 hover:text-violet-900 transition">
            🛒 Carrito
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
                {cartCount}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;


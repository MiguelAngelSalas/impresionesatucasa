import React from "react";

export default function Footer() {
  return (
    <footer className="flex justify-between flex-wrap p-8 bg-slate-100 dark:bg-slate-900 border-t border-violet-200 dark:border-slate-800 transition-colors duration-300 gap-8">
      
      {/* Columna izquierda */}
      <div className="flex-1 min-w-[200px]">
        <h3 className="mb-2 text-xl font-bold text-violet-800 dark:text-violet-400 transition-colors duration-300">
          Impresiones a tu casa
        </h3>
        <p className="text-base text-gray-700 dark:text-slate-300 mb-1 transition-colors duration-300">
          Temperley, Buenos Aires
        </p>
        <p className="text-base text-gray-700 dark:text-slate-300 transition-colors duration-300">
          © {new Date().getFullYear()}{" "}
          <a
            href="https://impresionesatucasa.com.ar"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-violet-700 dark:text-violet-400 hover:text-violet-900 dark:hover:text-violet-300 transition-colors duration-300"
          >
            impresionesatucasa.com.ar
          </a>
        </p>
      </div>

      {/* Columna derecha */}
      <div className="flex-1 min-w-[200px] sm:text-right">
        <h4 className="text-xl font-bold mb-4 text-violet-800 dark:text-violet-400 transition-colors duration-300">
          Contacto
        </h4>

        <div className="flex items-center justify-start sm:justify-end mb-4">
          <a
            href="https://wa.me/5491123909529"
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg mr-3 text-gray-700 dark:text-slate-300 hover:text-violet-700 dark:hover:text-violet-400 transition-colors duration-300"
          >
            WhatsApp
          </a>
          <img
            src="/logoWhatsap.png"
            alt="WhatsApp"
            className="w-8 hover:scale-110 transition-transform duration-300"
          />
        </div>

        <div className="flex items-center justify-start sm:justify-end mb-4">
          <a
            href="mailto:impresionesatucasaa@gmail.com"
            className="text-lg mr-3 text-gray-700 dark:text-slate-300 hover:text-violet-700 dark:hover:text-violet-400 transition-colors duration-300"
          >
            impresionesatucasaa@gmail.com
          </a>
          <img
            src="/logoGmail.png"
            alt="Email"
            className="w-8 hover:scale-110 transition-transform duration-300"
          />
        </div>

        <div className="flex items-center justify-start sm:justify-end mb-4">
          <a
            href="https://www.facebook.com/impresionesatucasa"
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg mr-3 text-gray-700 dark:text-slate-300 hover:text-violet-700 dark:hover:text-violet-400 transition-colors duration-300"
          >
            Facebook
          </a>
          <img
            src="/logoFacebook.png"
            alt="Facebook"
            className="w-8 hover:scale-110 transition-transform duration-300"
          />
        </div>
      </div>
      
    </footer>
  );
}
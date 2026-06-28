// src/components/Footer.tsx

export default function Footer() {
  return (
    <footer className="flex justify-between flex-wrap p-8 bg-slate-100 dark:bg-slate-900 border-t border-violet-200 dark:border-slate-800 transition-colors duration-300 gap-8">
      
      {/* Columna izquierda */}
      <div className="flex-1 min-w-50">
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
      <div className="flex-1 min-w-50 sm:text-right">
        <h4 className="text-xl font-bold mb-4 text-violet-800 dark:text-violet-400 transition-colors duration-300">
          Contacto
        </h4>

        {/* Links de Contacto */}
        <ContactLink 
          href="https://wa.me/5491123909529" 
          text="WhatsApp" 
          imgSrc="/logoWhatsap.png" 
        />
        <ContactLink 
          href="mailto:impresionesatucasaa@gmail.com" 
          text="impresionesatucasaa@gmail.com" 
          imgSrc="/logoGmail.png" 
        />
        <ContactLink 
          href="https://www.facebook.com/impresionesatucasa" 
          text="Facebook" 
          imgSrc="/logoFacebook.png" 
        />
      </div>
      
    </footer>
  );
}

// Sub-componente para limpiar el código y no repetir el HTML de cada link
function ContactLink({ href, text, imgSrc }: { href: string; text: string; imgSrc: string }) {
  return (
    <div className="flex items-center justify-start sm:justify-end mb-4">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        // Movemos las clases de texto y hover aquí para que apliquen a todo el conjunto
        className="flex items-center text-lg text-gray-700 dark:text-slate-300 hover:text-violet-700 dark:hover:text-violet-400 transition-colors duration-300"
      >
        <span className="mr-3">{text}</span>
        
        {/* Ahora la imagen está DENTRO del <a> */}
        <img
          src={imgSrc}
          alt={text}
          className="w-8 hover:scale-110 transition-transform duration-300"
        />
      </a>
    </div>
  );
}
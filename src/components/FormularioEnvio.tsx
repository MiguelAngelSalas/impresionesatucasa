// src/components/FormularioEnvio.tsx
import MensajeEstado  from "./MensajeEstado";
// 1. Definimos las props para asegurar que las funciones sean del tipo correcto
interface FormularioEnvioProps {
  manejarEnvio: () => void;
  manejarAgregarAlCarrito: () => void;
  estado: string; // O el tipo específico que sea tu estado (ej: 'idle' | 'loading' | 'success')
}

export default function FormularioEnvio({ 
  manejarEnvio, 
  manejarAgregarAlCarrito, 
  estado 
}: FormularioEnvioProps) {
  return (
    <>
      <button
        onClick={manejarAgregarAlCarrito}
        className="w-full bg-violet-600 dark:bg-violet-700 hover:bg-violet-700 dark:hover:bg-violet-600 text-white font-bold py-3 px-4 rounded-lg shadow-md dark:shadow-black/40 transition-all duration-300 transform hover:-translate-y-0.5"
      >
        🛒 Agregar al carrito
      </button>
      
      {/* MensajeEstado debería ser tipado en su propio archivo */}
      <MensajeEstado estado={estado} />
    </>
  );
}
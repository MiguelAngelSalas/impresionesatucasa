// src/components/BotonEnviar.tsx

// 1. Definimos las propiedades que recibe el componente
interface BotonEnviarProps {
  onClick: () => void; // Decimos que es una función que no recibe nada y no retorna nada
}

export default function BotonEnviar({ onClick }: BotonEnviarProps) {
  return (
    <button
      onClick={onClick}
      className="w-full bg-violet-600 dark:bg-violet-700 text-white py-3 text-lg rounded-lg font-bold shadow-md dark:shadow-black/40 hover:bg-violet-700 dark:hover:bg-violet-600 transition-all duration-300 transform hover:-translate-y-0.5 border border-red-500 dark:border-red-400"
    >
      Enviar pedido
    </button>
  );
}
// src/components/MensajeEstado.tsx

import { Info } from 'lucide-react';

interface MensajeEstadoProps {
  estado: string | null;
}

export default function MensajeEstado({ estado }: MensajeEstadoProps) {
  if (!estado) return null;

  return (
    <div className="flex items-center justify-center gap-2 text-gray-600 dark:text-slate-300 mt-4 transition-colors duration-300">
      <Info size={16} />
      <p className="text-sm text-center">
        {estado}
      </p>
    </div>
  );
}
// src/components/MensajeContacto.tsx

import { MessageCircle } from 'lucide-react';

export default function MensajeContacto() {
  return (
    <div className="flex items-center justify-center gap-2 bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-800/50 text-green-800 dark:text-green-300 text-sm font-medium px-4 py-3 rounded-lg shadow-sm text-center mt-4 transition-colors duration-300">
      <MessageCircle size={18} />
      <p>En breve nos comunicaremos por WhatsApp para confirmar tu pedido</p>
    </div>
  );
}
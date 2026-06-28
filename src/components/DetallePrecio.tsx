// src/components/DetallePrecio.tsx

import { FileText, Tag, DollarSign, Gift } from "lucide-react";

// 1. Diccionario de nombres
const nombresPapel: Record<string, string> = {
  comunByN: "Papel obra 80gr blanco y negro",
  fotoFino: "Foto fino 140 Grs",
  fotoGrueso: "Foto grueso 200 Grs",
  fotoPremium: "Foto premium 260 Grs",
  mateFino: "Mate fino 110 Grs",
  mateGrueso: "Mate grueso 210 Grs",
  mateGruesoBiFaz: "Mate grueso bifaz 200 Grs",
  styckers: "Autoadhesivo resistente al agua (Stickers)",
  tatuajesTemporales: "Tatuajes temporales",
  adhesivoComun: "Autoadhesivo comun 135 gr",
  adhesivoPremium: "Autoadhesivo premium 115 gr",
};

const formatearTipoPapel = (tipo: string): string => nombresPapel[tipo] || tipo;

interface DetallePrecioProps {
  totalPaginas: number | null;
  tipoPapel: string | null;
  precioSinDescuento: number;
  descuento: number;
}

export default function DetallePrecio({ 
  totalPaginas, 
  tipoPapel, 
  precioSinDescuento, 
  descuento 
}: DetallePrecioProps) {
  
  if (!totalPaginas || !tipoPapel) return null;

  return (
    <div className="bg-violet-50 dark:bg-slate-800/50 border border-violet-100 dark:border-slate-600/50 rounded-lg p-5 text-violet-800 dark:text-violet-200 text-sm sm:text-base space-y-4 transition-colors duration-300 shadow-sm mt-4">
      
      <div className="flex items-center gap-3">
        <FileText size={20} className="text-violet-600 dark:text-violet-400" />
        <p>Total páginas: <span className="font-bold">{totalPaginas}</span></p>
      </div>

      <div className="flex items-center gap-3">
        <Tag size={20} className="text-violet-600 dark:text-violet-400" />
        <p>Papel: <span className="font-bold">{formatearTipoPapel(tipoPapel)}</span></p>
      </div>

      <div className="flex items-center gap-3">
        <DollarSign size={20} className="text-violet-600 dark:text-violet-400" />
        <p>Precio estimado: <span className="font-bold">${precioSinDescuento.toFixed(2)}</span></p>
      </div>
      
      {descuento > 0 && (
        <div className="flex items-center gap-3 pt-3 border-t border-violet-200 dark:border-slate-600/50 text-green-700 dark:text-green-400">
          <Gift size={20} />
          <p className="font-bold">¡Descuento aplicado: {(descuento * 100).toFixed(0)}%!</p>
        </div>
      )}
    </div>
  );
}
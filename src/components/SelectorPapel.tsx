// src/components/SelectorPapel.tsx

interface SelectorPapelProps {
  value: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
}

export default function SelectorPapel({ value, onChange }: SelectorPapelProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-lg px-3 py-2 text-gray-700 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-violet-400 dark:focus:ring-violet-500 transition-colors duration-300"
    >
      <option value="" disabled className="text-gray-500 dark:text-slate-400">
        Seleccioná tipo de papel
      </option>
      <option value="comunByN">Papel obra 80 grs</option>
      <option value="fotoFino">Foto fino 140 Grs</option>
      <option value="fotoGrueso">Foto Grueso 200 Grs</option>
      <option value="fotoPremium">Foto Premium 260 Grs</option>
      <option value="mateFino">Mate fino 110 Grs</option>
      <option value="mateGrueso">Mate grueso 210 Grs</option>
      <option value="mateGruesoBiFaz">Mate grueso bifaz 200 Grs</option>
      <option value="styckers">Autoadhesivo resistente al agua (Styckers)</option>
      <option value="tatuajesTemporales">Tatuajes temporales</option>
      <option value="adhesivoComun">Autoadhesivo Comun 135 gr</option>
      <option value="adhesivoPremium">Autoadhesivo Premium 115 gr</option>
    </select>
  );
}
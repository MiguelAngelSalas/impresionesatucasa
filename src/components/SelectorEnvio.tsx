import { mapeoLocalidades, preciosEnvio } from "@/utilidades/preciosEnvios";
import { useContext } from "react";
import { GlobalContext } from "@/context/GlobalContext";

export default function SelectorEnvio(){
    const { setEnvio, setLocalidadCliente } = useContext(GlobalContext);

    const manejarCambio = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const nombreElegido = e.target.value; // Ahora esto captura "Lomas de Zamora"
        
        if (!nombreElegido){
            setEnvio({nombre: "Retiro en punto de encuentro (Gratis)", costo: 0});
            setLocalidadCliente(""); 
            return;
        }

        // 1. Buscamos en tu array la localidad que coincida con el nombre elegido
        const localidadEncontrada = mapeoLocalidades.find(loc => loc.nombre === nombreElegido);
        
        if (localidadEncontrada) {
            // 2. Sacamos el costo usando la zona de esa localidad específica
            const costo = preciosEnvio[localidadEncontrada.zona as keyof typeof preciosEnvio];
            
            // 3. Guardamos el nombre real para el Drive y el costo para Mercado Pago
            setEnvio({nombre: `Envío a ${nombreElegido}`, costo});
            setLocalidadCliente(nombreElegido); 
        }
    }

    return (
        <div>
            <select 
              onChange={manejarCambio} 
              name="conEnvio" 
              id="conEnvio" 
              className="w-full p-2 border rounded dark:bg-slate-700 dark:border-slate-600 outline-none focus:ring-2 focus:ring-violet-500 disabled:opacity-50"
            >
                <option value="">Retiro en punto de encuentro (Gratis)</option>
                {mapeoLocalidades.map((loc) => (
                    // EL CAMBIO CLAVE: Cambiamos value={loc.zona} por value={loc.nombre}
                    <option key={loc.nombre} value={loc.nombre}>
                        {loc.nombre} - ${preciosEnvio[loc.zona as keyof typeof preciosEnvio]}
                    </option>
                ))}
            </select>
        </div>
    )
}
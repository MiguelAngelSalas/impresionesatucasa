import { mapeoLocalidades, preciosEnvio } from "@/utilidades/preciosEnvios";
import { useContext } from "react";
import { GlobalContext } from "@/context/GlobalContext";

export default function SelectorEnvio(){
    const {setEnvio} = useContext(GlobalContext)

    const manejarCambio = (e:React.ChangeEvent<HTMLSelectElement>)=>{
        const valor = e.target.value
        if (!valor){
            setEnvio({nombre: "Coordinamos punto de retiro por WhatsApp", costo:0})
            return;
        }
        const costo = preciosEnvio[valor as keyof typeof preciosEnvio];
        setEnvio({nombre: `Envio ${valor}`, costo})
    }
    return (
        <div>
            <select onChange={manejarCambio} name="conEnvio" id="conEnvio" className="w-full p-2 textborder rounded  dark:bg-slate-700 dark:border-slate-600 outline-none focus:ring-2 focus:ring-violet-500 disabled:opacity-50">
                <option value="">Retiro en punto de encuentro (Gratis)</option>
                {mapeoLocalidades.map((loc)=>(
                    <option key={loc.nombre} value={loc.zona}>
                        {loc.nombre} - ${preciosEnvio[loc.zona as keyof typeof preciosEnvio]}
                    </option>
                ))}
            </select>
        </div>
    )
    
}
// src/components/Consultas.tsx

// 1. Definimos la interfaz para que TypeScript entienda la estructura de tus datos
interface PreguntaFrecuente {
  pregunta: string;
  respuesta: string;
}

export default function Consultas() {
  // 2. Aplicamos el tipo a la constante
  const preguntas: PreguntaFrecuente[] = [
    {
      pregunta: "¿Qué tipo de archivo puedo subir?",
      respuesta: "De momento solo se admiten archivos PDF. Próximamente podrás subir otros formatos e imágenes individuales."
    },
    {
      pregunta: "¿Los colores salen igual que en pantalla?",
      respuesta: "Los colores pueden variar mínimamente respecto a lo que ves en pantalla, ya que cada dispositivo y tipo de papel tiene sus propias características. Usamos materiales de calidad para lograr la mejor fidelidad posible."
    },
    {
      pregunta: "¿Puedo pagar por MercadoPago?",
      respuesta: "Sí. Pronto habilitaremos el carrito con pago automático. Por ahora, coordinamos por WhatsApp."
    },
    {
      pregunta: "¿Hacen reimpresiones si no me gusta el resultado?",
      respuesta: "Nos encargamos de revisar cada archivo antes de imprimir para evitar errores como líneas, cortes o colores fuera de lugar. Si el resultado final tiene algún problema que no estaba en el archivo original —como errores de impresión o papel dañado— no hay drama: lo reimprimimos sin costo."
    }
  ];

  return (
    <section className="max-w-4xl mx-auto px-4 py-12 transition-colors duration-300">
      <h2 className="text-3xl font-bold text-violet-800 dark:text-violet-400 mb-8 text-center transition-colors duration-300">
        Preguntas Frecuentes
      </h2>
      <div className="space-y-6">
        {preguntas.map((item, index) => (
          <div 
            key={index} 
            className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg p-6 shadow-md dark:shadow-black/40 hover:shadow-lg transition-all duration-300"
          >
            <h3 className="text-lg font-semibold text-gray-800 dark:text-slate-200 mb-2 transition-colors duration-300">
              {item.pregunta}
            </h3>
            <p className="text-gray-700 dark:text-slate-300 transition-colors duration-300">
              {item.respuesta}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
const Consultas = () => {
  const preguntas = [
    {
      pregunta: "¿Qué tipo de archivo puedo subir?",
      respuesta: "Aceptamos solo PDF. Pronto habilitaremos mas extensiones como fotos separadas."
    },
    {
      pregunta: "¿Los colores salen igual que en pantalla?",
      respuesta: "Los colores pueden variar mínimamente respecto a lo que ves en pantalla, ya que cada dispositivo y tipo de papel tiene sus propias características. Usamos materiales de calidad para lograr la mejor fidelidad posible."
    },
    {
      pregunta: "¿Cuánto tarda el envío?",
      respuesta: "Organizamos las entregas según el horario en que se realiza el pedido. Si hacés tu pedido antes de las 12:00 hs, entra en la ruta de reparto del mismo día (por la tarde). Los pedidos realizados hasta las 17:00 hs se preparan para la entrega al día siguiente. Este sistema nos permite mantener un ritmo de trabajo ágil y ordenado, asegurando que cada impresión llegue en tiempo y forma."
    },
    {
      pregunta: "¿Puedo pagar directamente por MercadoPago?",
      respuesta: "Sí. Pronto habilitaremos el carrito con pago automático. Por ahora, coordinamos por WhatsApp."
    },
    {
      pregunta: "¿Hacen reimpresiones si no me gusta el resultado?",
      respuesta: "Nos encargamos de revisar cada archivo antes de imprimir para evitar errores como líneas, cortes o colores fuera de lugar. Si el resultado final tiene algún problema que no estaba en el archivo original —como errores de impresión o papel dañado— no hay drama: lo reimprimimos sin costo."
    }
  ];

  return (
    <section className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-violet-800 mb-8 text-center">Preguntas Frecuentes</h1>
      <div className="space-y-6">
        {preguntas.map((item, index) => (
          <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 shadow">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">{item.pregunta}</h2>
            <p className="text-gray-700">{item.respuesta}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Consultas;

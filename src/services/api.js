export const subirArchivo = async ({ archivo, tipoPapel, nombreCliente }) => {
  const formData = new FormData();
  formData.append("file", archivo);
  formData.append("paperType", tipoPapel);
  formData.append("clientName", nombreCliente);

  try {
    const API_URL = import.meta.env.VITE_API_URL;
    const respuesta = await fetch(`${API_URL}/upload`, {
      method: "POST",
      body: formData,
    });

    if (respuesta.ok) {
      const { pedido } = await respuesta.json();
      return {
        mensaje: "✅ Pedido recibido correctamente",
        pedido,
      };
    } else {
      const error = await respuesta.json();
      return { mensaje: error.message || "Error al subir el archivo." };
    }
  } catch (error) {
    console.error("Error al conectar con el servidor:", error);
    return { mensaje: "Error de conexión con el servidor." };
  }
};
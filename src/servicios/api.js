const API_URL = "https://api.impresionesatucasa.com.ar"


export const subirArchivo = async ({ archivo, tipoPapel, nombreCliente, telefonoCliente, paginas }) => {
  const formData = new FormData();
  formData.append("file", archivo, archivo.name); // 👈 nombre explícito
  formData.append("paperType", tipoPapel);
  formData.append("clientName", nombreCliente);
  formData.append("telefonoCliente", telefonoCliente);
  formData.append("paginas", paginas);

  try {
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

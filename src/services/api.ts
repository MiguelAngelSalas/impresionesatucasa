// src/servicios/api.ts

// 1. Usamos la variable de entorno nativa de Next.js
export const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.impresionesatucasa.com.ar";

// 2. Definimos una interfaz para asegurar que los datos sean correctos
interface SubirArchivoParams {
  archivo: File;
  tipoPapel: string;
  nombreCliente: string;
  telefonoCliente: string;
  paginas: number;
}

interface RespuestaAPI {
  mensaje: string;
  pedido?: any;
}

export const subirArchivo = async ({
  archivo,
  tipoPapel,
  nombreCliente,
  telefonoCliente,
  paginas,
}: SubirArchivoParams): Promise<RespuestaAPI> => {
  const formData = new FormData();
  
  formData.append("file", archivo, archivo.name);
  formData.append("paperType", tipoPapel);
  formData.append("clientName", nombreCliente);
  formData.append("telefonoCliente", telefonoCliente);
  formData.append("paginas", paginas.toString());

  try {
    const respuesta = await fetch(`${API_URL}/pedidos`, {
      method: "POST",
      body: formData,
      // En Next.js, si el backend está en otro dominio, recordá incluir credentials si es necesario
      credentials: "include", 
    });

    const data = await respuesta.json();

    if (respuesta.ok) {
      return {
        mensaje: "✅ Pedido recibido correctamente",
        pedido: data.pedido,
      };
    } else {
      return { mensaje: data.message || "Error al subir el archivo." };
    }
  } catch (error) {
    console.error("Error al conectar con el servidor:", error);
    return { mensaje: "Error de conexión con el servidor." };
  }
};
// src/utils/anillados.ts

export interface TipoAnillado {
  id: string;
  nombre: string;
  maxHojas: number;
  precio: number;
}

// Precios de ejemplo (ajustalos a tu rentabilidad)
export const TIPOS_ANILLADO: TipoAnillado[] = [
  { id: '9mm', nombre: 'Espiral 9mm', maxHojas: 50, precio: 3500 },
  { id: '14mm', nombre: 'Espiral 14mm', maxHojas: 80, precio: 4000 },
  { id: '20mm', nombre: 'Espiral 20mm', maxHojas: 110, precio: 4500 },
  { id: '25mm', nombre: 'Espiral 25mm', maxHojas: 150, precio: 5000 },
  { id: '29mm', nombre: 'Espiral 29mm', maxHojas: 200, precio: 5500 },
  { id: '40mm', nombre: 'Espiral 40mm', maxHojas: 300, precio: 6000 },
];

export function calcularAnillado(cantidadHojas: number): TipoAnillado | null {
  // Buscamos el primer anillado cuya capacidad máxima sea mayor o igual a nuestras hojas
  const anilladoAdecuado = TIPOS_ANILLADO.find(
    (anillado) => cantidadHojas <= anillado.maxHojas
  );

  // Si devuelve null, es porque supera las 500 hojas (el máximo que tenemos)
  return anilladoAdecuado || null;
}
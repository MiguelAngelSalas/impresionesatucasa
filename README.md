# Infraestructura de impresionesATuCasa

## Frontend (Vercel)
- React + Vite
- URL: https://impresiones.vercel.app
- Variables:
  - VITE_API_URL=https://backend.northflank.app/api

## Backend (Northflank)
- Node.js + Express + Multer + Cloudinary
- URL: https://backend.northflank.app
- Variables:
  - CLOUDINARY_URL=...
  - TELEGRAM_BOT_TOKEN=...
  - TELEGRAM_CHAT_ID=...

## Flujo de pedido
1. Cliente carga archivo PDF
2. Frontend envía `FormData` a `/api/pedidos`
3. Backend sube a Cloudinary
4. (Opcional) Notifica por Telegram
5. Respuesta confirmada en frontend

# Invitaciones · Astro

Base reutilizable para una invitación móvil con ilustración, ubicación y confirmación por WhatsApp. Sin base de datos; WhatsApp abre un mensaje preparado que el invitado debe enviar. La web no registra confirmaciones.

## Desarrollo

Requiere Node >=22.12 (recomendado Node 24).

```sh
npm install
npm run dev
```

En PowerShell, usa `npm.cmd` si la política de ejecución bloquea `npm.ps1`.

## Personalizar

- Reemplaza `public/invitacion.png` o cambia `image` en `src/config/invitation.ts`.
- Configura `whatsapp.phone` con código de país y solo dígitos, y el mensaje.
- Completa latitud/longitud y selecciona `google` o `waze`. Se abre su enlace compatible con móvil; la apertura de la app depende del dispositivo.
- Ajusta `buttons`: `x` y `y` indican el centro en porcentajes de la imagen; `width` su ancho porcentual. No hace falta editar CSS.
- Actualiza título, descripción y texto alternativo al cambiar la invitación. Los textos impresos en la imagen se modifican en el archivo gráfico.
- Desactiva `animations` si lo deseas. Se respeta automáticamente la preferencia de movimiento reducido.

La imagen se muestra completa, sin recortar. La plantilla conserva su proporción natural. Los botones originales están impresos en la imagen: si se mueven los botones reales, conviene usar una versión de la ilustración sin botones dibujados.

## Validar producción

```sh
npm run build
npm start
```

Abre http://localhost:4321. El servidor usa `PORT` cuando el hosting lo define.

## Plan para completar

1. Confirmar año/fecha, dirección/coordenadas, número de WhatsApp y contenido final. La imagen no indica año y la dirección es un texto de ejemplo.
2. Revisar la composición en teléfonos de 320–430 px y escritorio; ajustar botones y, si hace falta, preparar una imagen sin botones impresos y una versión más liviana.
3. Probar enlaces en Android/iPhone, envío manual del mensaje y preferencia de movimiento reducido. Añadir imagen social y favicon definitivos.
4. Crear un repositorio GitHub, subir esta base y conectar el repositorio a Railway. No hay repositorio remoto ni despliegue creados todavía.
5. En Railway, usar los comandos de `railway.json`, generar el dominio público del servicio y verificar los enlaces en el sitio publicado. Comprobar costos y límites del plan antes de publicar: un dominio genérico no garantiza hosting gratuito.

Para otra invitación, reutiliza el repositorio como plantilla y cambia imagen/configuración. Cada cambio requiere un nuevo build; Railway puede hacerlo automáticamente desde GitHub.

# Invitaciones · Astro

Base reutilizable para una invitación móvil con ilustración, ubicación y confirmación por WhatsApp. Sin base de datos; WhatsApp abre un mensaje preparado que el invitado debe enviar. La web no registra confirmaciones.

## Desarrollo

Requiere Node >=22.12 (recomendado Node 24).

```sh
npm install
npm run dev
```

En PowerShell, usa `npm.cmd` si la política de ejecución bloquea `npm.ps1`.

## Editar el diseño con Tailwind

Se utiliza Tailwind CSS 4 con su plugin oficial `@tailwindcss/vite` (configurado en `astro.config.mjs`).

- `src/pages/index.astro`: clases de Tailwind para colores, sombras, fuentes, espacios, botones y estados de interacción. `placedClasses`, `fitClasses` y `actionClasses` agrupan las clases compartidas para modificarlas una sola vez.
- `src/styles/global.css`: entrada de Tailwind, fuentes del tema (`font-body`, `font-script`), animación `animate-float` y dos utilidades para las posiciones y el ajuste de la lámina a la pantalla.
- `src/config/invitation.ts`: contenido, fondos, colores y coordenadas. Los nombres de los padres tienen `x: 74` solamente en `mobileLayout`; escritorio mantiene su posición anterior.

Las condiciones responsive del bloque `<style is:inline>` se generan desde `responsiveMedia` para mantener sincronizados el fondo y sus coordenadas. El resto de los estilos visuales utiliza utilidades Tailwind.

### Apertura y efectos de interacción

`src/components/InvitationEffects.astro` añade una apertura de polvo luminoso circular de 2,8 segundos, una estela de pétalos/corazones con el ratón y un halo con partículas al tocar o hacer clic. El color sigue la plantilla seleccionada. No requiere GIF, video ni librerías adicionales: utiliza Tailwind, animaciones CSS y Web Animations para las partículas.

En `invitation.ts`, `effects.opening`, `effects.cursorTrail` y `effects.touchBurst` activan cada efecto por separado. `animations: false` desactiva todos los efectos, incluidos los corazones flotantes. También se desactivan si el dispositivo solicita movimiento reducido.

La apertura se reproduce en cada carga y se desvanece automáticamente incluso sin JavaScript. Los efectos no interceptan botones ni gestos de desplazamiento; las partículas se eliminan al terminar. Al volver mediante el historial restaurado no se repite la apertura.

## Personalizar

- En `src/config/invitation.ts`, selecciona `template: 'rosa'` o `template: 'celeste'`. Cada plantilla define su imagen, dimensiones, colores y posiciones en `templates`.
- Edita `text` para cambiar nombre, título del evento, párrafos, fecha, hora, papás, dirección y despedida. Usa `\n` para insertar saltos de línea. El contenido se renderiza como texto, sin interpretar HTML.
- Configura `whatsapp.phone` con código de país y solo dígitos, y el mensaje.
- Completa latitud/longitud y selecciona `google` o `waze`. Se abre su enlace compatible con móvil; la apertura de la app depende del dispositivo.
- Cambia las etiquetas en `invitation.buttons`. Para mover los botones, edita `templates.rosa.buttons` o `templates.celeste.buttons`.
- En `layout` puedes ajustar cada texto: `x` y `y` son el centro en porcentajes de la imagen; `width` y `height` su espacio; `fontSize` el tamaño máximo como porcentaje del ancho. Los textos largos se reducen automáticamente para caber. Prefiere frases breves para mantener la legibilidad en celular.
- Actualiza también `title` y `description` para el navegador y la descripción al compartir.
- Desactiva `animations` si lo deseas. Se respeta automáticamente la preferencia de movimiento reducido.

La imagen se muestra completa, sin recortar. Ambas plantillas están libres de textos: todos los mensajes son HTML seleccionable y accesible. Se usan Great Vibes para el nombre y la despedida, y Cormorant Garamond para los demás textos; las fuentes se sirven localmente mediante Fontsource. Los adornos e iconos de botones siguen formando parte de la imagen: al mover las zonas clicables, esos dibujos permanecen en su posición.

Ejemplo de personalización:

```ts
template: 'celeste',
// Dentro de text:
name: 'Mateo Andrés',
introduction: 'Un hermoso príncipe pronto llegará a iluminar\nnuestras vidas. Esperamos compartir juntos y así\ncelebrar la vida y llegada de nuestro bebé',
```

La selección es durante el desarrollo/build; los invitados ven solamente la plantilla elegida. La imagen original `public/invitacion.png` se conserva como referencia, pero ya no se utiliza de fondo.

### Adaptación automática a pantallas

El color se sigue eligiendo con `invitation.template`. Dentro de cada color, el navegador selecciona imagen y posiciones conjuntamente:

- Teléfono vertical de hasta 600 px y relación ancho/alto hasta 0.51: versión `tall` (1080 × 2340, 9:19.5).
- Otros teléfonos verticales de hasta 600 px: versión `mobile` (1080 × 1920, 9:16).
- Escritorio, tablet o pantalla horizontal: composición original (1086 × 1448).

Se usa el tamaño del viewport en píxeles CSS, no la resolución física ni el modelo del teléfono. `<picture>` selecciona la imagen y las mismas condiciones CSS cambian todas las posiciones. La selección se actualiza al girar o redimensionar la pantalla.

La lámina se ajusta tanto al ancho como a la altura visible estable (`svh`), respetando las zonas seguras del dispositivo. Se muestra completa y centrada, sin recortarla; pueden quedar márgenes cuando la proporción de la pantalla difiere de la imagen. El zoom del navegador sigue habilitado.

En `mobileVariants` de `src/config/invitation.ts` puedes cambiar las imágenes, las posiciones de botones y los textos de cada formato y color. `mobileLayout` recibe las alturas centrales del nombre, evento, párrafo, anuncio, etiquetas, números, mes/AM, título de ubicación, dirección y despedida. Los textos y enlaces se comparten entre todas las versiones.

## Validar producción

```sh
npm run build
npm start
```

Abre http://localhost:4321. El servidor usa `PORT` cuando el hosting lo define.

## Plan para completar

1. Confirmar año/fecha y contenido final. El teléfono y las coordenadas están configurados; la dirección visible todavía es un texto de ejemplo.
2. Revisar ambas composiciones en teléfonos de 320–430 px y escritorio; ajustar posiciones y preparar imágenes más livianas si hace falta.
3. Probar enlaces en Android/iPhone, envío manual del mensaje y preferencia de movimiento reducido. Añadir imagen social y favicon definitivos.
4. Subir los cambios al repositorio GitHub y conectarlo a Railway.
5. En Railway, usar los comandos de `railway.json`, generar el dominio público del servicio y verificar los enlaces en el sitio publicado. Comprobar costos y límites del plan antes de publicar: un dominio genérico no garantiza hosting gratuito.

Para otra invitación, reutiliza el repositorio como plantilla y cambia imagen/configuración. Cada cambio requiere un nuevo build; Railway puede hacerlo automáticamente desde GitHub.

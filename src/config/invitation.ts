// Coordenadas relativas a la imagen: x/y = centro del botón; width = ancho.
// Al reemplazar la imagen, ajusta aquí los botones para alinearlos.
export const invitation = {
  title: 'Baby Shower de Lucía Trinidad',
  description: '¡Te esperamos para celebrar la llegada de Lucía Trinidad!',
  image: '/invitacion.png',
  imageAlt: 'Invitación al Baby Shower de Lucía Trinidad. Sábado 19 de septiembre a las 10:00 AM. Padres: Dalia Ramírez y Eduardo Constancio. Ubicación por confirmar.',
  whatsapp: {
    // Número internacional, solo dígitos; ejemplo chileno: 56912345678.
    phone: '56998692235',
    message: '¡Confirmo mi asistencia!',
  },
  location: {
    // Completa ambas coordenadas para habilitar ubicación.
    latitude: -27.075361362626538,
    longitude: -70.8392184609975,
    provider: 'google' as 'google' | 'waze',
  },
  buttons: {
    location: { x: 50, y: 84.15, width: 39.5 },
    rsvp: { x: 50, y: 88.8, width: 39.5 },
  },
  animations: true,
};

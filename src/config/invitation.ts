export type Placement = { x: number; y: number; width: number; height: number; fontSize: number };

// x/y: centro en % de la imagen; width/height: espacio en %; fontSize: % del ancho.
const layout = {
  name: { x: 50, y: 40.1, width: 59, height: 8, fontSize: 9.8 },
  event: { x: 50, y: 47.7, width: 32, height: 3.5, fontSize: 3.7 },
  introduction: { x: 50, y: 53.4, width: 58, height: 6.5, fontSize: 2.8 },
  announcement: { x: 50, y: 58.3, width: 62, height: 2.8, fontSize: 2.45 },
  weekday: { x: 29.5, y: 63.1, width: 18, height: 2.8, fontSize: 2.8 },
  day: { x: 29.5, y: 66, width: 18, height: 4.8, fontSize: 6.4 },
  month: { x: 29.5, y: 70.1, width: 18, height: 2.5, fontSize: 2.5 },
  timeLabel: { x: 50, y: 63.1, width: 18, height: 2.8, fontSize: 2.8 },
  time: { x: 50, y: 66, width: 18, height: 4.8, fontSize: 5.3 },
  period: { x: 50, y: 70.1, width: 18, height: 2.5, fontSize: 2.5 },
  parentsLabel: { x: 70.5, y: 63.1, width: 18, height: 2.8, fontSize: 2.8 },
  parents: { x: 70.5, y: 67, width: 19, height: 6, fontSize: 2.5 },
  locationLabel: { x: 53, y: 75, width: 23, height: 2.8, fontSize: 2.8 },
  address: { x: 53, y: 78, width: 27, height: 4, fontSize: 2.6 },
  farewell: { x: 50, y: 93.3, width: 48, height: 5.5, fontSize: 4 },
} satisfies Record<string, Placement>;

type TextLayout = typeof layout;
// Las nuevas imágenes tienen composiciones distintas, incluso entre colores.
// Orden: nombre, evento, párrafo, anuncio, fecha/hora/padres, ubicación y despedida.
function mobileLayout(positions: number[]): TextLayout {
  const [name, event, introduction, announcement, labels, numbers, bottom, locationLabel, address, farewell] = positions;
  return {
    name: { ...layout.name, y: name, width: 65, height: 7, fontSize: 10.8 },
    event: { ...layout.event, y: event, width: 34, height: 3, fontSize: 4 },
    introduction: { ...layout.introduction, y: introduction, width: 70, height: 10, fontSize: 3.6 },
    announcement: { ...layout.announcement, y: announcement, width: 70, height: 3, fontSize: 2.8 },
    weekday: { ...layout.weekday, x: 28, y: labels, fontSize: 3.1 },
    day: { ...layout.day, x: 28, y: numbers, fontSize: 7.5 },
    month: { ...layout.month, x: 28, y: bottom, fontSize: 2.8 },
    timeLabel: { ...layout.timeLabel, y: labels, fontSize: 3.1 },
    time: { ...layout.time, y: numbers, fontSize: 6 },
    period: { ...layout.period, y: bottom, fontSize: 2.8 },
    parentsLabel: { ...layout.parentsLabel, x: 72, y: labels, fontSize: 3.1 },
    parents: { ...layout.parents, x: 74, y: numbers + .6, width: 22, height: 5, fontSize: 2.9 },
    locationLabel: { ...layout.locationLabel, x: 54, y: locationLabel, width: 30, fontSize: 3.2 },
    address: { ...layout.address, x: 55, y: address, width: 33, height: 4, fontSize: 3.1 },
    farewell: { ...layout.farewell, y: farewell, height: 4, fontSize: 6.5 },
  };
}

const mobileVariants = {
  rosa: {
    mobile: {
      image: '/plantilla-rosa-movil.png', width: 1080, height: 1920,
      layout: mobileLayout([34.1, 40.8, 46.1, 50.8, 56.3, 59.3, 62.7, 68.8, 71.8, 87.3]),
      buttons: {
        location: { x: 50, y: 76.8, width: 52.5, height: 4.1, fontSize: 3.7 },
        rsvp: { x: 50, y: 82, width: 52.5, height: 4.1, fontSize: 3.7 },
      },
    },
    tall: {
      image: '/plantilla-rosa-alta.png', width: 1080, height: 2340,
      layout: mobileLayout([27.9, 33.5, 46.5, 58.2, 63.9, 66.8, 69.8, 74.4, 77, 89.9]),
      buttons: {
        location: { x: 50, y: 80.95, width: 52.5, height: 3.5, fontSize: 3.7 },
        rsvp: { x: 50, y: 85.25, width: 52.5, height: 3.5, fontSize: 3.7 },
      },
    },
  },
  celeste: {
    mobile: {
      image: '/plantilla-celeste-movil.png', width: 1080, height: 1920,
      layout: mobileLayout([37.6, 44.7, 50.3, 55, 60, 63.1, 66.6, 71.5, 74.3, 90]),
      buttons: {
        location: { x: 50, y: 78.8, width: 46.8, height: 3.8, fontSize: 3.4 },
        rsvp: { x: 50, y: 83.5, width: 46.8, height: 3.8, fontSize: 3.4 },
      },
    },
    tall: {
      image: '/plantilla-celeste-alta.png', width: 1080, height: 2340,
      layout: mobileLayout([31.7, 36.7, 50, 61.6, 67.5, 70.2, 72.7, 76.4, 78.8, 92.4]),
      buttons: {
        location: { x: 50, y: 82.5, width: 46.8, height: 3.2, fontSize: 3.4 },
        rsvp: { x: 50, y: 86.5, width: 46.8, height: 3.2, fontSize: 3.4 },
      },
    },
  },
};

// Se comparten entre <picture> y CSS para que imagen y coordenadas cambien juntas.
export const responsiveMedia = {
  mobile: '(max-width: 600px) and (orientation: portrait)',
  tall: '(max-width: 600px) and (max-aspect-ratio: 51/100)',
};

// Cada plantilla tiene sus propias posiciones y colores.
export const templates = {
  rosa: {
    variants: mobileVariants.rosa,
    image: '/plantilla-rosa.png', width: 1086, height: 1448,
    accent: '#d8818c', ink: '#71665e', background: '#fcf3ef',
    calendarSurface: '#b8887930', calendarHover: '#b8887945',
    layout: { ...layout },
    buttons: {
      location: { x: 50, y: 83.15, width: 40.5, height: 4, fontSize: 2.85 },
      rsvp: { x: 50, y: 88.15, width: 40.5, height: 4, fontSize: 2.85 },
    },
  },
  celeste: {
    variants: mobileVariants.celeste,
    image: '/plantilla-celeste.png', width: 1086, height: 1448,
    accent: '#639ab9', ink: '#656765', background: '#f0f7fa',
    calendarSurface: '#639ab930', calendarHover: '#639ab945',
    layout: { ...layout },
    buttons: {
      location: { x: 50, y: 82.5, width: 39, height: 4, fontSize: 2.85 },
      rsvp: { x: 50, y: 87.3, width: 39, height: 4, fontSize: 2.85 },
    },
  },
};

const babyName='Lucía Trinidad';

export const invitation = {
  // Selecciona 'rosa' o 'celeste'. Cambiar el fondo conserva tus textos.
  template: 'rosa' as keyof typeof templates,
  title: `Baby Shower de ${babyName}`,
  description: `¡Te esperamos para celebrar la llegada de ${babyName}!`,
  // Elevación del centro del nombre como fracción de su ancho (0 = recto).
  nameArc: 0.045,
  text: {
    name: babyName, event: 'BABY SHOWER',
    introduction: 'Una hermosa princesa pronto llegará a iluminar\nnuestras vidas. Esperamos compartir juntos y así\ncelebrar la vida y llegada de nuestra bebé',
    announcement: '¡TE INVITAMOS A CELEBRAR CON NOSOTROS!',
    weekday: 'SÁBADO', day: '21', month: 'NOVIEMBRE',
    timeLabel: 'A LAS', time: '16:30', period: 'PM',
    parentsLabel: 'PADRES', parents: 'Dalia Ramírez &\nEduardo Constancio',
    locationLabel: 'UBICACIÓN', address: 'Chorrillos 1058, Villa las Playas, Caldera',
    farewell: '¡Te esperamos!',
  },
  whatsapp: {
    // Número internacional, solo dígitos.
    phone: '56998692235', message: `Hola, ¡Confirmo mi asistencia al Baby Shower de ${babyName}!`,
  },
  location: {
    latitude: -27.072154003583027 as number | null,
    longitude: -70.80745480146872 as number | null,
    provider: 'google' as 'google' | 'waze',
  },
  buttons: {
    location: { label: 'Mapa - Ver ubicación' },
    rsvp: { label: 'Confirmar asistencia' },
  },
  animations: true,
  calendar: {
    enabled: true,
    // Recordatorios antes del inicio, incluidos en el archivo .ics.
    reminderHours: [24, 3],
    // Fecha completa y desfase horario. Mantén estos valores alineados con text.
    start: '2026-11-21T16:30:00-03:00',
    end: '2026-11-21T18:30:00-03:00',
    timeZone: 'America/Santiago',
  },
  effects: {
    opening: true,
    cursorTrail: true,
    touchBurst: true,
  },
};

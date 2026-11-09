import { createHash } from 'node:crypto';
import { invitation } from '../config/invitation';

const utc = (date: Date) => date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
const escapeText = (text: string) => text.replace(/\\/g, '\\\\').replace(/\r\n|\r|\n/g, '\\n').replace(/;/g, '\\;').replace(/,/g, '\\,');
// Líneas de hasta 75 bytes sin cortar caracteres UTF-8.
function fold(line: string) {
  const lines: string[] = [];
  let current = '';
  let size = 0;
  for (const character of line) {
    const bytes = Buffer.byteLength(character);
    if (size + bytes > 75) { lines.push(current); current = ' '; size = 1; }
    current += character;
    size += bytes;
  }
  return [...lines, current].join('\r\n');
}

export function calendarEvent() {
  const start = new Date(invitation.calendar.start);
  const end = new Date(invitation.calendar.end);
  if (!Number.isFinite(start.getTime()) || !Number.isFinite(end.getTime()) || end <= start) {
    throw new Error('calendar.start y calendar.end deben ser fechas válidas, con fin posterior al inicio.');
  }
  const title = invitation.title;
  const reminderHours = [...new Set(invitation.calendar.reminderHours)];
  if (reminderHours.some(hours => !Number.isSafeInteger(hours) || hours <= 0)) {
    throw new Error('calendar.reminderHours debe contener horas enteras positivas.');
  }
  const alarms = reminderHours.flatMap(hours => [
    'BEGIN:VALARM', 'ACTION:DISPLAY', `TRIGGER:-PT${hours}H`,
    `DESCRIPTION:${escapeText(title)}`, 'END:VALARM',
  ]);
  const location = invitation.text.address.replace(/\n/g, ', ');
  const details = invitation.description;
  const params = new URLSearchParams({ action: 'TEMPLATE', text: title, dates: `${utc(start)}/${utc(end)}`, ctz: invitation.calendar.timeZone, details, location });
  const uid = createHash('sha256').update(`${title}|${invitation.calendar.start}`).digest('hex').slice(0, 32);
  const ics = [
    'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Invitaciones//Baby Shower//ES', 'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT', `UID:${uid}@invitation.local`, `DTSTAMP:${utc(new Date())}`,
    `DTSTART:${utc(start)}`, `DTEND:${utc(end)}`, `SUMMARY:${escapeText(title)}`,
    `DESCRIPTION:${escapeText(details)}`, `LOCATION:${escapeText(location)}`, ...alarms, 'END:VEVENT', 'END:VCALENDAR',
  ].map(fold).join('\r\n') + '\r\n';
  return { googleUrl: `https://calendar.google.com/calendar/render?${params}`, ics };
}

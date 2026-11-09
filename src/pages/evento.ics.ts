import { calendarEvent } from '../lib/calendar';

export function GET() {
  return new Response(calendarEvent().ics, {
    headers: { 'Content-Type': 'text/calendar; charset=utf-8' },
  });
}

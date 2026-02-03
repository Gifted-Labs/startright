import type { Event } from '../types';

/**
 * Formats date to ICS format (YYYYMMDDTHHMMSSZ)
 */
const formatICSDate = (date: Date): string => {
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');
    return `${year}${month}${day}T${hours}${minutes}${seconds}Z`;
};

/**
 * Generates and downloads an .ics calendar file for the event
 */
export const generateICSFile = (event: Event): void => {
    try {
        // Parse event date and time
        const startDate = new Date(`${event.date}T${event.time || '09:00:00'}`);

        // Assume event is 4 hours long if no end time provided
        const endDate = new Date(startDate);
        endDate.setHours(endDate.getHours() + 4);

        const icsContent = [
            'BEGIN:VCALENDAR',
            'VERSION:2.0',
            'PRODID:-//Start Right Conference//Event//EN',
            'CALSCALE:GREGORIAN',
            'METHOD:PUBLISH',
            'BEGIN:VEVENT',
            `DTSTART:${formatICSDate(startDate)}`,
            `DTEND:${formatICSDate(endDate)}`,
            `DTSTAMP:${formatICSDate(new Date())}`,
            `SUMMARY:${event.title}`,
            `DESCRIPTION:${event.description?.replace(/\n/g, '\\n') || 'Join us for an inspiring event!'}`,
            `LOCATION:${event.location}`,
            'STATUS:CONFIRMED',
            'SEQUENCE:0',
            `UID:${event.id}@startright-conference.com`,
            'END:VEVENT',
            'END:VCALENDAR'
        ].join('\r\n');

        // Create blob and download
        const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${event.title.replace(/\s+/g, '-').toLowerCase()}.ics`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);
    } catch (error) {
        console.error('Failed to generate ICS file:', error);
        throw new Error('Unable to add to calendar. Please try again.');
    }
};

/**
 * Generates Google Calendar deep link as fallback
 */
export const generateGoogleCalendarLink = (event: Event): string => {
    const startDate = new Date(`${event.date}T${event.time || '09:00:00'}`);
    const endDate = new Date(startDate);
    endDate.setHours(endDate.getHours() + 4);

    const formatGoogleDate = (date: Date) => {
        return date.toISOString().replace(/-|:|\.\d+/g, '');
    };

    const params = new URLSearchParams({
        action: 'TEMPLATE',
        text: event.title,
        dates: `${formatGoogleDate(startDate)}/${formatGoogleDate(endDate)}`,
        details: event.description || 'Join us for an inspiring event!',
        location: event.location
    });

    return `https://calendar.google.com/calendar/render?${params.toString()}`;
};

/**
 * Generates QR code URL for event registration
 */
export const generateRegistrationQRCode = (eventId: number | string): string => {
    const registrationUrl = `${window.location.origin}/events/${eventId}/register`;
    // Using QR Server API (free, no API key needed)
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(registrationUrl)}`;
};

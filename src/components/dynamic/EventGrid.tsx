import { EventCard } from './EventCard';
import type { Event } from '../../types';

interface EventGridProps {
    events: Event[];
    loading?: boolean;
    isPast?: boolean;
    emptyMessage?: string;
}

export const EventGrid = ({
    events,
    loading = false,
    isPast = false,
    emptyMessage = "No events found."
}: EventGridProps) => {

    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map(i => (
                    <div key={i} className="h-96 bg-gray-100 rounded-xl animate-pulse"></div>
                ))}
            </div>
        );
    }

    if (events.length === 0) {
        return (
            <div className="text-center py-20 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                <p className="text-gray-500 text-lg">{emptyMessage}</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map(event => (
                <EventCard key={event.id} event={event} isPast={isPast} />
            ))}
        </div>
    );
};

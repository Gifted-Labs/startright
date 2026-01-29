import { Link } from 'react-router-dom';
import type { Event } from '../../types';
import { format } from 'date-fns';
import { HiCalendar, HiLocationMarker } from 'react-icons/hi';
import { Button } from '../common/Button';

interface EventCardProps {
    event: Event;
    isPast?: boolean;
}

export const EventCard = ({ event, isPast }: EventCardProps) => {
    return (
        <div className="group bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full transform hover:-translate-y-1">
            {/* Image Container */}
            <div className="relative h-56 overflow-hidden bg-gray-200">
                <img
                    src={event.imageUrl || 'https://via.placeholder.com/800x600?text=Event+Image'}
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide text-secondary-900 shadow-sm">
                    {event.theme || 'Event'}
                </div>
            </div>

            {/* Content */}
            <div className="p-6 flex-grow flex flex-col">
                <div className="flex-grow">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                        {event.title}
                    </h3>

                    <div className="space-y-2 mb-4 text-gray-500 text-sm">
                        <div className="flex items-center gap-2">
                            <HiCalendar className="text-primary-500 w-5 h-5" />
                            <span>{format(new Date(event.date + 'T00:00:00'), 'MMMM d, yyyy')} • {event.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <HiLocationMarker className="text-primary-500 w-5 h-5" />
                            <span className="truncate">{event.location}</span>
                        </div>
                    </div>

                    <p className="text-gray-600 line-clamp-3 text-sm leading-relaxed mb-6">
                        {event.description}
                    </p>
                </div>

                {/* Actions */}
                <div className="pt-4 border-t border-gray-50 flex gap-3">
                    {!isPast && (
                        <Link to={`/events/${event.id}/register`} className="flex-1">
                            <Button size="sm" className="w-full">Register</Button>
                        </Link>
                    )}
                    <Link to={`/events/${event.id}${isPast ? '' : ''}`} className={isPast ? "flex-1" : ""}>
                        <Button variant={isPast ? "primary" : "outline"} size="sm" className="w-full">
                            {isPast ? "View Recap" : "Details"}
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

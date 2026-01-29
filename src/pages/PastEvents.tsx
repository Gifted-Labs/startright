import { useEffect, useState } from 'react';
import { EventGrid } from '../components/dynamic/EventGrid';
import { eventService } from '../services/eventService';
import type { Event } from '../types';
import { PageHero } from '../components/common/PageHero';

const PastEvents = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const data = await eventService.getPastEvents(0, 20);
                setEvents(data.content);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchEvents();
    }, []);

    return (
        <div className="bg-gray-50 min-h-screen">
            <PageHero
                titleWhite="PAST"
                titleAccent="EVENTS"
                subtitle="Relive the moments from our previous gatherings. Explore archives of transformative experiences."
            />

            <div className="container mx-auto px-4 md:px-6 py-16">
                <EventGrid events={events} loading={loading} isPast={true} emptyMessage="No past events found." />
            </div>
        </div>
    );
};

export default PastEvents;

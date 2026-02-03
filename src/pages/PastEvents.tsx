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
                title="PAST EVENTS"
                subtitle="Relive the moments from our previous gatherings. Explore archives of transformative experiences."
                backgroundImage="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1950&q=80"
                breadcrumbs={[
                    { label: 'Home', path: '/' },
                    { label: 'Events', path: '/events' },
                    { label: 'Past' }
                ]}
            />

            <div className="container mx-auto px-4 md:px-6 py-16">
                <EventGrid events={events} loading={loading} isPast={true} emptyMessage="No past events found." />
            </div>
        </div>
    );
};

export default PastEvents;

import { useEffect, useState } from 'react';
import { EventGrid } from '../components/dynamic/EventGrid';
import { eventService } from '../services/eventService';
import type { Event } from '../types';
import { PageHero } from '../components/common/PageHero';

const EventsList = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const data = await eventService.getUpcomingEvents(0, 20);
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
        <div className="bg-white min-h-screen">
            <PageHero
                title="EVENTS"
                subtitle="Explore our upcoming gatherings"
                backgroundImage="https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                breadcrumbs={[
                    { label: 'Events' }
                ]}
            />

            <div className="container mx-auto px-4 md:px-6 py-16">
                <EventGrid events={events} loading={loading} emptyMessage="No upcoming events found." />
            </div>
        </div>
    );
};

export default EventsList;

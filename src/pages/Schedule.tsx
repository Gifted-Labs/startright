import { useEffect, useState } from 'react';
import { eventService } from '../services/eventService';
import type { Event, ItineraryItem } from '../types';
import { format } from 'date-fns';
import { HiClock, HiCalendar } from 'react-icons/hi';
import { PageHero } from '../components/common/PageHero';

const Schedule = () => {
    const [event, setEvent] = useState<Event | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSchedule = async () => {
            try {
                const upcoming = await eventService.getUpcomingEvents(0, 1);
                if (upcoming.content.length > 0) {
                    setEvent(upcoming.content[0]);
                }
            } catch (error) {
                console.error("Failed to load schedule", error);
            } finally {
                setLoading(false);
            }
        };
        fetchSchedule();
    }, []);

    const itinerary: ItineraryItem[] = event?.itinerary || [];

    return (
        <div className="bg-gray-50 min-h-screen">
            <PageHero
                title="Event Schedule"
                subtitle="Plan your experience. Discover the timeline of sessions, workshops, and activities that await you."
                backgroundImage="https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                breadcrumbs={[
                    { label: 'Home', path: '/' },
                    { label: 'Schedule' }
                ]}
            />

            <div className="container mx-auto px-4 md:px-6 py-16">
                {event && (
                    <div className="flex justify-center gap-8 text-gray-600 mb-12 flex-wrap">
                        <div className="flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-sm">
                            <HiCalendar className="text-primary-600 text-xl" />
                            <span className="font-medium">{format(new Date(event.date), 'MMMM d, yyyy')}</span>
                        </div>
                        <div className="flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-sm">
                            <HiClock className="text-primary-600 text-xl" />
                            <span className="font-medium">{event.time}</span>
                        </div>
                    </div>
                )}

                {loading ? (
                    <div className="max-w-3xl mx-auto space-y-6">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="h-24 bg-gray-200 rounded-xl animate-pulse"></div>
                        ))}
                    </div>
                ) : itinerary.length > 0 ? (
                    <div className="max-w-3xl mx-auto">
                        <div className="relative border-l-4 border-primary-500 pl-8 space-y-8">
                            {itinerary.map((item, index) => (
                                <div key={item.id || index} className="relative group">
                                    <div className="absolute -left-[42px] top-1 w-5 h-5 bg-primary-600 rounded-full border-4 border-white shadow-md group-hover:scale-125 transition-transform"></div>

                                    <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-shadow border border-gray-100">
                                        <span className="inline-block text-primary-600 font-bold text-sm uppercase tracking-wider mb-2">{item.time}</span>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                                        <p className="text-gray-600">{item.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-xl max-w-3xl mx-auto shadow-sm">
                        <p className="text-gray-500 text-lg">Schedule will be announced soon. Stay tuned!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Schedule;

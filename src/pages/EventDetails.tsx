import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { eventService } from '../services/eventService';
import type { Event, Speaker, GalleryResponse } from '../types';
import { SpeakerShowcase } from '../components/dynamic/SpeakerShowcase';
import { GalleryFeed } from '../components/dynamic/GalleryFeed';
import { ReviewSection } from '../components/events/ReviewSection';
import { Button } from '../components/common/Button';
import { format } from 'date-fns';
import { HiCalendar, HiLocationMarker, HiClock } from 'react-icons/hi';

const EventDetails = () => {
    const { eventId } = useParams();
    const [event, setEvent] = useState<Event | null>(null);
    const [speakers, setSpeakers] = useState<Speaker[]>([]);
    const [gallery, setGallery] = useState<GalleryResponse | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!eventId) return;

        const fetchData = async () => {
            try {
                // Parallel fetching for performance
                const [eventData, speakerData, galleryData] = await Promise.all([
                    eventService.getEventById(eventId),
                    eventService.getEventSpeakers(eventId),
                    eventService.getEventGallery(eventId)
                ]);

                setEvent(eventData);
                setSpeakers(speakerData);
                setGallery(galleryData);
            } catch (error) {
                console.error("Failed to load event details", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [eventId]);

    if (loading) return <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-400">Loading Event...</div>;
    if (!event) return <div className="min-h-screen flex items-center justify-center bg-gray-50">Event not found</div>;

    return (
        <div className="bg-white min-h-screen pb-20">
            {/* Hero Section - Dynamic Image */}
            <div className="relative h-[60vh] md:h-[70vh] w-full bg-gray-900">
                <img
                    src={event.imageUrl || 'https://via.placeholder.com/1920x1080'}
                    alt={event.title}
                    className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/95 via-gray-900/60 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 container mx-auto">
                    <span className="inline-block py-1 px-3 rounded-full bg-primary-600 text-white text-sm font-bold mb-4 uppercase tracking-wider">
                        {event.theme || 'Upcoming Event'}
                    </span>
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">{event.title}</h1>

                    <div className="flex flex-wrap gap-6 text-white/90 text-lg font-medium">
                        <div className="flex items-center gap-2">
                            <HiCalendar className="text-primary-600" />
                            {format(new Date(event.date), 'EEEE, MMMM d, yyyy')}
                        </div>
                        <div className="flex items-center gap-2">
                            <HiClock className="text-primary-600" />
                            {event.time}
                        </div>
                        <div className="flex items-center gap-2">
                            <HiLocationMarker className="text-primary-600" />
                            {event.location}
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-6 pt-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-12">
                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">About this Event</h2>
                            <p className="text-gray-600 text-lg leading-relaxed whitespace-pre-wrap">
                                {event.description}
                            </p>

                            <div className="mt-8">
                                <Link to={`/events/${event.id}/register`}>
                                    <Button size="lg" className="w-full sm:w-auto shadow-xl shadow-primary-500/20">
                                        Register Now
                                    </Button>
                                </Link>
                            </div>
                        </section>

                        <SpeakerShowcase speakers={speakers} />

                        {gallery && gallery.items.length > 0 && (
                            <GalleryFeed items={gallery.items} />
                        )}

                        {/* Reviews Section */}
                        <ReviewSection eventId={event.id} />
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-8">
                        <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 sticky top-24">
                            <h3 className="text-xl font-bold text-gray-900 mb-6">Event Details</h3>
                            <ul className="space-y-4">
                                <li className="flex justify-between border-b border-gray-200 pb-2">
                                    <span className="text-gray-500">Date</span>
                                    <span className="font-medium">{format(new Date(event.date), 'MMM d, yyyy')}</span>
                                </li>
                                <li className="flex justify-between border-b border-gray-200 pb-2">
                                    <span className="text-gray-500">Time</span>
                                    <span className="font-medium">{event.time}</span>
                                </li>
                                <li className="flex justify-between border-b border-gray-200 pb-2">
                                    <span className="text-gray-500">Venue</span>
                                    <span className="font-medium text-right max-w-[60%]">{event.location}</span>
                                </li>
                            </ul>

                            <div className="mt-8">
                                <p className="text-sm text-gray-500 mb-2 text-center">Questions?</p>
                                <a href="mailto:support@merbsconnect.com" className="block text-center text-primary-600 font-medium hover:underline">
                                    Contact Organizer
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventDetails;


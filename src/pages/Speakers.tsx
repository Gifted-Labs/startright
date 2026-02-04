import React, { useEffect, useState } from 'react';
import { PageHero } from '../components/common/PageHero';
import { SpeakerGridCard } from '../components/speakers/SpeakerGridCard';
import { ContactCTA } from '../components/common/ContactCTA';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { eventService } from '../services/eventService';
import type { Speaker } from '../types';

const Speakers: React.FC = () => {
    const [speakers, setSpeakers] = useState<Speaker[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchSpeakers = async () => {
            try {
                // 1. Get upcoming events to find the main/active event
                // Assuming the first upcoming event is the primary one
                const eventsData = await eventService.getUpcomingEvents(0, 5);
                const mainEvent = eventsData.content && eventsData.content.length > 0 ? eventsData.content[0] : null;

                if (mainEvent) {
                    // 2. Fetch speakers for this event
                    const speakersData = await eventService.getEventSpeakers(mainEvent.id);
                    setSpeakers(speakersData);
                } else {
                    // Fallback or empty state if no event found
                    setSpeakers([]);
                }
            } catch (err) {
                console.error("Failed to load speakers:", err);
                setError("Unable to load speakers at this time.");
            } finally {
                setLoading(false);
            }
        };

        fetchSpeakers();
    }, []);

    return (
        <div className="bg-white min-h-screen text-gray-900">
            <PageHero
                title="SPEAKERS"
                subtitle="Meet our world-class experts"
                backgroundImage="https://images.unsplash.com/photo-1591115765373-5207764f72e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                breadcrumbs={[
                    { label: 'Speakers' }
                ]}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : error ? (
                    <div className="text-center py-20 text-red-500 font-bold">{error}</div>
                ) : speakers.length === 0 ? (
                    <div className="text-center py-20 text-gray-500">No speakers announced yet for the upcoming event.</div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                            {speakers.map((speaker, idx) => (
                                <SpeakerGridCard
                                    key={idx}
                                    name={speaker.name}
                                    role={speaker.title || speaker.role || "Speaker"} // Handle backend 'title' vs frontend 'role' mismatch
                                    image={speaker.imageUrl || `https://i.pravatar.cc/500?u=${speaker.id}`} // Fallback image
                                    bio={speaker.bio}
                                />
                            ))}
                        </div>

                        {/* Pagination - Static for now, can be dynamic if backend supports paged speakers */}
                        <div className="flex items-center justify-center gap-2">
                            <button className="w-10 h-10 flex items-center justify-center rounded bg-dark-950 text-white hover:bg-gray-800 disabled:opacity-50" disabled>
                                <HiChevronLeft />
                            </button>
                            <button className="w-10 h-10 flex items-center justify-center rounded bg-primary-500 text-white font-bold">01</button>
                            <button className="w-10 h-10 flex items-center justify-center rounded border border-gray-200 text-gray-600 hover:bg-gray-50">02</button>
                            <span className="text-gray-400">...</span>
                            <button className="w-10 h-10 flex items-center justify-center rounded bg-dark-950 text-white hover:bg-gray-800">
                                <HiChevronRight />
                            </button>
                        </div>
                    </>
                )}
            </div>

            <ContactCTA />
        </div>
    );
};

export default Speakers;

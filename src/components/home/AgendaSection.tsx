import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { eventService } from '../../services/eventService';
import type { ItineraryItem } from '../../types';

export const AgendaSection: React.FC = () => {
    const [scheduleItems, setScheduleItems] = useState<ItineraryItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchItinerary = async () => {
            try {
                // Get the main upcoming event first
                const eventsData = await eventService.getUpcomingEvents(0, 5);
                const mainEvent = eventsData.content && eventsData.content.length > 0 ? eventsData.content[0] : null;

                if (mainEvent) {
                    const itineraryData = await eventService.getEventItinerary(mainEvent.id);
                    // Sort by displayOrder or startTime
                    const sortedItems = itineraryData.sort((a: ItineraryItem, b: ItineraryItem) => {
                        if (a.displayOrder !== undefined && b.displayOrder !== undefined) {
                            return a.displayOrder - b.displayOrder;
                        }
                        if (a.startTime && b.startTime) {
                            return a.startTime.localeCompare(b.startTime);
                        }
                        return 0;
                    });
                    setScheduleItems(sortedItems);
                }
            } catch (err) {
                console.error("Failed to load itinerary:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchItinerary();
    }, []);

    // Helper to format time for display
    const formatTime = (startTime?: string, endTime?: string) => {
        if (!startTime) return 'TBA';

        // Convert HH:MM:SS or HH:MM to 12-hour format
        const formatSingleTime = (time: string) => {
            const [hours, minutes] = time.split(':').map(Number);
            const period = hours >= 12 ? 'PM' : 'AM';
            const displayHours = hours % 12 || 12;
            return `${displayHours}:${String(minutes).padStart(2, '0')} ${period}`;
        };

        const start = formatSingleTime(startTime);
        if (endTime) {
            const end = formatSingleTime(endTime);
            return `${start} - ${end}`;
        }
        return start;
    };

    return (
        <section className="bg-dark-950 text-white relative isolate">
            {/* Header Section */}
            <div className="bg-dark-900 py-24 text-center relative z-10 border-b border-white/5">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-4">Event Schedule</h2>
                    <p className="text-gray-400 text-lg max-w-xl mx-auto">
                        A structured breakdown of what to expect at Start Right Conference 2026.
                    </p>
                    <div className="w-24 h-px bg-primary-500/30 mx-auto mt-12"></div>
                </motion.div>
            </div>

            {/* Timeline Section */}
            <div className="bg-dark-950/50 py-32 relative overflow-hidden">
                {/* Vertical Line */}
                <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2 z-0"></div>

                <div className="max-w-6xl mx-auto px-4 relative z-10">
                    {loading ? (
                        <div className="flex justify-center py-20">
                            <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    ) : scheduleItems.length === 0 ? (
                        <div className="text-center py-20 text-gray-500">Schedule will be announced soon.</div>
                    ) : (
                        <div className="space-y-24">
                            {scheduleItems.map((item, index) => (
                                <motion.div
                                    key={item.id || index}
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.6, delay: 0.1 }}
                                    className={`relative flex flex-col md:flex-row items-center gap-8 md:gap-0 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                                        }`}
                                >
                                    {/* Card Side */}
                                    <div className="w-full md:w-1/2 flex justify-center md:justify-end px-4 md:px-12">
                                        <div className={`w-full max-w-md bg-dark-900/50 border border-white/10 p-8 rounded-xl hover:border-primary-500/40 transition-all group ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'
                                            }`}>
                                            <span className="text-primary-500 font-bold text-xs tracking-widest uppercase mb-3 block">
                                                {formatTime(item.startTime, item.endTime)}
                                            </span>
                                            <h3 className="text-2xl font-black mb-2 group-hover:text-primary-400 transition-colors tracking-tight">
                                                {item.title}
                                            </h3>
                                            {item.speakerName && (
                                                <p className="text-gray-300 text-sm mb-1">🎤 {item.speakerName}</p>
                                            )}
                                            {item.venue && (
                                                <p className="text-gray-400 text-sm italic">📍 {item.venue}</p>
                                            )}
                                            {item.description && (
                                                <p className="text-gray-500 text-sm mt-2">{item.description}</p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Center Dot */}
                                    <div className="absolute left-1/2 transform -translate-x-1/2 w-3 h-3 bg-primary-500 rounded-full z-20 shadow-[0_0_10px_rgba(255,0,0,0.5)]"></div>

                                    {/* Empty Side for Balance */}
                                    <div className="w-full md:w-1/2 hidden md:block"></div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Bottom CTA Area */}
            <div className="bg-dark-900 py-24 relative z-10 border-t border-white/5">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="text-center"
                >
                    <a href="/schedule" className="inline-block bg-primary-500 hover:bg-primary-600 text-white px-10 py-4 font-black tracking-widest uppercase text-sm shadow-2xl transition-all hover:translate-y-[-2px] rounded-sm">
                        View Full Schedule
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

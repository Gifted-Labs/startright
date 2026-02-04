import React from 'react';
import { format } from 'date-fns';
import { HiCalendar, HiLocationMarker, HiClock, HiUserGroup } from 'react-icons/hi';
import type { Event } from '../../types';
import { Button } from '../common/Button';
import { Link } from 'react-router-dom';

interface EventQuickViewProps {
    event: Event;
}

export const EventQuickView: React.FC<EventQuickViewProps> = ({ event }) => {
    const formattedDate = format(new Date(event.date + 'T00:00:00'), 'EEEE, MMMM d, yyyy');

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Left: Image & Key Info */}
            <div className="space-y-6">
                <div className="aspect-video rounded-2xl overflow-hidden shadow-lg bg-gray-100">
                    <img
                        src={event.imageUrl || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'}
                        alt={event.title}
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 space-y-4">
                    <div className="flex items-center gap-3 text-dark-900 font-bold uppercase tracking-tight text-sm">
                        <HiCalendar className="text-primary-500 w-5 h-5" />
                        <span>{formattedDate}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-600 font-medium text-sm">
                        <HiClock className="text-primary-500 w-5 h-5" />
                        <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-600 font-medium text-sm">
                        <HiLocationMarker className="text-primary-500 w-5 h-5" />
                        <span className="leading-tight">{event.location}</span>
                    </div>
                    {event.theme && (
                        <div className="flex items-center gap-3 text-gray-600 font-medium text-sm">
                            <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-[10px] font-black uppercase">
                                {event.theme}
                            </span>
                        </div>
                    )}
                </div>
            </div>

            {/* Right: Description & CTA */}
            <div className="flex flex-col h-full">
                <div className="flex-grow space-y-6">
                    <div>
                        <h3 className="text-2xl font-black text-dark-950 mb-4 uppercase tracking-tight">About this Event</h3>
                        <p className="text-gray-600 leading-relaxed whitespace-pre-wrap text-sm md:text-base">
                            {event.description}
                        </p>
                    </div>

                    {event.speakersV2 && event.speakersV2.length > 0 && (
                        <div>
                            <h4 className="flex items-center gap-2 text-lg font-bold text-dark-950 mb-3 uppercase tracking-tight">
                                <HiUserGroup className="text-primary-500" /> Key Speakers
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                {event.speakersV2.map((speaker, idx) => (
                                    <span key={idx} className="bg-white border border-gray-200 px-4 py-2 rounded-full text-xs font-bold text-gray-700 shadow-sm">
                                        {speaker.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <div className="pt-8 mt-auto flex flex-col sm:flex-row gap-4">
                    <Link to={`/ events / ${event.id}/register`} className="flex-1" >
                        <Button className="w-full py-4 text-base font-black shadow-xl shadow-primary-500/20">
                            Register Now
                        </Button>
                    </Link >
                    <Link to={`/events/${event.id}`} className="flex-1">
                        <Button variant="outline" className="w-full py-4 text-base font-black">
                            Full Details
                        </Button>
                    </Link>
                </div >
            </div >
        </div >
    );
};

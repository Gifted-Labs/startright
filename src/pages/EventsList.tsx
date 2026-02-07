import { useEffect, useState } from 'react';
import { EventGrid } from '../components/dynamic/EventGrid';
import { eventService } from '../services/eventService';
import type { Event } from '../types';
import { PageHero } from '../components/common/PageHero';

const EventsList = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    
    // Filter States
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTheme, setSelectedTheme] = useState('All');
    const [selectedLocation, setSelectedLocation] = useState('All');
    const [selectedYear, setSelectedYear] = useState('All');
    const [selectedDate, setSelectedDate] = useState('');

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const data = await eventService.getUpcomingEvents(0, 100); // Fetch more to make filtering useful
                setEvents(data.content || []);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchEvents();
    }, []);

    // Extract unique values for filters
    const themes = ['All', ...Array.from(new Set(events.map(e => e.theme).filter(Boolean)))];
    
    const locations = ['All', ...Array.from(new Set(events.map(e => e.location).filter(Boolean)))];
    
    const years = ['All', ...Array.from(new Set(events.map(e => {
        return e.date ? new Date(e.date).getFullYear().toString() : '';
    }).filter(Boolean)))].sort();

    const filteredEvents = events.filter(event => {
        const query = searchQuery.toLowerCase();
        
        // 1. Keyword Search
        const matchesSearch = 
            (event.title?.toLowerCase() || '').includes(query) ||
            (event.description?.toLowerCase() || '').includes(query) ||
            (event.location?.toLowerCase() || '').includes(query) ||
            (event.theme?.toLowerCase() || '').includes(query);
            
        // 2. Theme Filter
        const matchesTheme = selectedTheme === 'All' || event.theme === selectedTheme;

        // 3. Location Filter
        const matchesLocation = selectedLocation === 'All' || event.location === selectedLocation;

        // 4. Year Filter
        const eventYear = event.date ? new Date(event.date).getFullYear().toString() : '';
        const matchesYear = selectedYear === 'All' || eventYear === selectedYear;

        // 5. Exact Date Filter
        const matchesDate = !selectedDate || event.date === selectedDate;

        return matchesSearch && matchesTheme && matchesLocation && matchesYear && matchesDate;
    });

    const clearFilters = () => {
        setSearchQuery('');
        setSelectedTheme('All');
        setSelectedLocation('All');
        setSelectedYear('All');
        setSelectedDate('');
    };

    return (
        <div className="bg-white min-h-screen">
            <PageHero
                title="EVENTS"
                subtitle="Find the perfect event for you"
                backgroundImage="/images/events-bg.jpg"
                breadcrumbs={[
                    { label: 'Events' }
                ]}
            />

            <div className="container mx-auto px-4 md:px-6 py-16">
                {/* Search and Advanced Filter Section */}
                <div className="mb-12 bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8">
                    <div className="flex flex-col gap-6">
                        {/* Top Row: Search Bar */}
                        <div className="w-full relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                placeholder="Search events by title, keyword..."
                                className="block w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-shadow text-gray-900 placeholder-gray-400 bg-gray-50/50"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        {/* Bottom Row: Filters Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {/* Theme Filter */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">Category</label>
                                <select
                                    value={selectedTheme}
                                    onChange={(e) => setSelectedTheme(e.target.value)}
                                    className="block w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white text-gray-900 cursor-pointer"
                                >
                                    {themes.map((theme, index) => (
                                        <option key={index} value={theme}>
                                            {theme === 'All' ? 'All Categories' : theme}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Location Filter */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">Location</label>
                                <select
                                    value={selectedLocation}
                                    onChange={(e) => setSelectedLocation(e.target.value)}
                                    className="block w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white text-gray-900 cursor-pointer"
                                >
                                    {locations.map((loc, index) => (
                                        <option key={index} value={loc}>
                                            {loc === 'All' ? 'All Locations' : loc}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Year Filter */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">Year</label>
                                <select
                                    value={selectedYear}
                                    onChange={(e) => setSelectedYear(e.target.value)}
                                    className="block w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white text-gray-900 cursor-pointer"
                                >
                                    {years.map((year, index) => (
                                        <option key={index} value={year}>
                                            {year === 'All' ? 'Any Year' : year}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Date Filter */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">Specific Date</label>
                                <input
                                    type="date"
                                    value={selectedDate}
                                    onChange={(e) => setSelectedDate(e.target.value)}
                                    className="block w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white text-gray-900 cursor-pointer"
                                />
                            </div>
                        </div>
                        
                        {/* Active Filter Indicators / Clear Button */}
                         {(searchQuery || selectedTheme !== 'All' || selectedLocation !== 'All' || selectedYear !== 'All' || selectedDate) && (
                            <div className="flex justify-end">
                                <button 
                                    onClick={clearFilters}
                                    className="text-sm text-primary-600 hover:text-primary-700 font-semibold flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-primary-50 transition-colors"
                                >
                                    <span>Reset Filters</span>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                <EventGrid events={filteredEvents} loading={loading} emptyMessage="No matching events found for your criteria." />
            </div>
        </div>
    );
};

export default EventsList;

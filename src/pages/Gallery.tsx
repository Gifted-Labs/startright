import { useState, useMemo } from 'react';
import { PageHero } from '../components/common/PageHero';
import { GalleryGrid } from '../components/gallery/GalleryGrid';
import { ContactCTA } from '../components/common/ContactCTA';
import { motion } from 'framer-motion';

// Sample data with years
const galleryData = [
    { id: 1, url: "/images/gallery-highlight.png", year: 2026, title: "Conference Highlights" },
    { id: 2, url: "/images/footer-1.jpg", year: 2026, title: "Community Engagement" },
    { id: 3, url: "/images/footer-2.jpg", year: 2026, title: "Networking Session" },
    { id: 4, url: "/images/footer-3.jpg", year: 2025, title: "Workshop Series" },
    { id: 5, url: "/images/footer-4.jpg", year: 2025, title: "Student Leaders" },
    { id: 6, url: "/images/footer-5.jpg", year: 2024, title: "Inaugural Event" },
    { id: 7, url: "/images/flyer-2026.jpg", year: 2026, title: "2026 Official Flyer" },
    { id: 8, url: "/images/footer-1.jpg", year: 2024, title: "Team Building" },
];

const Gallery = () => {
    const [selectedYear, setSelectedYear] = useState<string>('All Years');
    const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');

    const years = ['All Years', '2026', '2025', '2024', '2023'];

    const filteredAndSortedImages = useMemo(() => {
        let result = [...galleryData];

        // Filter
        if (selectedYear !== 'All Years') {
            result = result.filter(img => img.year.toString() === selectedYear);
        }

        // Sort
        result.sort((a, b) => {
            return sortOrder === 'newest' ? b.year - a.year : a.year - b.year;
        });

        return result;
    }, [selectedYear, sortOrder]);

    return (
        <div className="bg-white min-h-screen">
            <PageHero 
                title="EVENTS GALLERY"
                subtitle="This conference is created by professionals"
                backgroundImage="https://images.unsplash.com/photo-1544928147-79a79476adb8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
                breadcrumbs={[
                    { label: 'Home', path: '/' },
                    { label: 'Events Gallery' }
                ]}
            />

            <div className="container mx-auto px-4 py-12">
                {/* Filters Row */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12 bg-gray-50 p-6 rounded-3xl border border-gray-100">
                    <div className="flex items-center gap-4">
                        <label className="text-sm font-black text-dark-950 uppercase tracking-widest">Filter by Year</label>
                        <select
                            value={selectedYear}
                            onChange={(e) => setSelectedYear(e.target.value)}
                            className="px-6 py-3 bg-white border-2 border-gray-200 rounded-full font-bold text-dark-950 outline-none focus:border-primary-500 transition-all cursor-pointer"
                        >
                            {years.map(year => (
                                <option key={year} value={year}>{year}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex items-center gap-4">
                        <label className="text-sm font-black text-dark-950 uppercase tracking-widest">Sort Order</label>
                        <div className="flex bg-white rounded-full p-1 border-2 border-gray-200">
                            <button
                                onClick={() => setSortOrder('newest')}
                                className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${sortOrder === 'newest' ? 'bg-primary-600 text-white shadow-lg' : 'text-gray-500 hover:text-dark-950'}`}
                            >
                                Newest
                            </button>
                            <button
                                onClick={() => setSortOrder('oldest')}
                                className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${sortOrder === 'oldest' ? 'bg-primary-600 text-white shadow-lg' : 'text-gray-500 hover:text-dark-950'}`}
                            >
                                Oldest
                            </button>
                        </div>
                    </div>
                </div>

                {/* Grid */}
                <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <GalleryGrid items={filteredAndSortedImages.map(img => img.url)} />
                </motion.div>

                {filteredAndSortedImages.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-xl text-gray-500">No images found for the selected year.</p>
                    </div>
                )}
            </div>

            <div className="bg-dark-950 py-12">
                <ContactCTA />
            </div>
        </div>
    );
};

export default Gallery;

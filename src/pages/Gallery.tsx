import { useState, useMemo } from 'react';
import { GalleryHero } from '../components/gallery/GalleryHero';
import { GalleryGrid } from '../components/gallery/GalleryGrid';
import { ContactCTA } from '../components/common/ContactCTA';
import { motion } from 'framer-motion';

// Sample data with years
const galleryData = [
    { id: 1, url: "https://images.unsplash.com/photo-1523580494863-6f3031224c94", year: 2026, title: "SRC 2026 Main Stage" },
    { id: 2, url: "https://images.unsplash.com/photo-1517048676732-d65bc937f952", year: 2025, title: "Networking 2025" },
    { id: 3, url: "https://images.unsplash.com/photo-1525130413817-d45c1ca32729", year: 2026, title: "Workshop Session" },
    { id: 4, url: "https://images.unsplash.com/photo-1560523160-754a9e25c68f", year: 2024, title: "Presentation 2024" },
    { id: 5, url: "https://images.unsplash.com/photo-1540575861501-7ad0582371f3", year: 2025, title: "Audience 2025" },
    { id: 6, url: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678", year: 2023, title: "Gala Night 2023" },
    { id: 7, url: "https://images.unsplash.com/photo-1475721027187-40aeae739501", year: 2026, title: "Breakfast Meeting" },
    { id: 8, url: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30", year: 2024, title: "Closing Ceremony 2024" },
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
            <GalleryHero />

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

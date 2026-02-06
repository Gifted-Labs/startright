import React from 'react';

// Using simple stylized text as placeholders for logos if images aren't real
// In a real app, strict SVGs or PNGs would be used.
const sponsors = [
    { name: "Merbs Series" },
    { name: "MerbsConnect Executives" },
    { name: "Youth Development Consortium" },
    { name: "DateMedia" },
    { name: "Cyrus The King" },
    { name: "MrBlaque Studios" },
];

export const AboutSponsorsSection: React.FC = () => {
    return (
        <section className="py-20 bg-white border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <span className="text-primary-600 font-bold uppercase text-xs tracking-wider mb-2 block">Our Trusted Partners</span>
                <h2 className="text-3xl font-black text-dark-950 mb-12">General Sponsors</h2>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 items-center grayscale hover:grayscale-0 transition-all duration-500">
                    {sponsors.map((sponsor, idx) => (
                        <div key={idx} className={`text-4xl font-black text-gray-300 hover:text-dark-950 transition-colors cursor-pointer select-none flex justify-center items-center h-20`}>
                            {/* Placeholder for Logo - Using Text for now */}
                            <span className="font-display italic tracking-tight">{sponsor.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

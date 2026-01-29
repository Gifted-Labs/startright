import React from 'react';

// Using simple stylized text as placeholders for logos if images aren't real
// In a real app, strict SVGs or PNGs would be used.
const sponsors = [
    { name: "NLLA", opacity: "opacity-40" },
    { name: "may", opacity: "opacity-50" },
    { name: "TECH", opacity: "opacity-60" },
    { name: "HULL", opacity: "opacity-40" },
    { name: "maliz", opacity: "opacity-50" },
    { name: "VIGOR", opacity: "opacity-40" },
    { name: "Coffee", opacity: "opacity-50" },
    { name: "CONSULT", opacity: "opacity-40" },
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

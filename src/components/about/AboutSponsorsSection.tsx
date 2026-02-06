import React from 'react';
import { FaExternalLinkAlt } from 'react-icons/fa';


interface Partner {
    name: string;
    category: string;
    initials: string;
}

const partners: Partner[] = [
    { name: "Merbs Series", category: "General Sponsor", initials: "MS" },
    { name: "MerbsConnect Executives", category: "General Sponsor", initials: "ME" },
    { name: "Youth Development Consortium", category: "General Sponsor", initials: "YD" },
    { name: "DateMedia", category: "Media Partner", initials: "DM" },
    { name: "Cyrus The King", category: "General Sponsor", initials: "CK" },
    { name: "MrBlaque Studios", category: "Media Partner", initials: "MB" },
];

export const AboutSponsorsSection: React.FC = () => {
    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-black text-dark-950 mb-4">Our Partners & Sponsors</h2>
                    <p className="text-gray-500 max-w-2xl mx-auto">
                        Proudly supported by leading institutions and organizations
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-16">
                    {partners.map((partner, idx) => (
                        <div key={idx} className="bg-white border border-gray-100 rounded-xl p-8 flex flex-col items-center justify-center text-center shadow-lg hover:shadow-xl transition-shadow duration-300 group cursor-default">
                            {/* Logo Placeholder */}
                            <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                <span className="text-red-500 font-bold text-xl">{partner.initials}</span>
                            </div>
                            
                            {/* Name & Category */}
                            <h3 className="font-bold text-dark-900 text-sm mb-1">{partner.name}</h3>
                            <p className="text-gray-400 text-xs">{partner.category}</p>
                        </div>
                    ))}
                </div>

                <div className="text-center">
                    <p className="text-gray-500 mb-6">Interested in becoming a partner?</p>
                    <button className="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-dark-900 text-dark-900 font-bold rounded-lg hover:bg-dark-50 transition-colors">
                        Partner With Us
                        <FaExternalLinkAlt className="text-sm" />
                    </button>
                </div>
            </div>
        </section>
    );
};

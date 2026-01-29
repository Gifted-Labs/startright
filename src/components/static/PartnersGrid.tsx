import { brandInfo } from '../../data/brandInfo';

export const PartnersGrid = () => {
    return (
        <section className="py-16 bg-gray-50 border-t border-gray-100">
            <div className="container mx-auto px-4 md:px-6">
                <p className="text-center text-gray-500 text-sm font-semibold uppercase tracking-widest mb-10">
                    Trusted by Industry Leaders & Institutions
                </p>
                <div className="flex flex-wrap justify-center gap-10 md:gap-16 items-center opacity-75 grayscale hover:grayscale-0 transition-all duration-500">
                    {brandInfo.partners.map((partner, index) => (
                        <div key={index} className="group relative">
                            {/* Placeholder for real logos - using text fallback if image fails or just styled div */}
                            <img
                                src={partner.logo}
                                alt={partner.name}
                                className="h-12 md:h-16 w-auto object-contain hover:scale-110 transition-transform duration-300"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = `https://placehold.co/150x60?text=${partner.name.substring(0, 3)}`;
                                }}
                            />
                            <div className="hidden group-hover:block absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                {partner.name}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

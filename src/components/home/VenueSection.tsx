import React from 'react';
import { HiOutlineMap } from 'react-icons/hi';

export const VenueSection: React.FC = () => {
    return (
        <section className="relative h-[500px] bg-gray-100 overflow-hidden flex items-center justify-center">
            {/* Map Placeholder Image */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://mt1.google.com/vt/lyrs=r&x=0&y=0&z=0" // Simplified generic map tile, effectively replaced by custom style or image below
                    className="w-full h-full object-cover grayscale opacity-30"
                    alt="Map Background"
                />
                {/* Better static map placeholder */}
                <div className="absolute inset-0 bg-[#e5e7eb] opacity-50 bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/World_map_blank_without_borders.svg/2000px-World_map_blank_without_borders.svg.png')] bg-cover bg-center mix-blend-multiply"></div>
            </div>

            <div className="relative z-10 container mx-auto px-4 pointer-events-none">
                <div className="pointer-events-auto bg-white p-8 md:p-12 rounded-3xl shadow-xl max-w-md mx-auto md:ml-20">
                    <span className="text-primary-500 font-bold uppercase tracking-widest text-xs mb-2 block">
                        Venue Location
                    </span>
                    <h2 className="text-3xl font-black text-dark-950 mb-6">
                        Explore the <br /> Popular Venue
                    </h2>

                    <div className="space-y-4 mb-8">
                        <div>
                            <h4 className="font-bold text-dark-900">SMS Auditorium</h4>
                            <p className="text-gray-500 text-sm">Polytechnic Road, KNUST, Kumasi</p>
                        </div>
                        <div>
                            <h4 className="font-bold text-dark-900">Breakout Sessions</h4>
                            <p className="text-gray-500 text-sm">College of Science Complex</p>
                        </div>
                    </div>

                    <a
                        href="https://maps.google.com"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-full font-bold hover:bg-primary-700 transition w-full justify-center"
                    >
                        <HiOutlineMap />
                        Get Directions
                    </a>
                </div>
            </div>

            {/* Pin on Map (Visual Only) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 animate-bounce">
                <div className="text-primary-600 text-6xl drop-shadow-2xl">📍</div>
            </div>
        </section>
    );
};

import { GetDirectionsButton } from '../common/GetDirectionsButton';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { VenueMap } from './VenueMap';

export const VenueSection: React.FC = () => {
    return (
        <section className="relative w-full py-20 bg-white overflow-hidden">
            {/* Background Map - Interactive Leaflet Map */}
            <div className="absolute inset-0 z-0">
                <VenueMap />
            </div>

            {/* Overlay Gradient to ensure pins and cards stand out */}
            <div className="absolute inset-0 bg-white/40 z-[1] pointer-events-none"></div>

            <div className="container mx-auto px-4 relative z-10 flex flex-col md:flex-row items-center justify-center md:justify-start">

                {/* Floating Location Card */}
                <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full border-t-4 border-primary-500 relative z-20">
                    <div className="mb-6">
                        <span className="text-primary-500 font-bold text-xs uppercase tracking-widest mb-2 block">Venue Location</span>
                        <h2 className="text-3xl font-black text-dark-950 mb-4 leading-tight">
                            Explore the <br /> Popular Venue
                        </h2>
                    </div>

                    <div className="space-y-6 mb-8">
                        <div>
                            <h3 className="font-bold text-dark-900 text-lg mb-1">SMS Auditorium</h3>
                            <p className="text-gray-500 text-sm">University of Cape Coast (UCC)</p>
                        </div>

                        <div>
                            <h3 className="font-bold text-dark-900 text-lg mb-1">Breakout Sessions</h3>
                            <p className="text-gray-500 text-sm">College of Science Complex</p>
                        </div>
                    </div>

                    <GetDirectionsButton className="w-full" label="Get Directions" />
                </div>

                {/* Map Marker Visual */}
                <div className="hidden md:block absolute left-[59%] top-[50%] -translate-x-1/2 -translate-y-[100%] animate-bounce z-10">
                    <FaMapMarkerAlt className="text-6xl text-primary-500 drop-shadow-2xl" />
                    <div className="w-4 h-4 bg-primary-500 rounded-full absolute -bottom-1 left-1/2 -translate-x-1/2 blur-sm"></div>
                </div>
            </div>
        </section>
    );
};

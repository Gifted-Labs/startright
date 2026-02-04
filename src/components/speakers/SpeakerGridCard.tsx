import React from 'react';
import { HiOutlinePlus } from 'react-icons/hi';

interface SpeakerGridCardProps {
    name: string;
    role: string;
    image: string;
    bio?: string;
    onClick?: () => void;
}

export const SpeakerGridCard: React.FC<SpeakerGridCardProps> = ({ name, role, image, onClick }) => {
    return (
        <div
            onClick={onClick}
            className="group cursor-pointer bg-dark-900 border border-white/5 rounded-sm overflow-hidden transition-all duration-500 hover:border-primary-500/30 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
        >
            {/* Image Area (Top) */}
            <div className="aspect-[4/5] overflow-hidden relative grayscale group-hover:grayscale-0 transition-all duration-700 bg-dark-800">
                {image ? (
                    <img
                        src={image}
                        alt={name}
                        className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-dark-800 text-gray-700">
                        <svg className="w-24 h-24 opacity-20" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zM12 14c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                        </svg>
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/20 to-transparent opacity-80 group-hover:opacity-40 transition-opacity"></div>

                {/* Floating Badge */}
                <div className="absolute top-4 left-4">
                    <span className="bg-primary-500 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-sm shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-500 -translate-x-4 group-hover:translate-x-0">
                        View Profile
                    </span>
                </div>
            </div>

            {/* Speaker Details (Bottom Section) */}
            <div className="p-8 text-center bg-dark-900 relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-primary-500/50 group-hover:w-24 transition-all duration-500"></div>

                <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-1 group-hover:text-primary-400 transition-colors">
                    {name}
                </h3>
                <p className="text-gray-400 font-medium text-xs mb-8 tracking-wider uppercase">
                    {role}
                </p>

                {/* Action Indicator */}
                <div className="flex items-center justify-center gap-2 text-primary-500 text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                    <HiOutlinePlus className="w-3.5 h-3.5" />
                    Connect & Follow
                </div>
            </div>
        </div>
    );
};

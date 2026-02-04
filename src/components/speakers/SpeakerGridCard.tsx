import React from 'react';
import { HiOutlinePhone, HiOutlinePlus } from 'react-icons/hi';

interface SpeakerGridCardProps {
    name: string;
    role: string;
    image: string;
    bio?: string;
}

export const SpeakerGridCard: React.FC<SpeakerGridCardProps> = ({ name, role, image }) => {
    return (
        <div className="group bg-dark-900 border border-white/5 rounded-lg overflow-hidden transition-all duration-500 hover:border-primary-500/30 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
            {/* Image Area (Top) */}
            <div className="aspect-[4/5] overflow-hidden relative grayscale group-hover:grayscale-0 transition-all duration-700">
                <img
                    src={image}
                    alt={name}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-transparent to-transparent opacity-60"></div>
            </div>

            {/* Speaker Details (Bottom Section) */}
            <div className="p-8 text-center bg-dark-900">
                <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-1">{name}</h3>
                <p className="text-gray-300 font-medium text-sm mb-8 tracking-wider uppercase">
                    {role}
                </p>

                {/* Buttons (Below Details) */}
                <div className="flex gap-1">
                    <button className="flex-1 bg-white hover:bg-gray-100 text-dark-950 py-4 text-[10px] font-black uppercase tracking-widest transition-colors flex items-center justify-center gap-2 rounded-sm">
                        <HiOutlinePhone className="w-3.5 h-3.5" />
                        Get To Know
                    </button>
                    <button className="flex-1 bg-primary-500 hover:bg-primary-600 text-white py-4 text-[10px] font-black uppercase tracking-widest transition-colors flex items-center justify-center gap-2 rounded-sm">
                        <HiOutlinePlus className="w-3.5 h-3.5" />
                        Follow
                    </button>
                </div>
            </div>
        </div>
    );
};

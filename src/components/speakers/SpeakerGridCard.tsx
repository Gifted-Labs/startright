import React from 'react';
import { HiOutlinePhone, HiOutlineArrowRight } from 'react-icons/hi';

interface SpeakerGridCardProps {
    name: string;
    role: string;
    image: string;
    bio?: string;
}

export const SpeakerGridCard: React.FC<SpeakerGridCardProps> = ({ name, role, image, bio }) => {
    return (
        <div className="group h-[26rem] sm:h-[30rem] [perspective:1000px] cursor-pointer">
            {/* Flip Container */}
            <div className="relative w-full h-full transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">

                {/* --- Front Face --- */}
                <div className="absolute inset-0 bg-white rounded-xl shadow-lg overflow-hidden [backface-visibility:hidden]">
                    {/* Image Container */}
                    <div className="h-64 sm:h-80 overflow-hidden bg-gray-100 flex items-center justify-center">
                        <img
                            src={image}
                            alt={name}
                            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        />
                    </div>

                    {/* Content */}
                    <div className="pt-6 pb-2 text-center px-4">
                        <h3 className="text-xl font-black text-dark-950 uppercase tracking-tight">{name}</h3>
                        <p className="text-primary-500 font-medium text-sm mt-1 mb-6 font-display italic">
                            {role}
                        </p>
                    </div>

                    {/* Bottom Actions - Split 50/50 */}
                    <div className="absolute bottom-0 w-full grid grid-cols-2">
                        <button className="bg-dark-950 text-white py-4 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors">
                            <HiOutlinePhone className="w-4 h-4" />
                            Get In Touch
                        </button>
                        <button className="bg-primary-500 text-white py-4 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-primary-600 transition-colors">
                            <HiOutlineArrowRight className="w-4 h-4" />
                            Follow Me
                        </button>
                    </div>
                </div>

                {/* --- Back Face (Bio) --- */}
                <div className="absolute inset-0 bg-dark-950 text-white rounded-xl shadow-xl overflow-hidden [transform:rotateY(180deg)] [backface-visibility:hidden] p-8 flex flex-col justify-between">
                    <div>
                        <h3 className="text-2xl font-black uppercase text-white mb-2">{name}</h3>
                        <p className="text-primary-500 font-medium italic mb-6">{role}</p>

                        <div className="prose prose-invert prose-sm overflow-y-auto max-h-[12rem] pr-2 scrollbar-thin scrollbar-thumb-primary-600 scrollbar-track-dark-800">
                            <p className="text-gray-300 leading-relaxed text-sm">
                                {bio || "Biography not available at this time."}
                            </p>
                        </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-white/10">
                        <button className="w-full bg-primary-600 hover:bg-primary-500 text-white py-3 rounded-full font-bold uppercase text-xs flex items-center justify-center gap-2 transition-all">
                            View Full Profile <HiOutlineArrowRight />
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

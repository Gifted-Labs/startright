import React from 'react';
import { HiOutlineClipboardList, HiOutlineUserGroup, HiOutlineHome } from 'react-icons/hi';

const steps = [
    { icon: HiOutlineClipboardList, title: "Register & Prepare", desc: "Secure your spot at the conference and choose the tracks that align with your career goals." },
    { icon: HiOutlineUserGroup, title: "Connect & Engage", desc: "Meet industry mentors, innovative peers, and future collaborators in our dedicated sessions." },
    { icon: HiOutlineHome, title: "Grow & Impact", desc: "Apply actionable insights to your career and join the MerbsConnect community for year-round growth." },
];

export const AboutProcessSection: React.FC = () => {
    return (
        <section className="py-24 bg-white text-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <span className="text-red-600 font-bold uppercase text-[10px] tracking-[0.2em] mb-4 block">Our Process</span>
                <h2 className="text-4xl md:text-5xl font-black text-black mb-20 tracking-tight">See How it Works</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 max-w-6xl mx-auto">
                    {steps.map((step, idx) => (
                        <div key={idx} className="flex flex-col items-center group">
                            <div className="w-24 h-24 border border-dashed border-gray-300 rounded-full flex items-center justify-center text-black mb-8 group-hover:border-red-600 group-hover:text-red-600 transition-all duration-300 bg-white">
                                <step.icon className="w-8 h-8 stroke-[1.5]" />
                            </div>
                            <h3 className="text-xl font-bold text-black mb-4">{step.title}</h3>
                            <p className="text-gray-500 text-sm leading-relaxed max-w-[260px] mx-auto font-medium">
                                {step.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

import React from 'react';
import { HiOutlineClipboardList, HiOutlineUserGroup, HiOutlineHome } from 'react-icons/hi';

const steps = [
    { icon: HiOutlineClipboardList, title: "Choose What To Do", desc: "Browse our diverse agenda and select the track that fits your career goals." },
    { icon: HiOutlineUserGroup, title: "Find What You Want", desc: "Connect with mentors and peers who share your interests and ambition." },
    { icon: HiOutlineHome, title: "Amazing Places", desc: "Experience our world-class venues designed for comfort and networking." },
];

export const AboutProcessSection: React.FC = () => {
    return (
        <section className="py-24 bg-white text-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <span className="text-primary-600 font-bold uppercase text-xs tracking-wider mb-2 block">Our Process</span>
                <h2 className="text-3xl md:text-4xl font-black text-dark-950 mb-16">See How it Works</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {steps.map((step, idx) => (
                        <div key={idx} className="flex flex-col items-center group">
                            <div className="w-20 h-20 border-2 border-dashed border-gray-300 rounded-full flex items-center justify-center text-dark-950 mb-6 group-hover:border-primary-500 group-hover:text-primary-500 transition-colors">
                                <step.icon className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold text-dark-950 mb-3">{step.title}</h3>
                            <p className="text-gray-500 text-sm max-w-xs mx-auto leading-relaxed">
                                {step.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

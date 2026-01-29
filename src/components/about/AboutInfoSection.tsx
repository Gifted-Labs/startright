import React from 'react';
import { HiOutlineArrowRight, HiOutlineCurrencyDollar, HiOutlineLocationMarker } from 'react-icons/hi';

export const AboutInfoSection: React.FC = () => {
    return (
        <section className="py-24 bg-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Left: Image Collage */}
                    <div className="relative">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-4 pt-12">
                                <img
                                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
                                    alt="Team meeting"
                                    className="rounded-2xl shadow-xl w-full aspect-[3/4] object-cover"
                                />
                            </div>
                            <div className="space-y-4">
                                <img
                                    src="https://images.unsplash.com/photo-1556761175-4b46a572b786?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
                                    alt="Collaboration"
                                    className="rounded-2xl shadow-xl w-full aspect-[4/3] object-cover"
                                />
                                <img
                                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
                                    alt="Office culture"
                                    className="rounded-2xl shadow-xl w-full aspect-[3/4] object-cover relative z-10" // Added rounded-2xl to match design spec
                                />
                            </div>
                        </div>

                        {/* Decorative Blob */}
                        <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary-100/50 rounded-full blur-[100px]" />
                    </div>

                    {/* Right: Content */}
                    <div>
                        <span className="text-primary-600 font-bold uppercase text-sm tracking-wider mb-2 block">Top Conference in 2026</span>
                        <h2 className="text-4xl md:text-5xl font-black text-dark-950 mb-6 leading-tight">
                            Get the Latest Info <br /> About <span className="text-primary-600">StartRight</span>
                        </h2>
                        <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                            We bring together the brightest minds and industry leaders to inspire, educate, and connect. Our mission is to empower professionals to achieve their goals through actionable insights and meaningful networking.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-10">
                            <div className="flex gap-4">
                                <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center text-primary-600 shrink-0">
                                    <HiOutlineCurrencyDollar className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-dark-950 mb-1">Price</h4>
                                    <p className="text-sm text-gray-500">Affordable tickets starting at $20.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center text-primary-600 shrink-0">
                                    <HiOutlineLocationMarker className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-dark-950 mb-1">Where</h4>
                                    <p className="text-sm text-gray-500">Silicon Valley Convention Center.</p>
                                </div>
                            </div>
                        </div>

                        <button className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-4 rounded-full font-bold uppercase tracking-wider transition-all transform hover:scale-105 shadow-lg shadow-primary-500/30 flex items-center gap-2">
                            Read More <HiOutlineArrowRight />
                        </button>
                    </div>

                </div>
            </div>
        </section>
    );
};

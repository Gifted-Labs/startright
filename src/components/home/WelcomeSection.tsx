import React from 'react';
import { motion } from 'framer-motion';
import { GetDirectionsButton } from '../common/GetDirectionsButton';
import { HiOutlineLocationMarker, HiOutlineClock } from 'react-icons/hi';

export const WelcomeSection: React.FC = () => {
    return (
        <section className="py-24 bg-white text-dark-950 relative overflow-hidden">
            {/* Background Texture */}
            <div className="absolute top-0 left-0 w-full h-full opacity-5 bg-[radial-gradient(#000000_1px,transparent_1px)] [background-size:16px_16px]"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Left: Image Mosaic */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative"
                    >
                        <div className="grid grid-cols-2 gap-4">
                            <img
                                src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
                                className="rounded-2xl object-cover h-64 w-full translate-y-8"
                                alt="Conference Crowd"
                            />
                            <div className="relative">
                                <img
                                    src="https://images.unsplash.com/photo-1591115765373-5207764f72e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
                                    className="rounded-2xl object-cover h-64 w-full"
                                    alt="Networking"
                                />
                                {/* Badge */}
                                <div className="absolute -bottom-6 -left-6 bg-primary-500 text-white p-6 rounded-2xl shadow-xl">
                                    <span className="block text-4xl font-black">15+</span>
                                    <span className="text-sm font-medium uppercase tracking-wider">Speakers</span>
                                </div>
                            </div>
                            <img
                                src="https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
                                className="rounded-2xl object-cover h-64 w-full translate-y-8"
                                alt="Conference Hall"
                            />
                            <img
                                src="https://images.unsplash.com/photo-1475721027767-f4242310f17e?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
                                className="rounded-2xl object-cover h-64 w-full"
                                alt="Workshop"
                            />
                        </div>
                    </motion.div>

                    {/* Right: Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <span className="text-primary-600 font-bold tracking-widest uppercase text-sm mb-2 block">
                            About The Event
                        </span>
                        <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight text-dark-950">
                            Welcome to the <br />
                            <span className="text-primary-500">Start Right</span> <br />
                            Conference  2026
                        </h2>

                        <p className="text-gray-600 text-lg leading-relaxed mb-8">
                            Start Right 2026 is an impactful gathering for first-year univerity students and a space for continuing students to review their journey with clarity and focus. We bring together lecturers,
                            valecditorians, student leaders, innovators, industry experts, and professionals to provide you
                            with the right tools you need to succeed in the age of AI and beyond.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                            <div className="flex items-start gap-4">
                                <div className="bg-primary-50 p-3 rounded-full text-primary-600">
                                    <HiOutlineClock className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg mb-1">When</h4>
                                    <p className="text-gray-600">Feb 21, 2026<br />09:00 AM - 01:00 PM</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="bg-primary-50 p-3 rounded-full text-primary-600">
                                    <HiOutlineLocationMarker className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg mb-1">Where</h4>
                                    <p className="text-gray-600 mb-2">SMS Auditorium<br />University of Cape Coast (UCC)</p>
                                    <GetDirectionsButton variant="text" label="Get Directions" />
                                </div>
                            </div>
                        </div>

                        <div className="mt-10">
                            <a href="#" className="font-bold text-dark-950 border-b-2 border-primary-500 pb-1 hover:text-primary-600 transition-colors">
                                Learn More About Us &rarr;
                            </a>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

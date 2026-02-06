import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HiOutlineDocumentText, HiOutlineMail, HiOutlineDeviceMobile, HiOutlineQrcode, HiOutlineArrowRight } from 'react-icons/hi';

const steps = [
    {
        id: "01",
        icon: <HiOutlineDocumentText className="w-10 h-10" />,
        headline: "Details",
        subtext: "Fill out the public form. No account or password required.",
        gradient: "from-blue-600 to-cyan-500",
        delay: 0.1,
        colorClass: "text-blue-600"
    },
    {
        id: "02",
        icon: (
            <div className="relative flex items-center justify-center">
                <HiOutlineMail className="w-10 h-10" />
                <HiOutlineDeviceMobile className="absolute -top-2 -right-2 w-5 h-5 text-primary-400" />
            </div>
        ),
        headline: "Instant Delivery",
        subtext: "Receive your PDF Ticket via Email and Entry Token via SMS immediately.",
        gradient: "from-primary-600 to-red-500",
        delay: 0.2,
        colorClass: "text-primary-600"
    },
    {
        id: "03",
        icon: <HiOutlineQrcode className="w-10 h-10" />,
        headline: "Check-In",
        subtext: "Present your QR Code at the door for a 2-second entry scan.",
        gradient: "from-emerald-600 to-teal-500",
        delay: 0.3,
        colorClass: "text-emerald-600"
    }
];

export const RegistrationGuide: React.FC = () => {
    return (
        <section className="py-24 bg-white text-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-red-600 font-bold uppercase text-[10px] tracking-[0.2em] mb-4 block"
                >
                    Seamless Experience
                </motion.span>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl md:text-5xl font-black text-black mb-20 tracking-tight"
                >
                    Registration Roadmap
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 max-w-6xl mx-auto relative z-10">
                    {steps.map((step, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: step.delay }}
                            className="flex flex-col items-center group"
                        >
                            <div className="w-24 h-24 border border-dashed border-gray-300 rounded-full flex items-center justify-center text-black mb-8 group-hover:border-red-600 group-hover:text-red-600 transition-all duration-300 bg-white">
                                <div className="text-4xl">
                                    {step.icon}
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-black mb-4">{step.headline}</h3>
                            <p className="text-gray-500 text-sm leading-relaxed max-w-[260px] mx-auto font-medium">
                                {step.subtext}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

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
        <section className="py-24 bg-white relative overflow-hidden">
            {/* Background Decorative Gradients */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-primary-500/5 blur-[100px] rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full translate-x-1/3 translate-y-1/3"></div>

            <div className="container mx-auto px-4 max-w-7xl relative z-10">
                <div className="text-center mb-20">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-primary-600 font-bold tracking-[0.2em] uppercase mb-4 block text-xs"
                    >
                        Seamless Experience
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl md:text-5xl font-black text-dark-950 mb-6 tracking-tight leading-tight"
                    >
                        Registration Roadmap
                    </motion.h2>
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="w-24 h-1 bg-gradient-to-r from-primary-500 to-blue-500 mx-auto rounded-full mb-6"
                    ></motion.div>
                </div>

                <div className="relative">
                    {/* Connecting Line (Desktop) - Gradient & Dashed */}
                    <div className="hidden md:block absolute top-[60px] left-[15%] right-[15%] h-[2px] z-0">
                        <div className="w-full h-full border-t-2 border-dashed border-gray-200"></div>
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-primary-500/20 to-emerald-500/20"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
                        {steps.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: step.delay }}
                                whileHover={{ scale: 1.05, y: -5 }}
                                className="group"
                            >
                                <div className="relative h-full p-8 bg-white/40 backdrop-blur-md rounded-3xl border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500 flex flex-col items-center text-center overflow-hidden">
                                    {/* Large Watermarked Step Number */}
                                    <div className="absolute -top-4 -right-2 text-9xl font-black text-gray-50/50 select-none -z-10 group-hover:text-primary-50 transition-colors duration-500 italic">
                                        {step.id}
                                    </div>

                                    {/* Icon Container with Gradient Border/Glow */}
                                    <div className={`relative w-24 h-24 rounded-full bg-white shadow-lg flex items-center justify-center mb-8 border border-gray-100 group-hover:border-transparent transition-all duration-500`}>
                                        <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${step.gradient} opacity-[0.03] group-hover:opacity-10 transition-opacity duration-500`}></div>
                                        <div className={`text-4xl ${step.colorClass} group-hover:scale-110 transition-transform duration-500 flex items-center justify-center`}>
                                            {step.icon}
                                        </div>
                                    </div>

                                    <h3 className="text-2xl font-black text-dark-950 mb-4 tracking-tight">
                                        {step.headline}
                                    </h3>

                                    <p className="text-gray-600 leading-relaxed text-sm md:text-base font-medium">
                                        {step.subtext}
                                    </p>

                                    {/* Decorative Dot for the line alignment */}
                                    <div className={`hidden md:block absolute top-[58px] w-3 h-3 rounded-full bg-white border-2 border-gray-200 group-hover:border-primary-500 group-hover:scale-125 transition-all duration-500 -z-20`}></div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Final CTA Button */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="mt-20 text-center"
                >
                    <Link
                        to="/events"
                        className="group relative inline-flex items-center gap-3 bg-dark-950 text-white px-10 py-5 rounded-full font-black tracking-widest uppercase text-sm transition-all hover:scale-105 active:scale-95 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)] hover:shadow-primary-500/25"
                    >
                        {/* Glow effect on hover */}
                        <div className="absolute inset-0 rounded-full bg-primary-500 blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>

                        <span className="relative">Register Now</span>
                        <HiOutlineArrowRight className="relative w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

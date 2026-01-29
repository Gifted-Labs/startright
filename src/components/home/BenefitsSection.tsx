import React from 'react';
import { motion } from 'framer-motion';
import { HiOutlineLightBulb, HiOutlineGlobeAlt, HiOutlineUserGroup, HiOutlineAcademicCap } from 'react-icons/hi';

const features = [
    {
        icon: HiOutlineLightBulb,
        title: "Career Guidance",
        text: "Gain clarity on your career path with expert advice from industry leaders and professionals."
    },
    {
        icon: HiOutlineGlobeAlt,
        title: "AI & Global Opportunities",
        text: "Discover how AI is reshaping industries and how you can position yourself for global opportunities."
    },
    {
        icon: HiOutlineUserGroup,
        title: "Leadership & Networking",
        text: "Connect with like-minded peers and mentors to build a professional network that lasts a lifetime."
    },
    {
        icon: HiOutlineAcademicCap,
        title: "Academic Excellence",
        text: "Learn strategies to excel in your studies and balance academic success with personal growth."
    }
];

export const BenefitsSection: React.FC = () => {
    return (
        <section className="py-24 bg-dark-900 text-white relative overflow-hidden">

            {/* Subtle mesh/dots background could go here */}

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">Why You Can't Miss This</h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        This isn't just another conference. It's a stepping stone to your future success.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-dark-950 p-8 rounded-2xl border border-white/5 hover:border-primary-500/30 transition-colors group"
                            >
                                <div className="w-14 h-14 rounded-xl bg-primary-500/10 flex items-center justify-center text-primary-500 mb-6 group-hover:bg-primary-500 group-hover:text-white transition-colors duration-300">
                                    <Icon className="w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                                <p className="text-gray-400 leading-relaxed text-sm">
                                    {feature.text}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

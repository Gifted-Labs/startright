import React from 'react';
import { motion } from 'framer-motion';
import mtnLogo from '../../assets/images/mtn-momo.png';
import telecelLogo from '../../assets/images/telecel-cash.png';
import gcbLogo from '../../assets/images/gcb-bank.png';

export const SponsorshipSection: React.FC = () => {
    const paymentMethods = [
        {
            name: "MTN Mobile Money",
            logo: gcbLogo, // Swapped: file named gcb-bank.png actually contains MTN logo per user feedback
            details: [
                { label: "Number", value: "0540620470" },
                { label: "Name", value: "MerbsConnect" }
            ],
            color: "border-yellow-400/20"
        },
        {
            name: "Telecel Cash",
            logo: telecelLogo,
            details: [
                { label: "Number", value: "0201291771" },
                { label: "Name", value: "MerbsConnect" }
            ],
            color: "border-red-500/20"
        },
        {
            name: "Bank Transfer",
            logo: mtnLogo, // Swapped: file named mtn-momo.png actually contains GCB logo per user feedback
            details: [
                { label: "Bank", value: "Ghana Commercial Bank" },
                { label: "Account Name", value: "MERBSCONNECT" },
                { label: "Account Number", value: "3021010129358" },
                { label: "Reference", value: "Start Right CONFERENCE2026" }
            ],
            color: "border-yellow-600/20"
        }
    ];

    return (
        <section className="py-24 bg-dark-950 text-white relative overflow-hidden border-t border-white/5">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-primary-500/5 blur-[120px] rounded-full -translate-y-1/2 -translate-x-1/2 -z-10"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <span className="text-primary-500 font-bold text-xs tracking-widest uppercase mb-3 block">Support The Vision</span>
                    <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tight">How to Support</h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
                        Impact is the reason and worth spreading. Your support helps us deliver a world-class experience.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {paymentMethods.map((method, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className={`bg-white/5 border ${method.color} backdrop-blur-sm p-8 rounded-xl hover:bg-white/10 transition-all group`}
                        >
                            <div className="h-16 mb-6 flex items-center justify-start">
                                <img
                                    src={method.logo}
                                    alt={method.name}
                                    className="h-full object-contain max-w-[120px]"
                                />
                            </div>

                            <h3 className="text-xl font-bold mb-4 group-hover:text-primary-400 transition-colors">{method.name}</h3>

                            <div className="space-y-3">
                                {method.details.map((detail, idx) => (
                                    <div key={idx} className="flex flex-col">
                                        <span className="text-xs text-gray-500 uppercase tracking-wider">{detail.label}</span>
                                        <span className="text-lg font-mono text-gray-200 select-all">{detail.value}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <p className="text-gray-400">
                        Just copy the details and send to support.
                        <br />
                        <span className="text-primary-500 font-bold mt-2 inline-block">Thank you for your generosity!</span>
                    </p>
                </div>
            </div>
        </section>
    );
};

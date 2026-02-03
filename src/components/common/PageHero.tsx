import { motion } from 'framer-motion';
import { memo } from 'react';
import { Link } from 'react-router-dom';

interface Breadcrumb {
    label: string;
    path?: string;
}

interface PageHeroProps {
    title: string;
    subtitle: string;
    backgroundImage: string;
    breadcrumbs: Breadcrumb[];
}

export const PageHero = memo(({ title, subtitle, backgroundImage, breadcrumbs }: PageHeroProps) => {
    return (
        <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-dark-950 transform-gpu">
            {/* Background Image/Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src={backgroundImage}
                    alt={title}
                    className="w-full h-full object-cover opacity-40 will-change-transform"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-transparent to-transparent"></div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 text-center text-white px-4">
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                >
                    <h1 className="text-5xl md:text-7xl font-black mb-4 tracking-tight capitalize">
                        {title}
                    </h1>
                </motion.div>

                <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
                    className="text-gray-200 text-lg md:text-xl mb-8 italic max-w-2xl mx-auto"
                >
                    {subtitle}
                </motion.p>

                {/* Breadcrumb Pill */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
                    className="inline-flex items-center gap-2 bg-white px-6 py-2 rounded-full text-dark-950 text-sm font-bold shadow-lg"
                >
                    {breadcrumbs.map((crumb, index) => (
                        <div key={index} className="flex items-center">
                            {index > 0 && <span className="text-gray-300 mx-2">/</span>}
                            {crumb.path ? (
                                <Link to={crumb.path} className="text-gray-500 hover:text-primary-500 transition-colors">
                                    {crumb.label}
                                </Link>
                            ) : (
                                <span>{crumb.label}</span>
                            )}
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
});

PageHero.displayName = 'PageHero';

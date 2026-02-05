import { motion } from 'framer-motion';
import { memo } from 'react';
import { Link } from 'react-router-dom';
import { HiHome } from 'react-icons/hi';
import { CachedImage } from './CachedImage';

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
        <section className="relative h-[65vh] flex items-center justify-center overflow-hidden transform-gpu mt-0 pt-20">
            {/* Background Image with Heavy Overlay */}
            <div className="absolute inset-0 z-0">
                <CachedImage
                    src={backgroundImage}
                    alt={title}
                    className="w-full h-full object-cover will-change-transform"
                />
                {/* 75% Dark Overlay as per reference */}
                <div className="absolute inset-0 bg-black/75"></div>

                {/* Subtle Gradient for Bottom Blend */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-transparent to-transparent opacity-60"></div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                    {/* Centered, Bold, Uppercase H1 */}
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 tracking-[0.05em] uppercase leading-tight">
                        {title}
                    </h1>
                </motion.div>

                <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                    className="text-gray-300 text-lg md:text-xl font-medium mb-10 max-w-2xl mx-auto leading-relaxed"
                >
                    {subtitle}
                </motion.p>

                {/* Breadcrumb Pill - Matches design: pill-shaped, dark bg, thin border */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="inline-flex items-center gap-2 bg-black/40 backdrop-blur-md px-6 py-2.5 rounded-full border border-white/10 shadow-2xl"
                >
                    <Link to="/" className="text-white/80 hover:text-white transition-colors flex items-center">
                        <HiHome className="w-4 h-4 mr-2" />
                        <span className="text-[13px] font-semibold">Home</span>
                    </Link>

                    {breadcrumbs.map((crumb, index) => (
                        <div key={index} className="flex items-center">
                            <span className="text-white/30 text-xs mx-1">&gt;</span>
                            {crumb.path ? (
                                <Link to={crumb.path} className="text-white/80 hover:text-white transition-colors text-[13px] font-semibold">
                                    {crumb.label}
                                </Link>
                            ) : (
                                <span className="text-primary-500 text-[13px] font-semibold">{crumb.label}</span>
                            )}
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
});

PageHero.displayName = 'PageHero';

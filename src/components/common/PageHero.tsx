import { motion } from 'framer-motion';

interface PageHeroProps {
    titleWhite: string;
    titleAccent: string;
    subtitle: string;
}

export const PageHero = ({ titleWhite, titleAccent, subtitle }: PageHeroProps) => {
    const fullTitle = `${titleWhite} ${titleAccent}`;

    return (
        <section className="relative bg-gradient-to-br from-secondary-950 via-secondary-900 to-secondary-950 pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden">
            {/* Decorative geometric lines */}
            <div className="absolute inset-0 opacity-10">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <line x1="20" y1="0" x2="80" y2="100" stroke="currentColor" strokeWidth="0.1" className="text-primary-500" />
                    <line x1="40" y1="0" x2="100" y2="100" stroke="currentColor" strokeWidth="0.1" className="text-primary-500" />
                    <line x1="0" y1="50" x2="60" y2="100" stroke="currentColor" strokeWidth="0.1" className="text-primary-500" />
                </svg>
            </div>

            {/* Watermark Text Behind */}
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none select-none">
                <span
                    className="text-[8vw] md:text-[10vw] font-black tracking-wider text-transparent uppercase whitespace-nowrap"
                    style={{
                        WebkitTextStroke: '1px rgba(255,255,255,0.05)',
                    }}
                    aria-hidden="true"
                >
                    {fullTitle}
                </span>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
                <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6"
                >
                    <span className="text-white">{titleWhite}</span>
                    {' '}
                    <span className="text-primary-500">{titleAccent}</span>
                </motion.h1>

                <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
                >
                    {subtitle}
                </motion.p>
            </div>
        </section>
    );
};

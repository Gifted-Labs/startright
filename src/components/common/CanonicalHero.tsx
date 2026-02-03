import React from 'react';
import { Link } from 'react-router-dom';
import { HiHome, HiChevronRight } from 'react-icons/hi';

interface BreadcrumbItem {
    label: string;
    path?: string;
}

interface CanonicalHeroProps {
    title: string;
    subtitle?: string;
    backgroundImage: string;
    breadcrumbs: BreadcrumbItem[];
}

export const CanonicalHero: React.FC<CanonicalHeroProps> = ({
    title,
    subtitle,
    backgroundImage,
    breadcrumbs
}) => {
    return (
        <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-dark-950">
            {/* Background Image/Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src={backgroundImage}
                    alt={title}
                    className="w-full h-full object-cover opacity-30"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-transparent to-transparent"></div>
            </div>

            <div className="relative z-10 text-center text-white px-4">
                <h1 className="text-5xl md:text-7xl font-black mb-4 tracking-tight uppercase">
                    {title}
                </h1>
                {subtitle && (
                    <p className="text-gray-400 text-lg mb-8 italic">
                        {subtitle}
                    </p>
                )}

                {/* Breadcrumb Pill */}
                <div className="inline-flex items-center gap-2 bg-white px-6 py-2 rounded-full text-dark-950 text-sm font-bold shadow-lg">
                    {breadcrumbs.map((item, index) => (
                        <React.Fragment key={index}>
                            {item.path ? (
                                <Link
                                    to={item.path}
                                    className="text-gray-500 hover:text-primary-500 transition-colors flex items-center gap-1"
                                >
                                    {item.label === 'Home' && <HiHome className="w-4 h-4" />}
                                    {item.label}
                                </Link>
                            ) : (
                                <span className="text-dark-950">{item.label}</span>
                            )}
                            {index < breadcrumbs.length - 1 && (
                                <HiChevronRight className="w-4 h-4 text-gray-300" />
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </section>
    );
};

import React from 'react';
import { FaLocationArrow } from 'react-icons/fa';

interface GetDirectionsButtonProps {
    className?: string;
    variant?: 'primary' | 'outline' | 'text';
    label?: string;
}

const GOOGLE_MAPS_URL = "https://www.google.com/maps/dir/?api=1&destination=5.120135809053736,-1.2938869258582324";

export const GetDirectionsButton: React.FC<GetDirectionsButtonProps> = ({
    className = "",
    variant = 'primary',
    label = "Get Directions"
}) => {

    const baseStyles = "inline-flex items-center justify-center gap-2 font-bold transition-all duration-300 rounded-full";

    const variants = {
        primary: "bg-primary-500 hover:bg-primary-600 text-white shadow-lg hover:shadow-primary-500/30 px-6 py-3",
        outline: "border-2 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white px-6 py-3",
        text: "text-primary-500 hover:text-primary-600 underline px-0 py-0"
    };

    return (
        <a
            href={GOOGLE_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`${baseStyles} ${variants[variant]} ${className}`}
            aria-label="Get directions to event venue on Google Maps"
        >
            <FaLocationArrow className={variant === 'text' ? "text-sm" : "text-lg"} />
            <span>{label}</span>
        </a>
    );
};

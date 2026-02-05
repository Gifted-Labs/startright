import React from 'react';
import { useImageCache } from '../../hooks/useImageCache';

interface CachedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    src: string;
    alt: string;
    fallback?: string;
    className?: string;
}

/**
 * Image component that uses the useImageCache hook.
 * Displays a skeleton placeholder while loading.
 */
export const CachedImage: React.FC<CachedImageProps> = ({
    src,
    alt,
    fallback = 'https://placehold.co/600x400?text=Image+Not+Found',
    className = '',
    ...props
}) => {
    const { cachedSrc, loading, error } = useImageCache(src);

    if (loading) {
        return (
            <div
                className={`animate-pulse bg-gray-200 ${className}`}
                style={{ width: props.width || '100%', height: props.height || '100%' }}
            />
        );
    }

    if (error || !cachedSrc) {
        return (
            <img
                src={fallback}
                alt={alt}
                className={`object-cover ${className}`}
                {...props}
            />
        );
    }

    return (
        <img
            src={cachedSrc}
            alt={alt}
            className={className}
            {...props}
        />
    );
};

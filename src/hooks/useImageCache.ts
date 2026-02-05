import { useState, useEffect } from 'react';

const CACHE_NAME = 'merbs-image-cache-v1';

/**
 * Custom hook to fetch and cache images using the Cache API.
 * This ensures that images are stored locally and served quickly.
 */
export const useImageCache = (src: string | undefined) => {
    const [cachedSrc, setCachedSrc] = useState<string | undefined>(undefined);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!src) {
            setLoading(false);
            return;
        }

        const fetchAndCache = async () => {
            try {
                const cache = await caches.open(CACHE_NAME);
                const cachedResponse = await cache.match(src);

                if (cachedResponse) {
                    const blob = await cachedResponse.blob();
                    setCachedSrc(URL.createObjectURL(blob));
                    setLoading(false);
                    return;
                }

                // If not in cache, fetch and store
                const response = await fetch(src);
                if (!response.ok) throw new Error('Failed to fetch image');

                // Clone response because it can only be consumed once
                const responseToCache = response.clone();
                await cache.put(src, responseToCache);

                const blob = await response.blob();
                setCachedSrc(URL.createObjectURL(blob));
            } catch (err: any) {
                console.error('Image caching error:', err);
                setError(err.message);
                // Fallback to original src if caching fails
                setCachedSrc(src);
            } finally {
                setLoading(false);
            }
        };

        fetchAndCache();

        // Cleanup: revoke object URL to prevent memory leaks
        return () => {
            if (cachedSrc && cachedSrc.startsWith('blob:')) {
                URL.revokeObjectURL(cachedSrc);
            }
        };
    }, [src]);

    return { cachedSrc, loading, error };
};

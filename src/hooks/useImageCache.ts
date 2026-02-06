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

                // Not in cache:
                // 1. Immediately allow using the original src (non-blocking)
                // We do this by NOT setting cachedSrc yet, but setting loading to false
                setLoading(false);

                // 2. Fetch and cache in background for NEXT time
                const response = await fetch(src);
                if (!response.ok) throw new Error('Failed to fetch image');

                const responseToCache = response.clone();
                await cache.put(src, responseToCache);

                // Optional: We could switch to the cached blob now, but there's no need 
                // if the browser already loaded the original src.
                // We'll just leave it for the next mount.
            } catch (err: any) {
                console.warn('Background image caching failed:', err);
                setError(err.message);
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

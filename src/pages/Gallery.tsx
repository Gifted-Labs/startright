import { useEffect, useState } from 'react';
import { eventService } from '../services/eventService';
// import type { GalleryItem } from '../types'; 
import { GalleryHero } from '../components/gallery/GalleryHero';
import { GalleryGrid } from '../components/gallery/GalleryGrid';
import { GalleryLoader } from '../components/gallery/GalleryLoader';
import { ContactCTA } from '../components/common/ContactCTA';

const Gallery = () => {
    // Ideally fetch simplified list of strings (image URLs)
    const [images, setImages] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGallery = async () => {
            try {
                const pastEvents = await eventService.getPastEvents(0, 1);
                if (pastEvents.content.length > 0) {
                    const galleryData = await eventService.getEventGallery(pastEvents.content[0].id);
                    // Map complex GalleryItem[] to simple string[] for the Grid component
                    // Assuming GalleryItem has 'url' or similar. 
                    const urls = galleryData.items?.map((item: any) => item.url || item.imageUrl || item) || [];
                    setImages(urls);
                }
            } catch (error) {
                console.error("Failed to load gallery", error);
            } finally {
                setLoading(false);
            }
        };
        fetchGallery();
    }, []);

    return (
        <div className="bg-white min-h-screen">
            <GalleryHero />

            {loading ? (
                <GalleryLoader />
            ) : (
                <GalleryGrid items={images} />
            )}

            <div className="bg-dark-950 py-12">
                <ContactCTA />
            </div>
        </div>
    );
};

export default Gallery;

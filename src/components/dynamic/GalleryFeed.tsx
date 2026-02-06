import type { GalleryItem } from '../../types';
import { useState } from 'react';
import { HiPlay } from 'react-icons/hi';
import { CachedImage } from '../common/CachedImage';

interface GalleryFeedProps {
    items: GalleryItem[];
}

export const GalleryFeed = ({ items }: GalleryFeedProps) => {
    const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

    if (!items || items.length === 0) return null;

    // Simple grid approach instead of complex masonry for stability without extra libs
    return (
        <section className="py-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Event Gallery</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px]">
                {items.map((item, index) => {
                    // Make some items span 2 rows/cols for visual interest
                    const isLarge = index % 5 === 0;
                    const isMedium = index % 3 === 0;

                    return (
                        <div
                            key={item.id || index}
                            className={`relative rounded-xl overflow-hidden cursor-pointer group bg-gray-100 ${isLarge ? 'col-span-2 row-span-2' : isMedium ? 'col-span-1 row-span-2' : ''}`}
                            onClick={() => setSelectedItem(item)}
                        >
                            {item.type === 'VIDEO' && (
                                <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                                    <div className="bg-white/30 backdrop-blur-md rounded-full p-3 group-hover:scale-110 transition-transform">
                                        <HiPlay className="w-8 h-8 text-white" />
                                    </div>
                                </div>
                            )}
                            <CachedImage
                                src={item.mediaUrl}
                                alt={item.caption || 'Event media'}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                loading="lazy"
                            />
                            {item.caption && (
                                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                                    <p className="text-white text-xs font-medium truncate">{item.caption}</p>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {selectedItem && (
                <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4" onClick={() => setSelectedItem(null)}>
                    <div className="relative max-w-5xl max-h-[90vh] w-full">
                        {selectedItem.type === 'VIDEO' ? (
                            <div className="aspect-video bg-black">
                                <video src={selectedItem.mediaUrl} controls autoPlay className="w-full h-full" />
                            </div>
                        ) : (
                            <CachedImage src={selectedItem.mediaUrl} alt={selectedItem.caption || ''} className="w-full h-full object-contain max-h-[90vh]" />
                        )}
                        <p className="text-white text-center mt-4 text-lg font-light">{selectedItem.caption}</p>
                    </div>
                </div>
            )}
        </section>
    );
};

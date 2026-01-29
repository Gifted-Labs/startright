import React from 'react';

export const GalleryLoader: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-gray-200 border-t-primary-500 rounded-full animate-spin mb-4" />
            <p className="text-gray-500 font-medium text-sm tracking-wider uppercase">Loading..</p>
        </div>
    );
};

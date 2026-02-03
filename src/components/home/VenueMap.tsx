import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in Leaflet when used with Webpack/Vite
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const UCC_COORDS: [number, number] = [5.1201358, -1.2938869];

export const VenueMap: React.FC = () => {
    return (
        <div className="w-full h-full relative group">
            <MapContainer
                center={UCC_COORDS}
                zoom={15}
                scrollWheelZoom={false}
                zoomControl={false} // We can hide zoom control to keep it clean as a background
                style={{ height: '100%', width: '100%', zIndex: 0 }}
                attributionControl={false}
            >
                {/* CartoDB Positron - Light and Minimalist */}
                <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                />
            </MapContainer>

            {/* Subtle Texture Overlay for aesthetic consistency */}
            <div className="absolute inset-0 z-[1] bg-white/10 pointer-events-none"></div>
        </div>
    );
};

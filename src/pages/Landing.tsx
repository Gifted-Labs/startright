import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { WelcomeSection } from '../components/home/WelcomeSection';
import { GalleryStrip } from '../components/home/GalleryStrip';
import { FlyersSection } from '../components/home/FlyersSection';
import { AgendaSection } from '../components/home/AgendaSection';
import { SpeakersSection } from '../components/home/SpeakersSection';
import { TicketCTASection } from '../components/home/TicketCTASection';
import { VenueSection } from '../components/home/VenueSection';
import { TShirtSection } from '../components/home/TShirtSection';
import { EventsPreviewSection } from '../components/home/EventsPreviewSection';
import { RegistrationGuide } from '../components/home/RegistrationGuide';
import { FeaturedArticlesSection } from '../components/home/FeaturedArticlesSection';

const Landing: React.FC = () => {
    return (
        <div className="min-h-screen">
            <HeroSection />
            <EventsPreviewSection />
            <WelcomeSection />
            <RegistrationGuide />
            <FlyersSection />
            <GalleryStrip />
            <AgendaSection />
            <SpeakersSection />
            <TShirtSection />
            <FeaturedArticlesSection />
            <TicketCTASection />
            <VenueSection />
        </div>
    );
};

export default Landing;

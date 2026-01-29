import React from 'react';
import { AboutHero } from '../components/about/AboutHero';
import { AboutInfoSection } from '../components/about/AboutInfoSection';
import { AboutNewsletterSection } from '../components/about/AboutNewsletterSection';
import { AboutStatsSection } from '../components/about/AboutStatsSection';
import { AboutHistorySection } from '../components/about/AboutHistorySection';
import { AboutSponsorsSection } from '../components/about/AboutSponsorsSection';
import { AboutTeamSkillsSection } from '../components/about/AboutTeamSkillsSection';
import { AboutProcessSection } from '../components/about/AboutProcessSection';
import { ContactCTA } from '../components/common/ContactCTA';

const AboutUs: React.FC = () => {
    return (
        <div className="min-h-screen bg-white">
            <AboutHero />
            <AboutInfoSection />
            <AboutNewsletterSection />
            <AboutStatsSection />
            <AboutHistorySection />
            <AboutSponsorsSection />
            <AboutTeamSkillsSection />
            <AboutProcessSection />
            <div className="py-12 bg-dark-950">
                {/* Reusing existing CTA but adding a background wrapper if needed for visual break */}
                <ContactCTA />
            </div>
        </div>
    );
};

export default AboutUs;

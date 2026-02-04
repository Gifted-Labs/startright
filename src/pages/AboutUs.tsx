import React from 'react';
import { PageHero } from '../components/common/PageHero';
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
        <div className="min-h-screen bg-white text-gray-900">
            <PageHero
                title="ABOUT US"
                subtitle="Get to know the team behind Start Right."
                backgroundImage="/images/about_hero.jpg"
                breadcrumbs={[
                    { label: 'About Us' }
                ]}
            />
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

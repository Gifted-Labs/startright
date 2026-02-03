import { BrandStory } from '../components/static/BrandStory';
import { VisionMission } from '../components/static/VisionMission';
import { StaticValues } from '../components/static/StaticValues';
import { PartnersGrid } from '../components/static/PartnersGrid';
import { StaticTestimonials } from '../components/static/StaticTestimonials';
import { PageHero } from '../components/common/PageHero';

const About = () => {
    return (
        <div className="bg-white min-h-screen">
            <PageHero
                title="ABOUT US"
                subtitle="Building Tomorrow's Engineers Today. Discover our mission to foster robotics education, innovation, and STEAM skills across Ghana."
                backgroundImage="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1950&q=80"
                breadcrumbs={[
                    { label: 'Home', path: '/' },
                    { label: 'About' }
                ]}
            />

            <VisionMission />
            <BrandStory />
            <StaticValues />
            <StaticTestimonials />
            <PartnersGrid />
        </div>
    );
};

export default About;

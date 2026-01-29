import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/common/Button';
import { HiUserGroup, HiSparkles, HiAcademicCap, HiArrowRight } from 'react-icons/hi';
import { PageHero } from '../components/common/PageHero';
import { eventService } from '../services/eventService';
import type { Event } from '../types';

const GetInvolved = () => {
    const navigate = useNavigate();
    const [upcomingEvent, setUpcomingEvent] = useState<Event | null>(null);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const data = await eventService.getUpcomingEvents(0, 1);
                if (data.content.length > 0) {
                    setUpcomingEvent(data.content[0]);
                }
            } catch (err) {
                console.error(err);
            }
        };
        fetchEvent();
    }, []);

    const involvementOptions = [
        {
            title: "Volunteer",
            description: "Join our team of dedicated volunteers and help run world-class events. From logistics to mentorship, there's a role for everyone.",
            icon: HiUserGroup,
            cta: "Apply to Volunteer",
            onClick: () => upcomingEvent ? navigate(`/volunteer/apply/${upcomingEvent.id}`) : navigate('/events')
        },
        {
            title: "Become a Sponsor",
            description: "Partner with us to empower the next generation of innovators. Gain visibility while making a lasting impact on STEAM education.",
            icon: HiSparkles,
            cta: "Sponsor Opportunities",
            onClick: () => upcomingEvent ? navigate(`/sponsor/apply/${upcomingEvent.id}`) : navigate('/events')
        },
        {
            title: "Participate",
            description: "Register your team for our upcoming competition. Students from all backgrounds are welcome to showcase their skills.",
            icon: HiAcademicCap,
            cta: "Register Your Team",
            onClick: () => upcomingEvent ? navigate(`/events/${upcomingEvent.id}/register`) : navigate('/events')
        }
    ];

    return (
        <div className="bg-white min-h-screen">
            <PageHero
                titleWhite="GET"
                titleAccent="INVOLVED"
                subtitle="Be part of the movement. Whether you're a student, professional, or organization, there's a place for you to make an impact."
            />

            {/* Options Grid */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {involvementOptions.map((option, index) => (
                            <div
                                key={index}
                                className="bg-white p-8 rounded-3xl border border-gray-100 hover:shadow-2xl transition-all duration-500 flex flex-col group relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 w-24 h-24 bg-primary-500/5 rounded-bl-full group-hover:bg-primary-500/10 transition-colors"></div>

                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-100 text-primary-600 mb-8 group-hover:scale-110 transition-transform duration-300">
                                    <option.icon className="w-8 h-8" />
                                </div>
                                <h3 className="text-2xl font-black text-secondary-900 mb-4">{option.title}</h3>
                                <p className="text-gray-600 mb-8 flex-grow leading-relaxed">{option.description}</p>

                                <Button
                                    onClick={option.onClick}
                                    className="w-full flex items-center justify-center gap-2 group/btn"
                                >
                                    {option.cta}
                                    <HiArrowRight className="group-hover/btn:translate-x-1 transition-transform" />
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="py-20 bg-white border-t border-gray-100">
                <div className="container mx-auto px-4 md:px-6 text-center">
                    <div className="max-w-2xl mx-auto">
                        <h2 className="text-3xl font-black text-secondary-900 mb-4">Have Questions?</h2>
                        <p className="text-gray-600 mb-8 text-lg">
                            Reach out to our team for more information about partnership opportunities or participation guidelines.
                        </p>
                        <a
                            href="mailto:info@merbsconnect.com"
                            className="inline-flex items-center gap-2 text-primary-600 font-bold hover:text-primary-700 text-xl group"
                        >
                            info@merbsconnect.com
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default GetInvolved;

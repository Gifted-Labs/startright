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
            description: "Partner with us to empower the next generation of innovators. Gain visibility while making a lasting impact on education.",
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
                title="CONTACT US"
                subtitle="Get in touch with the StartRight team"
                backgroundImage="https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                breadcrumbs={[
                    { label: 'Contact' }
                ]}
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
                <div className="container mx-auto px-4 md:px-6">
                    <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden flex flex-col md:flex-row">
                        <div className="p-10 md:w-1/2 bg-primary-600 text-white flex flex-col justify-between">
                            <div>
                                <h3 className="text-2xl font-bold mb-4">Get In Touch</h3>
                                <p className="text-primary-100 mb-8">
                                    Have specific questions? Fill out the form and our team will get back to you within 24 hours.
                                </p>
                                
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-primary-500/50 flex items-center justify-center">
                                            <span className="text-lg">📧</span>
                                        </div>
                                        <div>
                                            <p className="text-xs text-primary-200 uppercase font-bold tracking-wider">Email Us</p>
                                            <a href="mailto:merbsconnect@gmail.com" className="font-semibold hover:text-white transition-colors">merbsconnect@gmail.com</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="mt-12">
                                <p className="text-sm text-primary-200">© 2026 Start Right Conference</p>
                            </div>
                        </div>

                        <div className="p-10 md:w-1/2">
                            <form className="space-y-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Name</label>
                                    <input 
                                        type="text" 
                                        placeholder="Your Name"
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 outline-none transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
                                    <input 
                                        type="email" 
                                        placeholder="your@email.com"
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 outline-none transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Message</label>
                                    <textarea 
                                        rows={4}
                                        placeholder="How can we help?"
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 outline-none transition-all"
                                    ></textarea>
                                </div>
                                <Button className="w-full py-3 font-bold">Send Message</Button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default GetInvolved;

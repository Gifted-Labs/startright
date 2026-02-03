import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { eventService } from '../services/eventService';
import { Button } from '../components/common/Button';
import { PageHero } from '../components/common/PageHero';
import { HiCheckCircle, HiArrowLeft } from 'react-icons/hi';
import type { Event } from '../types';

const VolunteerApply = () => {
    const { eventId } = useParams();
    const navigate = useNavigate();
    const [event, setEvent] = useState<Event | null>(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        areaOfInterest: '',
        motivation: ''
    });

    useEffect(() => {
        const fetchEvent = async () => {
            if (!eventId) return;
            try {
                const data = await eventService.getEventById(eventId);
                setEvent(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchEvent();
    }, [eventId]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setError(null);

        try {
            await eventService.applyToVolunteer({ ...formData, eventId: Number(eventId) });
            setSuccess(true);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Submission failed. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center py-20 px-4">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-white p-10 rounded-3xl shadow-xl max-w-lg w-full text-center border border-primary-100"
                >
                    <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <HiCheckCircle size={40} />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Application Sent!</h2>
                    <p className="text-gray-600 mb-8 text-lg">
                        Thank you for your interest in volunteering. Our team will review your application and get back to you soon.
                    </p>
                    <Button onClick={() => navigate('/get-involved')} variant="outline" className="w-full">
                        Return to Get Involved
                    </Button>
                </motion.div>
            </div>
        );
    }

    if (loading) {
        return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="animate-pulse text-gray-500 font-medium">Loading event details...</div>
        </div>;
    }

    return (
        <div className="bg-gray-50 min-h-screen pb-20">
            <PageHero
                title="BECOME A VOLUNTEER"
                subtitle="Join our team of dedicated changemakers. Help us build the future of robotics in Ghana."
                backgroundImage="https://images.unsplash.com/photo-1559027615-cd937c9be55a?auto=format&fit=crop&w=1950&q=80"
                breadcrumbs={[
                    { label: 'Home', path: '/' },
                    { label: 'Get Involved', path: '/get-involved' },
                    { label: 'Volunteer' }
                ]}
            />

            <div className="container mx-auto px-4 md:px-6 -mt-10 relative z-10">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Info Sidebar */}
                    <div className="lg:w-1/3 space-y-6">
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Why Volunteer?</h3>
                            <ul className="space-y-4">
                                <li className="flex gap-3 text-gray-600">
                                    <span className="text-primary-500 font-bold">•</span>
                                    <span>Gain hands-on experience in event management and tech logistics.</span>
                                </li>
                                <li className="flex gap-3 text-gray-600">
                                    <span className="text-primary-500 font-bold">•</span>
                                    <span>Network with industry leaders and educators in STEAM.</span>
                                </li>
                                <li className="flex gap-3 text-gray-600">
                                    <span className="text-primary-500 font-bold">•</span>
                                    <span>Get official certification and GRC branded merchandise.</span>
                                </li>
                            </ul>
                        </div>
                        <Button
                            variant="ghost"
                            onClick={() => navigate('/get-involved')}
                            className="flex items-center gap-2 text-gray-500 hover:text-primary-600"
                        >
                            <HiArrowLeft /> Back to Get Involved
                        </Button>
                    </div>

                    {/* Form Component */}
                    <div className="lg:w-2/3">
                        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-lg border border-gray-100">
                            {event && (
                                <div className="mb-8 p-4 bg-primary-50 rounded-xl border border-primary-100">
                                    <p className="text-sm text-primary-800 font-medium">Applying for:</p>
                                    <p className="text-lg font-bold text-gray-900">{event.title}</p>
                                </div>
                            )}

                            {error && (
                                <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg border border-red-100">
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                                        <input
                                            required
                                            type="text"
                                            name="fullName"
                                            value={formData.fullName}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 outline-none transition-all"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                                        <input
                                            required
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 outline-none transition-all"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                                        <input
                                            required
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 outline-none transition-all"
                                            placeholder="+233..."
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Area of Interest</label>
                                        <select
                                            required
                                            name="areaOfInterest"
                                            value={formData.areaOfInterest}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 outline-none transition-all"
                                        >
                                            <option value="">Select an area</option>
                                            <option value="Tech Support">Tech & Infrastructure</option>
                                            <option value="Logistics">Logistics & Venue</option>
                                            <option value="Mentorship">Student Mentorship</option>
                                            <option value="Hospitality">Guest Relations</option>
                                            <option value="Media">Photography & Media</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Why do you want to volunteer? (Motivation)</label>
                                    <textarea
                                        required
                                        name="motivation"
                                        value={formData.motivation}
                                        onChange={handleChange}
                                        rows={4}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 outline-none transition-all"
                                        placeholder="Tell us about your skills and why you'd like to join our team..."
                                    ></textarea>
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full py-4 text-lg font-bold shadow-xl shadow-primary-500/20"
                                    isLoading={submitting}
                                >
                                    Submit Application
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VolunteerApply;

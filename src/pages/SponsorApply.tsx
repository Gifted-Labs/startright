import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { eventService } from '../services/eventService';
import { Button } from '../components/common/Button';
import { PageHero } from '../components/common/PageHero';
import { HiBadgeCheck, HiArrowLeft } from 'react-icons/hi';
import type { Event } from '../types';

const SponsorApply = () => {
    const { eventId } = useParams();
    const navigate = useNavigate();
    const [event, setEvent] = useState<Event | null>(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        companyName: '',
        contactPerson: '',
        email: '',
        phone: '',
        sponsorshipLevel: '',
        message: ''
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
            await eventService.applyToSponsor({ ...formData, eventId: Number(eventId) });
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
                    <div className="w-20 h-20 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <HiBadgeCheck size={40} />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Partnership Requested</h2>
                    <p className="text-gray-600 mb-8 text-lg">
                        Thank you for your interest in sponsoring {event?.title}. Our partnership team will contact you shortly with the sponsorship prospectus.
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
                title="SPONSOR AN EVENT"
                subtitle="Partner with us to empower the next generation of innovators. Showcase your brand while making an impact."
                backgroundImage="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1950&q=80"
                breadcrumbs={[
                    { label: 'Home', path: '/' },
                    { label: 'Get Involved', path: '/get-involved' },
                    { label: 'Sponsor' }
                ]}
            />

            <div className="container mx-auto px-4 md:px-6 -mt-10 relative z-10">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Info Sidebar */}
                    <div className="lg:w-1/3 space-y-6">
                        <div className="bg-secondary-900 text-white p-8 rounded-2xl shadow-xl">
                            <h3 className="text-xl font-bold mb-4 text-primary-400">Visibility & Impact</h3>
                            <div className="space-y-6">
                                <div>
                                    <h4 className="font-bold mb-1">Brand Exposure</h4>
                                    <p className="text-sm text-gray-400">Reach thousands of students, educators, and industry professionals.</p>
                                </div>
                                <div>
                                    <h4 className="font-bold mb-1">Talent Pipeline</h4>
                                    <p className="text-sm text-gray-400">Connect with the top technical talent emerging from Ghana's universities.</p>
                                </div>
                                <div>
                                    <h4 className="font-bold mb-1">Corporate Social Responsibility</h4>
                                    <p className="text-sm text-gray-400">Demonstrate your commitment to education and technological development.</p>
                                </div>
                            </div>
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
                        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-lg border border-gray-100 text-slate-900">
                            {event && (
                                <div className="mb-8 p-4 bg-gray-50 rounded-xl border border-gray-100">
                                    <p className="text-sm text-gray-500 font-medium tracking-wide uppercase">Sponsoring:</p>
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
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Company Name</label>
                                        <input
                                            required
                                            type="text"
                                            name="companyName"
                                            value={formData.companyName}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 outline-none transition-all"
                                            placeholder="Your Organization"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Contact Person</label>
                                        <input
                                            required
                                            type="text"
                                            name="contactPerson"
                                            value={formData.contactPerson}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 outline-none transition-all"
                                            placeholder="Full Name"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Official Email</label>
                                        <input
                                            required
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 outline-none transition-all"
                                            placeholder="partnerships@company.com"
                                        />
                                    </div>
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
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Sponsorship Level of Interest</label>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        {['Platinum', 'Gold', 'Silver', 'Bronze'].map(level => (
                                            <label
                                                key={level}
                                                className={`
                                                    cursor-pointer p-3 rounded-xl border-2 text-center text-sm font-bold transition-all
                                                    ${formData.sponsorshipLevel === level
                                                        ? 'border-primary-500 bg-primary-50 text-primary-700 shadow-inner'
                                                        : 'border-gray-100 bg-white text-gray-500 hover:border-gray-200'}
                                                `}
                                            >
                                                <input
                                                    type="radio"
                                                    name="sponsorshipLevel"
                                                    value={level}
                                                    checked={formData.sponsorshipLevel === level}
                                                    onChange={handleChange}
                                                    className="hidden"
                                                />
                                                {level}
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Additional Message / Inquiry</label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows={4}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 outline-none transition-all"
                                        placeholder="Tell us about your sponsorship goals or ask a question..."
                                    ></textarea>
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full py-4 text-lg font-bold shadow-xl shadow-primary-500/20"
                                    isLoading={submitting}
                                >
                                    Submit Sponsorship Request
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SponsorApply;

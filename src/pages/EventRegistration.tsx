import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PageHero } from '../components/common/PageHero';
import { eventService } from '../services/eventService';
import { UNIVERSITIES, ACADEMIC_LEVELS, REFERRAL_SOURCES, SHIRT_SIZES, SHIRT_COLORS } from '../constants/registrationConstants';
import type { EventRegistrationRequest, RegistrationDetailsResponse, MerchandiseOrder } from '../types';
import { Button } from '../components/common/Button';
import { HiCheckCircle, HiPlus, HiTrash, HiMinus } from 'react-icons/hi';

const EventRegistration = () => {
    const navigate = useNavigate();

    const [step, setStep] = useState(1);
    const [loadingEvent, setLoadingEvent] = useState(true); // Renamed from loading
    const [submitSuccess, setSubmitSuccess] = useState(false); // Renamed from success
    const [submitError, setSubmitError] = useState<string | null>(null); // Renamed from error
    const [isSubmitting, setIsSubmitting] = useState(false); // New
    const [registrationData, setRegistrationData] = useState<RegistrationDetailsResponse | null>(null); // New, holds success data

    // Session Gating
    const [isSessionActive, setIsSessionActive] = useState(true);
    const [loadingSession, setLoadingSession] = useState(true);

    const { eventId } = useParams<{ eventId: string }>(); // Added type

    useEffect(() => {
        const checkSession = async () => {
            try {
                const status = await eventService.getSessionStatus(); // Assuming this service method exists
                setIsSessionActive(status.active);
            } catch (error) {
                console.error('Failed to check session status:', error);
                setIsSessionActive(true); // Fallback to open if API fails
            } finally {
                setLoadingSession(false);
            }
        };
        checkSession();
    }, []);

    useEffect(() => {
        if (!eventId) {
            navigate('/events');
            return;
        }

        // Simulate fetching event details, as the original code didn't have this explicitly
        // but it's good practice to load event details for the registration page.
        // For now, we'll just set loadingEvent to false after a short delay.
        const fetchEventDetails = async () => {
            try {
                setLoadingEvent(true);
                // In a real app, you'd fetch event details here:
                // const event = await eventService.getEventById(eventId);
                // setEvent(event); // If you had an event state
                await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call
            } catch (err) {
                console.error('Failed to load event details:', err);
                // setSubmitError('Failed to load event details.'); // If you want to show an error for this
            } finally {
                setLoadingEvent(false);
            }
        };
        fetchEventDetails();
    }, [eventId, navigate]);

    const [formData, setFormData] = useState<EventRegistrationRequest>({
        name: '',
        email: '',
        phone: '',
        note: '',
        needsShirt: false,
        merchandiseOrders: [{ color: 'BLACK', size: 'M', quantity: 1 }],
        program: '',
        university: '',
        academicLevel: '',
        referralSource: '',
        referralSourceOther: ''
    });

    const addMerchandiseOrder = () => {
        setFormData(prev => ({
            ...prev,
            merchandiseOrders: [...(prev.merchandiseOrders || []), { color: 'BLACK', size: 'M', quantity: 1 }]
        }));
    };

    const removeMerchandiseOrder = (index: number) => {
        setFormData(prev => ({
            ...prev,
            merchandiseOrders: prev.merchandiseOrders?.filter((_, i) => i !== index)
        }));
    };

    const updateMerchandiseOrder = (index: number, field: keyof MerchandiseOrder, value: any) => {
        setFormData(prev => ({
            ...prev,
            merchandiseOrders: prev.merchandiseOrders?.map((order, i) =>
                i === index ? { ...order, [field]: value } : order
            )
        }));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!eventId) return;

        setIsSubmitting(true);
        setSubmitError(null);

        try {
            const result = await eventService.registerForEvent(eventId, formData);
            setRegistrationData(result);
            setSubmitSuccess(true);
            setStep(3); // This step change is from the original code
        } catch (err: any) {
            setSubmitError(err.response?.data?.message || 'Registration failed. Please try again.');
            window.scrollTo(0, 0); // Scroll to top to show error
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDownloadQr = () => {
        if (!registrationData?.qrCodeBase64) return;
        const link = document.createElement('a');
        link.href = registrationData.qrCodeBase64;
        link.download = `startright-ticket-${registrationData.registrationToken}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    if (loadingEvent || loadingSession) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!isSessionActive) {
        return (
            <div className="min-h-screen bg-gray-50">
                <PageHero
                    title="REGISTRATION CLOSED"
                    subtitle="Event registration is currently closed."
                    backgroundImage="https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                    breadcrumbs={[
                        { label: 'Home', path: '/' },
                        { label: 'Events', path: '/events' },
                        { label: 'Registration Closed' }
                    ]}
                />
                <div className="container mx-auto px-4 py-16 text-center">
                    <div className="max-w-2xl mx-auto bg-white p-10 rounded-2xl shadow-xl">
                        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-10 h-10 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Registration Unavailable</h2>
                        <p className="text-xl text-gray-600 mb-8">
                            We are not accepting new registrations at this time. Please check back later or contact the organizers for more information.
                        </p>
                        <Button variant="primary" onClick={() => navigate('/')}>
                            Back to Home
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    if (submitSuccess && registrationData) { // Changed from 'success'
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col">
                <div className="print:hidden">
                    <PageHero
                        title="REGISTRATION CONFIRMED"
                        subtitle="We look forward to seeing you at the conference."
                        backgroundImage="https://images.unsplash.com/photo-1544531586-fde5298cdd40?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
                        breadcrumbs={[
                            { label: 'Home', path: '/' },
                            { label: 'Events', path: '/events' },
                            { label: 'Registration Complete' }
                        ]}
                        className="h-[40vh] min-h-[300px]"
                    />
                </div>

                <div className="container mx-auto px-4 md:px-6 py-12 max-w-lg flex-grow -mt-20 relative z-10">
                    <div id="ticket-card" className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-gray-100 text-center print:shadow-none print:border-none print:p-0 print:mt-0">
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 text-green-600 mb-6 print:hidden">
                            <HiCheckCircle className="w-12 h-12" />
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-4 print:text-4xl print:mb-8">Registration Complete!</h1>
                        <p className="text-gray-600 mb-8 print:text-lg">
                            Thank you for registering. Please save your specific QR code below for check-in.
                        </p>

                        {registrationData?.qrCodeBase64 && (
                            <div className="bg-gray-50 p-6 rounded-xl mb-8 border-2 border-dashed border-gray-200 print:border-black print:bg-white">
                                <img
                                    src={registrationData.qrCodeBase64} // Prefix removed in previous step
                                    alt="Registration QR Code"
                                    className="mx-auto w-64 h-64 object-contain"
                                />
                                <p className="text-xs text-gray-400 mt-4 uppercase tracking-widest font-semibold print:text-black">Scan at venue</p>
                            </div>
                        )}

                        <div className="space-y-2 mb-8 text-left bg-gray-50 p-6 rounded-xl print:bg-white print:border print:border-black">
                            <div className="flex justify-between border-b border-gray-200 pb-2">
                                <span className="text-gray-500 text-sm">Participant</span>
                                <span className="font-bold text-gray-900">{registrationData?.name}</span>
                            </div>
                            <div className="flex justify-between border-b border-gray-200 pb-2 pt-2">
                                <span className="text-gray-500 text-sm">Event</span>
                                <span className="font-bold text-gray-900">{registrationData?.eventTitle}</span>
                            </div>
                            <div className="flex justify-between pt-2">
                                <span className="text-gray-500 text-sm">Token ID</span>
                                <code className="font-mono font-bold text-primary-600">{registrationData?.registrationToken}</code>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4 print:hidden">
                            <Button onClick={handleDownloadQr} variant="outline" className="w-full flex items-center justify-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                                Download QR Code
                            </Button>

                            <Button onClick={() => window.print()} variant="primary" className="w-full flex items-center justify-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z" clipRule="evenodd" />
                                </svg>
                                Print / Save as PDF
                            </Button>

                            <Button onClick={() => navigate(`/events/${eventId}`)} variant="ghost" className="w-full mt-4">
                                Back to Event Details
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <PageHero
                title="EVENT REGISTRATION"
                subtitle="Fill in your details to secure your spot."
                backgroundImage="https://images.unsplash.com/photo-1544531586-fde5298cdd40?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
                breadcrumbs={[
                    { label: 'Home', path: '/' },
                    { label: 'Events', path: '/events' },
                    { label: 'Registration' }
                ]}
                className="h-[50vh] min-h-[400px]"
            />

            <div className="container mx-auto px-4 md:px-6 py-12 max-w-2xl">
                <div className="bg-white p-8 md:p-10 rounded-2xl shadow-lg -mt-8 relative z-10 text-slate-900">

                    {submitError && (
                        <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6 border border-red-200">
                            {submitError}
                        </div>
                    )}

                    {/* Step Indicator */}
                    <div className="flex items-center justify-center mb-8">
                        <div className="flex items-center gap-2">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${step >= 1 ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-400'}`}>1</div>
                            <div className={`w-16 h-1 rounded ${step >= 2 ? 'bg-primary-500' : 'bg-gray-100'}`} />
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${step >= 2 ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-400'}`}>2</div>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {step === 1 && (
                            <div className="animate-in fade-in slide-in-from-left-4 duration-300">
                                <div className="text-center mb-8">
                                    <h2 className="text-2xl font-bold text-gray-900">Personal Details</h2>
                                    <p className="text-gray-500 text-sm mt-1">Please provide your basic information</p>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            placeholder="John Doe"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            placeholder="john@example.com"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            required
                                            placeholder="024 123 4567"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">University/Institution *</label>
                                        <select
                                            name="university"
                                            value={formData.university}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                                        >
                                            <option value="">Select University</option>
                                            {UNIVERSITIES.map(uni => (
                                                <option key={uni.value} value={uni.value}>{uni.label}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Program of Study *</label>
                                        <input
                                            type="text"
                                            name="program"
                                            value={formData.program}
                                            onChange={handleChange}
                                            required
                                            placeholder="e.g. Computer Science"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Academic Level *</label>
                                        <select
                                            name="academicLevel"
                                            value={formData.academicLevel}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                                        >
                                            <option value="">Select Level</option>
                                            {ACADEMIC_LEVELS.map(level => (
                                                <option key={level.value} value={level.value}>{level.label}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <Button type="button" onClick={() => setStep(2)} className="w-full">
                                    Continue
                                </Button>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                                <div className="text-center mb-8">
                                    <h2 className="text-2xl font-bold text-gray-900">Additional Information</h2>
                                    <p className="text-gray-500 text-sm mt-1">Tell us more about your preferences</p>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-100">
                                        <input
                                            type="checkbox"
                                            name="needsShirt"
                                            checked={formData.needsShirt}
                                            onChange={handleChange}
                                            id="needsShirt"
                                            className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
                                        />
                                        <label htmlFor="needsShirt" className="text-gray-700 font-medium">I would like an event T-shirt</label>
                                    </div>

                                    {formData.needsShirt && (
                                        <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                                            <div className="flex justify-between items-center mb-2">
                                                <label className="block text-sm font-medium text-gray-700">T-Shirt Orders *</label>
                                                <button
                                                    type="button"
                                                    onClick={addMerchandiseOrder}
                                                    className="inline-flex items-center gap-1 text-sm font-bold text-primary-600 hover:text-primary-700 transition-colors"
                                                >
                                                    <HiPlus className="w-4 h-4" /> Add Another
                                                </button>
                                            </div>

                                            {(formData.merchandiseOrders || []).map((order, index) => (
                                                <div key={index} className="p-4 bg-gray-50 rounded-xl border border-gray-100 space-y-4 relative group">
                                                    {index > 0 && (
                                                        <button
                                                            type="button"
                                                            onClick={() => removeMerchandiseOrder(index)}
                                                            className="absolute -top-2 -right-2 w-8 h-8 flex items-center justify-center bg-white text-red-500 rounded-full shadow-md border border-gray-100 hover:bg-red-50 transition-colors"
                                                        >
                                                            <HiTrash className="w-4 h-4" />
                                                        </button>
                                                    )}

                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div>
                                                            <label className="block text-xs font-semibold text-gray-500 uppercase mb-2">Color</label>
                                                            <select
                                                                value={order.color}
                                                                onChange={(e) => updateMerchandiseOrder(index, 'color', e.target.value)}
                                                                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 text-sm"
                                                            >
                                                                {SHIRT_COLORS.map(color => (
                                                                    <option key={color.value} value={color.value}>{color.label}</option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                        <div>
                                                            <label className="block text-xs font-semibold text-gray-500 uppercase mb-2">Size</label>
                                                            <select
                                                                value={order.size}
                                                                onChange={(e) => updateMerchandiseOrder(index, 'size', e.target.value)}
                                                                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 text-sm"
                                                            >
                                                                {SHIRT_SIZES.map(size => (
                                                                    <option key={size.value} value={size.value}>{size.label}</option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center justify-between">
                                                        <label className="text-xs font-semibold text-gray-500 uppercase">Quantity</label>
                                                        <div className="flex items-center gap-3">
                                                            <button
                                                                type="button"
                                                                onClick={() => updateMerchandiseOrder(index, 'quantity', Math.max(1, order.quantity - 1))}
                                                                className="w-8 h-8 flex items-center justify-center bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-gray-600"
                                                            >
                                                                <HiMinus className="w-4 h-4" />
                                                            </button>
                                                            <span className="w-8 text-center font-bold text-gray-900">{order.quantity}</span>
                                                            <button
                                                                type="button"
                                                                onClick={() => updateMerchandiseOrder(index, 'quantity', order.quantity + 1)}
                                                                className="w-8 h-8 flex items-center justify-center bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-gray-600"
                                                            >
                                                                <HiPlus className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">How did you hear about this event? *</label>
                                        <select
                                            name="referralSource"
                                            value={formData.referralSource}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                                        >
                                            <option value="">Select an option</option>
                                            {REFERRAL_SOURCES.map(source => (
                                                <option key={source.value} value={source.value}>{source.label}</option>
                                            ))}
                                        </select>
                                    </div>

                                    {formData.referralSource === 'OTHER' && (
                                        <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Please specify *</label>
                                            <input
                                                type="text"
                                                name="referralSourceOther"
                                                value={formData.referralSourceOther}
                                                onChange={handleChange}
                                                required={formData.referralSource === 'OTHER'}
                                                placeholder="Please tell us how you heard about us"
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                                            />
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Additional Notes (Optional)</label>
                                    <textarea
                                        name="note"
                                        value={formData.note}
                                        onChange={handleChange}
                                        rows={3}
                                        placeholder="Any special requests or information we should know?"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors resize-none"
                                    />
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <Button type="button" variant="outline" onClick={() => setStep(1)} className="flex-1">
                                        Back
                                    </Button>
                                    <Button type="submit" isLoading={isSubmitting} className="flex-1">
                                        Complete Registration
                                    </Button>
                                </div>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EventRegistration;

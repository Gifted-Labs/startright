import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PageHero } from '../components/common/PageHero';
import { eventService } from '../services/eventService';
import { UNIVERSITIES, ACADEMIC_LEVELS, REFERRAL_SOURCES, SHIRT_SIZES, SHIRT_COLORS } from '../constants/registrationConstants';
import type { EventRegistrationRequest, RegistrationDetailsResponse, MerchandiseOrder } from '../types';
import { Button } from '../components/common/Button';
import { HiCheckCircle, HiPlus, HiTrash, HiMinus } from 'react-icons/hi';

const EventRegistration = () => {
    const { eventId } = useParams();
    const navigate = useNavigate();

    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState<RegistrationDetailsResponse | null>(null);
    const [error, setError] = useState<string | null>(null);

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

        setLoading(true);
        setError(null);

        try {
            const result = await eventService.registerForEvent(eventId, formData);
            setSuccess(result);
            setStep(3);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen bg-gray-50 py-20">
                <div className="container mx-auto px-4 md:px-6 max-w-lg">
                    <div className="bg-white p-8 md:p-12 rounded-3xl shadow-lg border border-gray-100 text-slate-900 text-center">
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 text-green-600 mb-6">
                            <HiCheckCircle className="w-12 h-12" />
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">Registration Complete!</h1>
                        <p className="text-gray-600 mb-8">
                            Thank you for registering. Please save your QR code below for check-in.
                        </p>

                        {success.qrCodeBase64 && (
                            <div className="bg-gray-50 p-6 rounded-xl mb-6">
                                <img
                                    src={`data:image/png;base64,${success.qrCodeBase64}`}
                                    alt="Registration QR Code"
                                    className="mx-auto w-48 h-48"
                                />
                            </div>
                        )}

                        <p className="text-sm text-gray-500 mb-6">
                            Token: <code className="bg-gray-100 px-2 py-1 rounded">{success.registrationToken}</code>
                        </p>

                        <Button onClick={() => navigate(`/events/${eventId}`)} variant="outline" className="w-full">
                            Back to Event Details
                        </Button>
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

                    {error && (
                        <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6 border border-red-200">
                            {error}
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
                                    <Button type="submit" isLoading={loading} className="flex-1">
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

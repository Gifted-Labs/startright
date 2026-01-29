import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { eventService } from '../services/eventService';
import type { EventRegistrationRequest, RegistrationDetailsResponse } from '../types';
import { Button } from '../components/common/Button';
import { HiCheckCircle } from 'react-icons/hi';

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
        needsShirt: false,
        shirtSize: '',
        program: '',
        university: '',
        academicLevel: '',
        emergencyContactName: '',
        emergencyContactPhone: '',
        referralSource: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
                    <div className="bg-white p-10 rounded-2xl shadow-lg text-center">
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
            {/* Mini Hero for Registration */}
            <div className="bg-gradient-to-br from-secondary-950 via-secondary-900 to-secondary-950 py-16 text-center">
                <h1 className="text-3xl md:text-4xl font-black text-white mb-2">
                    EVENT <span className="text-primary-500">REGISTRATION</span>
                </h1>
                <p className="text-gray-400">Fill in your details to secure your spot.</p>
            </div>

            <div className="container mx-auto px-4 md:px-6 py-12 max-w-2xl">
                <div className="bg-white p-8 md:p-10 rounded-2xl shadow-lg -mt-8 relative z-10">

                    {error && (
                        <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6 border border-red-200">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {step === 1 && (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">University/School</label>
                                        <input
                                            type="text"
                                            name="university"
                                            value={formData.university}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Program/Course</label>
                                        <input
                                            type="text"
                                            name="program"
                                            value={formData.program}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                                        />
                                    </div>
                                </div>
                                <Button type="button" onClick={() => setStep(2)} className="w-full">
                                    Continue
                                </Button>
                            </>
                        )}

                        {step === 2 && (
                            <>
                                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                                    <input
                                        type="checkbox"
                                        name="needsShirt"
                                        checked={formData.needsShirt}
                                        onChange={handleChange}
                                        id="needsShirt"
                                        className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
                                    />
                                    <label htmlFor="needsShirt" className="text-gray-700">I would like an event T-shirt</label>
                                </div>

                                {formData.needsShirt && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Shirt Size</label>
                                        <select
                                            name="shirtSize"
                                            value={formData.shirtSize}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                                        >
                                            <option value="">Select size</option>
                                            <option value="S">Small</option>
                                            <option value="M">Medium</option>
                                            <option value="L">Large</option>
                                            <option value="XL">Extra Large</option>
                                            <option value="XXL">XXL</option>
                                        </select>
                                    </div>
                                )}

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Emergency Contact Name</label>
                                        <input
                                            type="text"
                                            name="emergencyContactName"
                                            value={formData.emergencyContactName}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Emergency Contact Phone</label>
                                        <input
                                            type="tel"
                                            name="emergencyContactPhone"
                                            value={formData.emergencyContactPhone}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">How did you hear about us?</label>
                                    <select
                                        name="referralSource"
                                        value={formData.referralSource}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                                    >
                                        <option value="">Select an option</option>
                                        <option value="social_media">Social Media</option>
                                        <option value="friend">Friend/Family</option>
                                        <option value="school">School/University</option>
                                        <option value="website">Website</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>

                                <div className="flex gap-4">
                                    <Button type="button" variant="outline" onClick={() => setStep(1)} className="flex-1">
                                        Back
                                    </Button>
                                    <Button type="submit" isLoading={loading} className="flex-1">
                                        Complete Registration
                                    </Button>
                                </div>
                            </>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EventRegistration;

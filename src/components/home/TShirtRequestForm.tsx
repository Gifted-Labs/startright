import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TShirtRequestFormProps {
    isOpen: boolean;
    onClose: () => void;
    initialColor?: 'Black' | 'White';
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.merbsconnect.com/api/v1';

export const TShirtRequestForm: React.FC<TShirtRequestFormProps> = ({ isOpen, onClose, initialColor = 'White' }) => {
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        tShirtColor: initialColor.toUpperCase() as 'BLACK' | 'WHITE',
        tShirtSize: 'L',
        quantity: 1
    });

    // Sync with parent component's color selection
    useEffect(() => {
        if (isOpen) {
            setFormData(prev => ({ ...prev, tShirtColor: initialColor.toUpperCase() as 'BLACK' | 'WHITE' }));
            setStatus('idle');
            setErrorMessage('');
        }
    }, [isOpen, initialColor]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');
        setErrorMessage('');

        try {
            const response = await fetch(`${API_BASE_URL}/tshirt-requests`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to submit request. Please try again.');
            }

            setStatus('success');
        } catch (error) {
            setStatus('error');
            setErrorMessage(error instanceof Error ? error.message : 'An unexpected error occurred. Please try again.');
        }
    };

    const handleClose = () => {
        setStatus('idle');
        setErrorMessage('');
        setFormData({
            fullName: '',
            email: '',
            phoneNumber: '',
            tShirtColor: initialColor.toUpperCase() as 'BLACK' | 'WHITE',
            tShirtSize: 'L',
            quantity: 1
        });
        onClose();
    };

    const shirtImages = {
        BLACK: '/images/shirt_black_both.png',
        WHITE: '/images/shirt_white_both.png',
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                        className="absolute inset-0 bg-gray-900/70 backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-4xl bg-white rounded-xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
                    >
                        {/* Close Button */}
                        <button
                            onClick={handleClose}
                            className="absolute top-4 right-4 p-2 rounded-lg bg-gray-100 text-gray-500 hover:text-gray-900 hover:bg-gray-200 transition-colors z-[110]"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {/* Success State */}
                        {status === 'success' ? (
                            <div className="p-12 text-center">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="max-w-md mx-auto"
                                >
                                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mx-auto mb-6">
                                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Order Received</h3>
                                    <p className="text-gray-600 mb-8 leading-relaxed">
                                        Your T-shirt request has been successfully submitted. You will receive payment details shortly to complete your order.
                                    </p>
                                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-8 text-left">
                                        <p className="text-sm text-gray-600 mb-2"><strong>Color:</strong> {formData.tShirtColor}</p>
                                        <p className="text-sm text-gray-600 mb-2"><strong>Size:</strong> {formData.tShirtSize}</p>
                                        <p className="text-sm text-gray-600"><strong>Quantity:</strong> {formData.quantity}</p>
                                    </div>
                                    <button
                                        onClick={handleClose}
                                        className="px-8 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors"
                                    >
                                        OK
                                    </button>
                                </motion.div>
                            </div>
                        ) : (
                            <div className="grid lg:grid-cols-5 gap-0">
                                {/* Left: Visual Preview */}
                                <div className="lg:col-span-2 bg-gray-50 p-8 flex flex-col justify-center items-center border-r border-gray-200">
                                    <div className="w-full">
                                        <h3 className="text-lg font-bold text-gray-900 mb-1 text-center">Your Selection</h3>
                                        <p className="text-gray-500 text-sm mb-6 text-center">Front and Back View</p>

                                        {/* Shirt Preview */}
                                        <div className="bg-white border border-gray-200 rounded-lg p-4">
                                            <AnimatePresence mode="wait">
                                                <motion.img
                                                    key={formData.tShirtColor}
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    transition={{ duration: 0.2 }}
                                                    src={shirtImages[formData.tShirtColor as 'BLACK' | 'WHITE']}
                                                    alt={`${formData.tShirtColor} T-Shirt Preview`}
                                                    className="w-full h-auto"
                                                />
                                            </AnimatePresence>
                                        </div>

                                        {/* Selection Summary */}
                                        <div className="mt-6 bg-white border border-gray-200 rounded-lg p-4">
                                            <div className="grid grid-cols-2 gap-4 text-center">
                                                <div>
                                                    <p className="text-xs uppercase font-semibold text-primary-600 mb-1">Color</p>
                                                    <p className="text-base font-bold text-gray-900">{formData.tShirtColor}</p>
                                                </div>
                                                <div>
                                                    <p className="text-xs uppercase font-semibold text-primary-600 mb-1">Size</p>
                                                    <p className="text-base font-bold text-gray-900">{formData.tShirtSize}</p>
                                                </div>
                                            </div>
                                            <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
                                                <span className="text-sm font-medium text-gray-600">Total</span>
                                                <span className="text-xl font-bold text-primary-600">GHS {formData.quantity * 50}.00</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Right: Form Fields */}
                                <div className="lg:col-span-3 p-8">
                                    <div className="mb-6">
                                        <h2 className="text-2xl font-bold text-gray-900">Request Your Shirt</h2>
                                        <p className="text-gray-600 mt-1">Fill in your details to submit a request.</p>
                                    </div>

                                    {/* Error Message */}
                                    {status === 'error' && (
                                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                                            {errorMessage}
                                        </div>
                                    )}

                                    <form onSubmit={handleSubmit} className="space-y-5">
                                        {/* Personal Info */}
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-900 mb-2">Full Name</label>
                                            <input
                                                type="text"
                                                required
                                                placeholder="John Doe"
                                                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 rounded-lg outline-none transition-all text-gray-900"
                                                value={formData.fullName}
                                                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                            />
                                        </div>
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-900 mb-2">Email Address</label>
                                                <input
                                                    type="email"
                                                    required
                                                    placeholder="john@example.com"
                                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 rounded-lg outline-none transition-all text-gray-900"
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-900 mb-2">Phone Number</label>
                                                <input
                                                    type="tel"
                                                    required
                                                    placeholder="+233 XXX XXX XXX"
                                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 rounded-lg outline-none transition-all text-gray-900"
                                                    value={formData.phoneNumber}
                                                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                                                />
                                            </div>
                                        </div>

                                        {/* Shirt Details */}
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-900 mb-3">T-Shirt Color</label>
                                            <div className="grid grid-cols-2 gap-3">
                                                {['WHITE', 'BLACK'].map((c) => (
                                                    <label key={c} className="relative cursor-pointer">
                                                        <input
                                                            type="radio"
                                                            name="tShirtColor"
                                                            className="peer sr-only"
                                                            checked={formData.tShirtColor === c}
                                                            onChange={() => setFormData({ ...formData, tShirtColor: c as 'BLACK' | 'WHITE' })}
                                                        />
                                                        <div className={`
                                                            py-3 px-4 text-center rounded-lg border-2 transition-all font-semibold
                                                            ${c === 'WHITE'
                                                                ? 'bg-white text-gray-900 border-gray-300 peer-checked:border-primary-600'
                                                                : 'bg-gray-900 text-white border-gray-900 peer-checked:border-primary-600'}
                                                        `}>
                                                            {c.charAt(0) + c.slice(1).toLowerCase()}
                                                        </div>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-900 mb-2">Size</label>
                                                <select
                                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 rounded-lg outline-none transition-all text-gray-900 appearance-none cursor-pointer"
                                                    value={formData.tShirtSize}
                                                    onChange={(e) => setFormData({ ...formData, tShirtSize: e.target.value })}
                                                >
                                                    {['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'].map(s => (
                                                        <option key={s} value={s}>{s}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-900 mb-2">Quantity</label>
                                                <input
                                                    type="number"
                                                    min="1"
                                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 rounded-lg outline-none transition-all text-gray-900"
                                                    value={formData.quantity}
                                                    onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) || 1 })}
                                                />
                                            </div>
                                        </div>

                                        {/* Submit Button */}
                                        <div className="pt-2">
                                            <button
                                                type="submit"
                                                disabled={status === 'submitting'}
                                                className="w-full px-8 py-4 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                            >
                                                {status === 'submitting' ? (
                                                    <>
                                                        <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                        </svg>
                                                        Processing...
                                                    </>
                                                ) : (
                                                    'Submit Request'
                                                )}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

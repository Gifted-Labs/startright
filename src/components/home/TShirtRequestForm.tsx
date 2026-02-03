import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TShirtRequestFormProps {
    isOpen: boolean;
    onClose: () => void;
}

export const TShirtRequestForm: React.FC<TShirtRequestFormProps> = ({ isOpen, onClose }) => {
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        color: 'White',
        size: 'L',
        quantity: 1
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');
        // Simulate API call
        setTimeout(() => {
            setStatus('success');
        }, 1500);
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
                        onClick={onClose}
                        className="absolute inset-0 bg-dark-950/80 backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-6 right-6 p-2 rounded-full bg-gray-100 text-gray-500 hover:text-dark-950 transition-colors z-[110]"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {status === 'success' ? (
                            <div className="p-12 text-center">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="max-w-xl mx-auto"
                                >
                                    <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <h3 className="text-3xl font-black text-dark-950 mb-4">Request Received!</h3>
                                    <p className="text-gray-600 text-lg mb-8">
                                        Thank you for your interest in the SRC 2026 T-Shirt. We have received your request and will contact you shortly with payment details.
                                    </p>
                                    <button
                                        onClick={() => { setStatus('idle'); onClose(); }}
                                        className="inline-flex items-center justify-center px-10 py-4 bg-primary-600 text-white font-black rounded-full hover:bg-primary-700 transition-all"
                                    >
                                        Close Modal
                                    </button>
                                </motion.div>
                            </div>
                        ) : (
                            <div className="p-8 md:p-12">
                                <div className="text-center mb-10">
                                    <span className="text-primary-600 font-black uppercase tracking-widest text-sm">Limited Edition</span>
                                    <h2 className="text-4xl font-black text-dark-950 mt-2">Request Your Shirt</h2>
                                    <p className="text-gray-600 mt-2">Secure your SRC 2026 T-shirt. We'll follow up with payment instructions.</p>
                                </div>

                                <form onSubmit={handleSubmit}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                                        {/* Personal Info */}
                                        <div className="space-y-6">
                                            <div>
                                                <label className="block text-sm font-black text-dark-950 uppercase tracking-wider mb-2">Full Name</label>
                                                <input
                                                    type="text"
                                                    required
                                                    placeholder="John Doe"
                                                    className="w-full px-6 py-4 bg-gray-50 border-2 border-gray-200 focus:border-primary-500 rounded-xl outline-none transition-all text-dark-950 font-bold placeholder:text-gray-400"
                                                    value={formData.name}
                                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-black text-dark-950 uppercase tracking-wider mb-2">Email Address</label>
                                                <input
                                                    type="email"
                                                    required
                                                    placeholder="john@example.com"
                                                    className="w-full px-6 py-4 bg-gray-50 border-2 border-gray-200 focus:border-primary-500 rounded-xl outline-none transition-all text-dark-950 font-bold placeholder:text-gray-400"
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-black text-dark-950 uppercase tracking-wider mb-2">Phone Number</label>
                                                <input
                                                    type="tel"
                                                    required
                                                    placeholder="+233 XXX XXX XXX"
                                                    className="w-full px-6 py-4 bg-gray-50 border-2 border-gray-200 focus:border-primary-500 rounded-xl outline-none transition-all text-dark-950 font-bold placeholder:text-gray-400"
                                                    value={formData.phone}
                                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                />
                                            </div>
                                        </div>

                                        {/* Shirt Details */}
                                        <div className="space-y-6">
                                            <div>
                                                <label className="block text-sm font-black text-dark-950 uppercase tracking-wider mb-4">Preferred Color</label>
                                                <div className="flex gap-4">
                                                    {['White', 'Black'].map((c) => (
                                                        <label key={c} className={`flex-1 relative cursor-pointer group`}>
                                                            <input
                                                                type="radio"
                                                                name="color"
                                                                className="peer sr-only"
                                                                checked={formData.color === c}
                                                                onChange={() => setFormData({ ...formData, color: c })}
                                                            />
                                                            <div className={`
                                                                w-full py-4 text-center rounded-xl border-2 transition-all font-black text-lg
                                                                ${c === 'White'
                                                                    ? 'bg-white border-gray-200 text-dark-950 peer-checked:border-primary-600 peer-checked:bg-gray-50'
                                                                    : 'bg-dark-950 border-dark-950 text-white peer-checked:border-primary-600 peer-checked:bg-dark-900'}
                                                            `}>
                                                                {c}
                                                            </div>
                                                            {/* Checkmark indicator */}
                                                            <div className="absolute top-2 right-2 peer-checked:opacity-100 opacity-0 transition-opacity">
                                                                <div className="w-5 h-5 bg-primary-600 rounded-full flex items-center justify-center">
                                                                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" />
                                                                    </svg>
                                                                </div>
                                                            </div>
                                                        </label>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-black text-dark-950 uppercase tracking-wider mb-2">Size</label>
                                                    <div className="relative">
                                                        <select
                                                            className="w-full px-6 py-4 bg-gray-50 border-2 border-gray-200 focus:border-primary-500 rounded-xl outline-none transition-all text-dark-950 font-bold appearance-none cursor-pointer"
                                                            value={formData.size}
                                                            onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                                                        >
                                                            {['S', 'M', 'L', 'XL', 'XXL'].map(s => (
                                                                <option key={s} value={s} className="text-dark-950 bg-white">{s}</option>
                                                            ))}
                                                        </select>
                                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-dark-950">
                                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-black text-dark-950 uppercase tracking-wider mb-2">Quantity</label>
                                                    <input
                                                        type="number"
                                                        min="1"
                                                        className="w-full px-6 py-4 bg-gray-50 border-2 border-gray-200 focus:border-primary-500 rounded-xl outline-none transition-all text-dark-950 font-bold"
                                                        value={formData.quantity}
                                                        onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) || 1 })}
                                                    />
                                                </div>
                                            </div>

                                            <div className="p-6 bg-primary-50 rounded-xl border border-primary-100">
                                                <div className="flex justify-between items-center text-primary-900">
                                                    <span className="font-bold uppercase tracking-wider text-sm">Total Price</span>
                                                    <span className="text-3xl font-black italic">GHS {formData.quantity * 50}.00</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="text-center pt-4">
                                        <button
                                            type="submit"
                                            disabled={status === 'submitting'}
                                            className="w-full px-12 py-6 bg-primary-600 text-white font-black text-xl rounded-2xl shadow-[0_10px_30px_rgba(255,0,0,0.3)] hover:bg-primary-700 hover:shadow-[0_15px_40px_rgba(255,0,0,0.4)] transition-all disabled:opacity-50 flex items-center justify-center mx-auto"
                                        >
                                            {status === 'submitting' ? (
                                                <span className="flex items-center gap-2">
                                                    <svg className="animate-spin h-6 w-6 text-white" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    Processing...
                                                </span>
                                            ) : (
                                                <span className="flex items-center gap-3">
                                                    Submit T-Shirt Request
                                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                    </svg>
                                                </span>
                                            )}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

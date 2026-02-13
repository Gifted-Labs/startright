import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSend, FiCheck, FiUser, FiBookOpen, FiLayers, FiEyeOff, FiMessageCircle } from 'react-icons/fi';
import api from '../services/api';

export default function AskQuestion() {
    const [formData, setFormData] = useState({
        content: '',
        studentName: '',
        program: '',
        academicLevel: '',
        isAnonymous: false,
    });
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!formData.content.trim() || formData.content.trim().length < 5) {
            setError('Please enter a question with at least 5 characters.');
            return;
        }

        setSubmitting(true);
        try {
            await api.post('/startright/questions', {
                content: formData.content.trim(),
                studentName: formData.isAnonymous ? null : formData.studentName.trim() || null,
                program: formData.program.trim() || null,
                academicLevel: formData.academicLevel || null,
                isAnonymous: formData.isAnonymous,
            });
            setSubmitted(true);
            setFormData({ content: '', studentName: '', program: '', academicLevel: '', isAnonymous: false });
            setTimeout(() => setSubmitted(false), 4000);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to submit your question. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    const academicLevels = [
        'Level 100', 'Level 200', 'Level 300', 'Level 400',
        'Level 500', 'Level 600', 'Graduate', 'Postgraduate', 'PhD', 'Alumni', 'Other'
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl" />
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-500/15 rounded-full blur-3xl" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 max-w-2xl mx-auto px-4 py-10 sm:py-16">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-8"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-6">
                        <FiMessageCircle className="text-purple-300" />
                        <span className="text-sm font-medium text-purple-200">Live Q&A</span>
                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
                        Ask a Question
                    </h1>
                    <p className="text-lg text-slate-300/80 max-w-md mx-auto">
                        Submit your question to the speakers. You can ask anonymously.
                    </p>
                </motion.div>

                {/* Form */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                >
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Question Input */}
                        <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/15 p-5">
                            <label className="block text-sm font-semibold text-slate-200 mb-2">
                                Your Question *
                            </label>
                            <textarea
                                name="content"
                                value={formData.content}
                                onChange={handleChange}
                                rows={4}
                                placeholder="Type your question here..."
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-400/60 focus:border-transparent resize-none transition-all"
                                maxLength={1000}
                            />
                            <div className="text-right text-xs text-slate-400 mt-1">
                                {formData.content.length}/1000
                            </div>
                        </div>

                        {/* Optional Details */}
                        <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/15 p-5 space-y-4">
                            <p className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                                <FiUser className="text-purple-300" />
                                Optional Details
                            </p>

                            {/* Anonymous Toggle */}
                            <label className="flex items-center gap-3 cursor-pointer bg-white/5 rounded-xl px-4 py-3 border border-white/10 hover:bg-white/10 transition-colors">
                                <input
                                    type="checkbox"
                                    name="isAnonymous"
                                    checked={formData.isAnonymous}
                                    onChange={handleChange}
                                    className="w-5 h-5 rounded border-2 border-purple-400 bg-transparent checked:bg-purple-500 text-purple-500 focus:ring-purple-400/50"
                                />
                                <FiEyeOff className="text-slate-300" />
                                <span className="text-sm text-slate-200">Ask anonymously</span>
                            </label>

                            {/* Name */}
                            <AnimatePresence>
                                {!formData.isAnonymous && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <div className="relative">
                                            <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                            <input
                                                type="text"
                                                name="studentName"
                                                value={formData.studentName}
                                                onChange={handleChange}
                                                placeholder="Your name"
                                                className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-400/60 transition-all"
                                            />
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Program */}
                            <div className="relative">
                                <FiBookOpen className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input
                                    type="text"
                                    name="program"
                                    value={formData.program}
                                    onChange={handleChange}
                                    placeholder="Your program (e.g. Computer Science)"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-400/60 transition-all"
                                />
                            </div>

                            {/* Academic Level */}
                            <div className="relative">
                                <FiLayers className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                <select
                                    name="academicLevel"
                                    value={formData.academicLevel}
                                    onChange={handleChange}
                                    className="w-full appearance-none bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-400/60 transition-all"
                                >
                                    <option value="" className="bg-slate-800">Select academic level</option>
                                    {academicLevels.map(level => (
                                        <option key={level} value={level} className="bg-slate-800">
                                            {level}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Error Message */}
                        <AnimatePresence>
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: -5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    className="bg-red-500/15 border border-red-400/30 rounded-xl px-4 py-3 text-red-200 text-sm"
                                >
                                    {error}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Submit Button */}
                        <motion.button
                            type="submit"
                            disabled={submitting || !formData.content.trim()}
                            whileTap={{ scale: 0.98 }}
                            className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl text-white font-bold text-lg transition-all
                                ${submitting || !formData.content.trim()
                                    ? 'bg-purple-500/30 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40'
                                }`}
                        >
                            {submitting ? (
                                <>
                                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                    </svg>
                                    Submitting...
                                </>
                            ) : (
                                <>
                                    <FiSend />
                                    Submit Question
                                </>
                            )}
                        </motion.button>
                    </form>

                    {/* Success Toast */}
                    <AnimatePresence>
                        {submitted && (
                            <motion.div
                                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 30, scale: 0.95 }}
                                className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-green-500 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3"
                            >
                                <div className="bg-white/20 rounded-full p-1">
                                    <FiCheck className="text-lg" />
                                </div>
                                <span className="font-semibold">Question submitted successfully!</span>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </div>
    );
}

import { useState } from 'react';
import { PageHero } from '../components/common/PageHero';
import { Button } from '../components/common/Button';
import { HiCheckCircle } from 'react-icons/hi';
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
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to submit your question. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    const academicLevels = [
        { value: 'Level 100', label: 'Level 100' },
        { value: 'Level 200', label: 'Level 200' },
        { value: 'Level 300', label: 'Level 300' },
        { value: 'Level 400', label: 'Level 400' },
        { value: 'Level 500', label: 'Level 500' },
        { value: 'Level 600', label: 'Level 600' },
        { value: 'Graduate', label: 'Graduate' },
        { value: 'Postgraduate', label: 'Postgraduate' },
        { value: 'PhD', label: 'PhD' },
        { value: 'Alumni', label: 'Alumni' },
        { value: 'Other', label: 'Other' },
    ];

    // Success state
    if (submitted) {
        return (
            <div className="min-h-screen bg-gray-50">
                <PageHero
                    title="QUESTION SUBMITTED"
                    subtitle="Your question has been received and will be reviewed by the moderators."
                    backgroundImage="https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
                    breadcrumbs={[
                        { label: 'Home', path: '/' },
                        { label: 'Ask a Question' },
                    ]}
                    className="h-[40vh] min-h-[300px]"
                />
                <div className="container mx-auto px-4 md:px-6 py-12 max-w-lg -mt-20 relative z-10">
                    <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-gray-100 text-center">
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 text-green-600 mb-6">
                            <HiCheckCircle className="w-12 h-12" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Thank You!</h2>
                        <p className="text-gray-600 mb-8">
                            Your question has been submitted successfully. Our moderators will review it shortly.
                        </p>
                        <div className="grid grid-cols-1 gap-4">
                            <Button onClick={() => setSubmitted(false)} variant="primary" className="w-full">
                                Ask Another Question
                            </Button>
                            <Button onClick={() => window.location.href = '/'} variant="ghost" className="w-full">
                                Back to Home
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
                title="ASK A QUESTION"
                subtitle="Submit your question to the speakers. You can ask anonymously."
                backgroundImage="https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
                breadcrumbs={[
                    { label: 'Home', path: '/' },
                    { label: 'Ask a Question' },
                ]}
                className="h-[50vh] min-h-[400px]"
            />

            <div className="container mx-auto px-4 md:px-6 py-12 max-w-2xl">
                <div className="bg-white p-8 md:p-10 rounded-2xl shadow-lg -mt-8 relative z-10 text-slate-900">

                    {/* Live Indicator */}
                    <div className="flex items-center gap-2 mb-6">
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-primary-500"></span>
                        </span>
                        <span className="text-sm font-semibold text-gray-700">Live Q&A Session</span>
                    </div>

                    {error && (
                        <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6 border border-red-200">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Question */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Your Question *
                            </label>
                            <textarea
                                name="content"
                                value={formData.content}
                                onChange={handleChange}
                                rows={4}
                                placeholder="Type your question here..."
                                maxLength={1000}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors resize-none"
                            />
                            <p className="text-right text-xs text-gray-400 mt-1">
                                {formData.content.length}/1000
                            </p>
                        </div>

                        {/* Anonymous toggle */}
                        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-100">
                            <input
                                type="checkbox"
                                name="isAnonymous"
                                id="isAnonymous"
                                checked={formData.isAnonymous}
                                onChange={handleChange}
                                className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
                            />
                            <label htmlFor="isAnonymous" className="text-gray-700 font-medium">
                                Ask anonymously
                            </label>
                        </div>

                        {/* Name (hidden when anonymous) */}
                        {!formData.isAnonymous && (
                            <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Your Name
                                </label>
                                <input
                                    type="text"
                                    name="studentName"
                                    value={formData.studentName}
                                    onChange={handleChange}
                                    placeholder="John Doe"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                                />
                            </div>
                        )}

                        {/* Program */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Program of Study
                            </label>
                            <input
                                type="text"
                                name="program"
                                value={formData.program}
                                onChange={handleChange}
                                placeholder="e.g. Computer Science"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                            />
                        </div>

                        {/* Academic Level */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Academic Level
                            </label>
                            <select
                                name="academicLevel"
                                value={formData.academicLevel}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                            >
                                <option value="">Select Level</option>
                                {academicLevels.map(level => (
                                    <option key={level.value} value={level.value}>{level.label}</option>
                                ))}
                            </select>
                        </div>

                        {/* Submit */}
                        <Button type="submit" isLoading={submitting} className="w-full">
                            Submit Question
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}

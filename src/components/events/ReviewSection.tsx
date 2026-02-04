import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { Review, ReviewPageResponse, CreateReviewRequest, AcademicLevel } from '../../types';
import { eventService } from '../../services/eventService';
import { HiStar, HiOutlineStar, HiUser, HiAcademicCap } from 'react-icons/hi';
import { format } from 'date-fns';

interface ReviewSectionProps {
    eventId: number | string;
}

const ACADEMIC_LEVELS: { value: AcademicLevel; label: string }[] = [
    { value: 'LEVEL_100', label: 'Level 100' },
    { value: 'LEVEL_200', label: 'Level 200' },
    { value: 'LEVEL_300', label: 'Level 300' },
    { value: 'LEVEL_400', label: 'Level 400' },
    { value: 'LEVEL_500', label: 'Level 500' },
    { value: 'LEVEL_600', label: 'Level 600' },
    { value: 'POSTGRADUATE', label: 'Postgraduate' },
    { value: 'ALUMNI', label: 'Alumni' },
    { value: 'OTHER', label: 'Other' },
];

export const ReviewSection: React.FC<ReviewSectionProps> = ({ eventId }) => {
    const [reviewData, setReviewData] = useState<ReviewPageResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showForm, setShowForm] = useState(false);
    const [editingReview, setEditingReview] = useState<Review | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);

    // Form state
    const [formRating, setFormRating] = useState(5);
    const [formComment, setFormComment] = useState('');
    const [guestName, setGuestName] = useState('');
    const [guestAcademicLevel, setGuestAcademicLevel] = useState<AcademicLevel>('LEVEL_100');
    const [guestProgram, setGuestProgram] = useState('');

    const fetchReviews = async () => {
        try {
            setLoading(true);
            const data = await eventService.getEventReviews(eventId);
            setReviewData(data);
            setError(null);
        } catch (err) {
            console.error("Failed to fetch reviews:", err);
            setError("Failed to load reviews.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReviews();
    }, [eventId]);

    const handleOpenForm = (review?: Review) => {
        if (review) {
            setEditingReview(review);
            setFormRating(review.rating);
            setFormComment(review.comment || '');
            setGuestName(review.guestName || '');
            setGuestAcademicLevel(review.guestAcademicLevel || 'LEVEL_100');
            setGuestProgram(review.guestProgram || '');
        } else {
            setEditingReview(null);
            setFormRating(5);
            setFormComment('');
            setGuestName('');
            setGuestAcademicLevel('LEVEL_100');
            setGuestProgram('');
        }
        setShowForm(true);
        setSubmitError(null);
        setSubmitSuccess(null);
    };

    const handleCloseForm = () => {
        setShowForm(false);
        setEditingReview(null);
        setFormRating(5);
        setFormComment('');
        setGuestName('');
        setGuestProgram('');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (formRating < 1 || formRating > 5) {
            setSubmitError('Rating must be between 1 and 5.');
            return;
        }
        if (!formComment.trim()) {
            setSubmitError('Comment is required.');
            return;
        }

        const data: CreateReviewRequest = {
            rating: formRating,
            comment: formComment,
            guestName: guestName.trim() || undefined,
            guestAcademicLevel: guestName.trim() ? guestAcademicLevel : undefined,
            guestProgram: guestProgram.trim() || undefined
        };

        setSubmitting(true);
        setSubmitError(null);

        try {
            if (editingReview) {
                await eventService.updateReview(eventId, editingReview.id, data);
                setSubmitSuccess('Review updated successfully!');
            } else {
                await eventService.createReview(eventId, data);
                setSubmitSuccess('Review submitted successfully!');
            }
            handleCloseForm();
            fetchReviews();
        } catch (err: any) {
            console.error("Failed to submit review:", err);
            setSubmitError(err.response?.data?.message || 'Failed to submit review.');
        } finally {
            setSubmitting(false);
        }
    };

    const renderStars = (rating: number, interactive = false, onRate?: (r: number) => void) => {
        return (
            <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map(star => (
                    <button
                        key={star}
                        type="button"
                        disabled={!interactive}
                        onClick={() => interactive && onRate && onRate(star)}
                        className={`${interactive ? 'cursor-pointer hover:scale-110 transition-transform' : 'cursor-default'}`}
                    >
                        {star <= rating ? (
                            <HiStar className="w-6 h-6 text-yellow-400" />
                        ) : (
                            <HiOutlineStar className="w-6 h-6 text-gray-400" />
                        )}
                    </button>
                ))}
            </div>
        );
    };

    const renderRatingDistribution = () => {
        if (!reviewData?.ratingDistribution) return null;
        const maxCount = Math.max(...Object.values(reviewData.ratingDistribution), 1);

        return (
            <div className="space-y-2">
                {[5, 4, 3, 2, 1].map(star => {
                    const count = reviewData.ratingDistribution[star] || 0;
                    const percentage = maxCount > 0 ? (count / maxCount) * 100 : 0;
                    return (
                        <div key={star} className="flex items-center gap-3 text-sm">
                            <span className="w-3 text-gray-500">{star}</span>
                            <HiStar className="w-4 h-4 text-yellow-400" />
                            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-yellow-400 rounded-full transition-all"
                                    style={{ width: `${percentage}%` }}
                                />
                            </div>
                            <span className="w-8 text-gray-500 text-right">{count}</span>
                        </div>
                    );
                })}
            </div>
        );
    };

    const getLevelDisplay = (level?: AcademicLevel) => {
        if (!level) return null;
        return ACADEMIC_LEVELS.find(l => l.value === level)?.label || level;
    };

    return (
        <section className="py-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Reviews & Ratings</h2>
                    {reviewData && (
                        <div className="flex items-center gap-3">
                            <span className="text-4xl font-black text-gray-900">
                                {reviewData.averageRating?.toFixed(1) || '0.0'}
                            </span>
                            {renderStars(Math.round(reviewData.averageRating || 0))}
                            <span className="text-gray-500">
                                ({reviewData.totalReviews} {reviewData.totalReviews === 1 ? 'review' : 'reviews'})
                            </span>
                        </div>
                    )}
                </div>
                <button
                    onClick={() => handleOpenForm()}
                    className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 font-bold uppercase text-xs tracking-wider rounded-sm transition-colors"
                >
                    Write a Review
                </button>
            </div>

            {/* Rating Distribution */}
            {reviewData && reviewData.totalReviews > 0 && (
                <div className="bg-gray-50 p-6 rounded-xl mb-8 max-w-md">
                    {renderRatingDistribution()}
                </div>
            )}

            {/* Form Modal */}
            {showForm && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto"
                    onClick={handleCloseForm}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="bg-white rounded-xl p-8 max-w-lg w-full shadow-2xl my-8"
                        onClick={e => e.stopPropagation()}
                    >
                        <h3 className="text-xl font-bold mb-6 text-gray-900">
                            {editingReview ? 'Edit Your Review' : 'Write a Review'}
                        </h3>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-900 mb-2">Your Name</label>
                                    <input
                                        type="text"
                                        value={guestName}
                                        onChange={e => setGuestName(e.target.value)}
                                        className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
                                        placeholder="Optional if logged in"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-900 mb-2">Academic Level</label>
                                        <select
                                            value={guestAcademicLevel}
                                            onChange={e => setGuestAcademicLevel(e.target.value as AcademicLevel)}
                                            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
                                        >
                                            {ACADEMIC_LEVELS.map(level => (
                                                <option key={level.value} value={level.value}>{level.label}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-900 mb-2">Program</label>
                                        <input
                                            type="text"
                                            value={guestProgram}
                                            onChange={e => setGuestProgram(e.target.value)}
                                            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
                                            placeholder="e.g. Computer Science"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-900 mb-2">Rating</label>
                                {renderStars(formRating, true, setFormRating)}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-900 mb-2">Comment *</label>
                                <textarea
                                    value={formComment}
                                    onChange={e => setFormComment(e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg p-4 focus:ring-2 focus:ring-primary-500 focus:border-transparent min-h-[120px] text-gray-900"
                                    placeholder="Share your experience..."
                                    required
                                />
                            </div>

                            {submitError && (
                                <div className="p-4 bg-red-50 text-red-600 rounded-lg text-sm">{submitError}</div>
                            )}

                            <div className="flex gap-4">
                                <button
                                    type="button"
                                    onClick={handleCloseForm}
                                    className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-sm font-bold uppercase text-xs tracking-wider hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="flex-1 bg-primary-500 hover:bg-primary-600 text-white py-3 rounded-sm font-bold uppercase text-xs tracking-wider disabled:opacity-50 transition-colors"
                                >
                                    {submitting ? 'Submitting...' : editingReview ? 'Update Review' : 'Submit Review'}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </motion.div>
            )}

            {/* Success Message */}
            {submitSuccess && (
                <div className="p-4 bg-green-50 text-green-700 rounded-lg mb-6">{submitSuccess}</div>
            )}

            {/* Reviews List */}
            {loading ? (
                <div className="space-y-4">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="h-32 bg-gray-100 rounded-xl animate-pulse" />
                    ))}
                </div>
            ) : error ? (
                <div className="p-6 bg-red-50 text-red-600 rounded-xl">{error}</div>
            ) : reviewData && reviewData.reviews.length > 0 ? (
                <div className="space-y-6">
                    {reviewData.reviews.map(review => (
                        <motion.div
                            key={review.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white border border-gray-100 rounded-xl p-6 hover:shadow-md transition-shadow"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                                        <HiUser className="w-5 h-5 text-gray-500" />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <p className="font-semibold text-gray-900">
                                                {review.userName || review.guestName || 'Anonymous'}
                                            </p>
                                            {review.isGuest && (
                                                <span className="bg-gray-100 text-gray-600 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-tighter">
                                                    Guest
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-0.5">
                                            <p className="text-xs text-gray-500">
                                                {review.createdAt && format(new Date(review.createdAt), 'MMM d, yyyy')}
                                            </p>
                                            {(review.guestAcademicLevel || review.guestProgram) && (
                                                <div className="flex items-center gap-1.5 text-xs text-primary-600 font-medium">
                                                    <HiAcademicCap className="w-3.5 h-3.5" />
                                                    <span>
                                                        {getLevelDisplay(review.guestAcademicLevel)}
                                                        {review.guestProgram && ` • ${review.guestProgram}`}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                {renderStars(review.rating)}
                            </div>
                            <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                        </motion.div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-12 bg-gray-50 rounded-xl">
                    <p className="text-gray-500">No reviews yet. Be the first to leave a review!</p>
                </div>
            )}
        </section>
    );
};

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { brandInfo } from '../../data/brandInfo';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';

export const StaticTestimonials = () => {
    const [current, setCurrent] = useState(0);
    const testimonials = brandInfo.testimonials;

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % testimonials.length);
        }, 6000);
        return () => clearInterval(interval);
    }, [testimonials.length]);

    const goTo = (index: number) => {
        setCurrent(index);
    };

    if (!testimonials || testimonials.length === 0) return null;

    return (
        <section className="py-20 bg-gradient-to-br from-primary-600 to-primary-800 text-white overflow-hidden">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">What People Say</h2>
                    <p className="text-primary-100 max-w-xl mx-auto">
                        Hear from participants, coaches, and partners who have been part of our journey.
                    </p>
                </div>

                <div className="relative max-w-4xl mx-auto">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={current}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                            className="text-center"
                        >
                            <div className="mb-8">
                                <img
                                    src={testimonials[current].image}
                                    alt={testimonials[current].author}
                                    className="w-20 h-20 rounded-full mx-auto border-4 border-white/30 object-cover"
                                />
                            </div>
                            <blockquote className="text-2xl md:text-3xl font-light leading-relaxed mb-8 italic">
                                "{testimonials[current].quote}"
                            </blockquote>
                            <div>
                                <p className="font-bold text-lg">{testimonials[current].author}</p>
                                <p className="text-primary-200">{testimonials[current].role}</p>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation Arrows */}
                    <button
                        onClick={() => goTo((current - 1 + testimonials.length) % testimonials.length)}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                        aria-label="Previous testimonial"
                    >
                        <HiChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                        onClick={() => goTo((current + 1) % testimonials.length)}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                        aria-label="Next testimonial"
                    >
                        <HiChevronRight className="w-6 h-6" />
                    </button>

                    {/* Dots */}
                    <div className="flex justify-center gap-2 mt-10">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goTo(index)}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${index === current ? 'bg-white scale-125' : 'bg-white/40 hover:bg-white/60'
                                    }`}
                                aria-label={`Go to testimonial ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

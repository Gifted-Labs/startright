import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { HiCalendar, HiUser, HiArrowRight } from 'react-icons/hi';
import { eventService } from '../../services/eventService';
import type { EventArticle, Event } from '../../types';

export const FeaturedArticlesSection = () => {
    const [articles, setArticles] = useState<EventArticle[]>([]);
    const [loading, setLoading] = useState(true);
    const [featuredEvent, setFeaturedEvent] = useState<Event | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Get featured event
                const eventsData = await eventService.getUpcomingEvents(0, 1);
                if (eventsData.content && eventsData.content.length > 0) {
                    const event = eventsData.content[0];
                    setFeaturedEvent(event);
                    
                    // Get latest 3 articles
                    const articlesData = await eventService.getEventArticles(event.id);
                    // Sort by newest first if possible, or assume backend order. 
                    // Backend returns list.
                    // Slice first 3.
                    setArticles(articlesData ? articlesData.slice(0, 3) : []);
                }
            } catch (error) {
                console.error("Failed to fetch featured articles:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const stripMarkdown = (markdown: string) => {
        let text = markdown.replace(/(\*\*|__)(.*?)\1/g, '$2');
        text = text.replace(/(\*|_)(.*?)\1/g, '$2');
        text = text.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
        text = text.replace(/^#+\s+/gm, '');
        text = text.replace(/^>\s+/gm, '');
        text = text.replace(/`{3}[\s\S]*?`{3}/g, '');
        text = text.replace(/`([^`]+)`/g, '$1');
        return text;
    };

    if (loading || articles.length === 0) {
        return null; // Hide section if no articles
    }

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                    <div>
                        <span className="text-primary-600 font-bold tracking-wider uppercase text-sm">Insights & Updates</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">featured <span className="text-primary-600">Articles</span></h2>
                        <p className="mt-4 text-gray-600 max-w-2xl">
                            Latest news, stories, and insights from our speakers and community.
                        </p>
                    </div>
                    <Link to="/articles" className="hidden md:flex items-center gap-2 text-primary-600 font-bold hover:text-primary-700 transition-colors mt-4 md:mt-0">
                        View All Articles <HiArrowRight />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {articles.map((article, index) => (
                        <motion.div
                            key={article.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-gray-50 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col h-full border border-gray-100"
                        >
                            <div className="h-48 relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-500">
                                {article.imageUrl ? (
                                    <img 
                                        src={article.imageUrl} 
                                        alt={article.title} 
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-br from-secondary-900 to-secondary-800 flex items-center justify-center">
                                        <span className="text-5xl font-black text-white opacity-10">NEWS</span>
                                    </div>
                                )}
                                <div className="absolute top-4 left-4">
                                    <span className="bg-primary-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                                        Article
                                    </span>
                                </div>
                            </div>

                            <div className="p-6 flex flex-col flex-grow">
                                <div className="flex items-center gap-4 text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">
                                    <span className="flex items-center gap-1">
                                        <HiCalendar className="w-4 h-4 text-primary-500" />
                                        {format(new Date(article.createdAt), 'MMM d, yyyy')}
                                    </span>
                                </div>

                                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 leading-tight group-hover:text-primary-600 transition-colors">
                                    {article.title}
                                </h3>

                                <p className="text-gray-600 mb-4 line-clamp-3 text-sm flex-grow">
                                    {stripMarkdown(article.content)}
                                </p>

                                <div className="pt-4 border-t border-gray-200 mt-auto flex items-center justify-between">
                                    <div className="flex items-center gap-2 text-sm font-medium text-gray-900">
                                        <HiUser className="w-4 h-4 text-primary-500" />
                                        {article.speakerName}
                                    </div>
                                    <Link 
                                        to={`/events/${featuredEvent?.id}/articles/${article.id}`} 
                                        className="text-primary-600 font-bold text-sm hover:underline"
                                    >
                                        Read More
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-8 text-center md:hidden">
                    <Link to="/articles" className="inline-flex items-center gap-2 text-primary-600 font-bold hover:text-primary-700 transition-colors">
                        View All Articles <HiArrowRight />
                    </Link>
                </div>
            </div>
        </section>
    );
};

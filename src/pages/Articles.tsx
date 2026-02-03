import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { PageHero } from '../components/common/PageHero';
import { eventService } from '../services/eventService';
import type { EventArticle, Event } from '../types';
import { format } from 'date-fns';
import { HiUser, HiCalendar } from 'react-icons/hi';
import { Button } from '../components/common/Button';

const Articles = () => {
    const [articles, setArticles] = useState<EventArticle[]>([]);
    const [loading, setLoading] = useState(true);
    const [featuredEvent, setFeaturedEvent] = useState<Event | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // 1. Get featured event (first upcoming)
                const eventsData = await eventService.getUpcomingEvents(0, 1);
                if (eventsData.content && eventsData.content.length > 0) {
                    const event = eventsData.content[0];
                    setFeaturedEvent(event);

                    // 2. Get articles for this event
                    const articlesData = await eventService.getEventArticles(event.id);
                    setArticles(articlesData || []);
                }
            } catch (error) {
                console.error("Failed to fetch articles:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Helper to strip HTML tags for preview (if content is rich text)
    const stripHtml = (html: string) => {
        const tmp = document.createElement("DIV");
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || "";
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            <PageHero
                title="Latest News"
                subtitle="Insights, updates, and stories from the StartRight community."
                backgroundImage="https://images.unsplash.com/photo-1504711434969-e33886168f5c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                breadcrumbs={[
                    { label: 'Home', path: '/' },
                    { label: 'Articles' }
                ]}
            />

            <div className="container mx-auto px-4 md:px-6 py-16">
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="bg-white rounded-xl h-96 animate-pulse">
                                <div className="h-48 bg-gray-200 rounded-t-xl"></div>
                                <div className="p-6 space-y-4">
                                    <div className="h-4 bg-gray-200 w-3/4 rounded"></div>
                                    <div className="h-4 bg-gray-200 w-1/2 rounded"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : articles.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100">
                        <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                            <HiCalendar className="w-10 h-10 text-gray-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">No Articles Yet</h3>
                        <p className="text-gray-500 max-w-md mx-auto">
                            Check back soon for the latest news and updates from {featuredEvent ? featuredEvent.title : 'our events'}.
                        </p>
                    </div>
                ) : (
                    <>
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-xl font-bold text-gray-900">
                                Featured Stories from <span className="text-primary-600">{featuredEvent?.title}</span>
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {articles.map((article, index) => (
                                <motion.div
                                    key={article.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col h-full border border-gray-100"
                                >
                                    {/* Placeholder Image (Backend Article doesn't have image field per types, but we can assume or use a default) */}
                                    <div className="h-56 bg-gradient-to-br from-secondary-900 to-secondary-800 relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-500">
                                        <div className="absolute inset-0 flex items-center justify-center opacity-10">
                                            <span className="text-9xl font-black text-white">NEWS</span>
                                        </div>
                                        <div className="absolute top-4 left-4">
                                            <span className="bg-primary-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                                                Article
                                            </span>
                                        </div>
                                    </div>

                                    <div className="p-8 flex flex-col flex-grow">
                                        <div className="flex items-center gap-4 text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                                            <span className="flex items-center gap-1">
                                                <HiCalendar className="w-4 h-4" />
                                                {format(new Date(article.publishDate), 'MMM d, yyyy')}
                                            </span>
                                            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                            <span className="flex items-center gap-1 text-primary-600">
                                                <HiUser className="w-4 h-4" />
                                                {article.author}
                                            </span>
                                        </div>

                                        <h3 className="text-2xl font-bold text-gray-900 mb-4 line-clamp-2 leading-tight group-hover:text-primary-600 transition-colors">
                                            {article.title}
                                        </h3>

                                        <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed text-sm flex-grow">
                                            {stripHtml(article.content)}
                                        </p>

                                        <Button variant="outline" className="w-full mt-auto group-hover:bg-primary-50 group-hover:border-primary-100 group-hover:text-primary-700">
                                            Read Article
                                        </Button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Articles;

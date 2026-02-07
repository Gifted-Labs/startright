import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { eventService } from '../services/eventService';
import type { EventArticle } from '../types';
import { PageHero } from '../components/common/PageHero';
import { format } from 'date-fns';
import { HiUser, HiCalendar, HiArrowLeft } from 'react-icons/hi';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Button } from '../components/common/Button';

const ArticleDetails = () => {
    const { eventId, articleId } = useParams<{ eventId: string; articleId: string }>();
    const [article, setArticle] = useState<EventArticle | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchArticle = async () => {
            if (!eventId || !articleId) return;
            try {
                const data = await eventService.getArticleById(eventId, articleId);
                setArticle(data);
            } catch (err) {
                console.error('Failed to fetch article:', err);
                setError('Failed to load article. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchArticle();
    }, [eventId, articleId]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
        );
    }

    if (error || !article) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Article Not Found</h2>
                <p className="text-gray-600 mb-8">{error || "The article you're looking for doesn't exist."}</p>
                <Link to="/articles">
                    <Button>Back to Articles</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen pb-16">
             <PageHero
                title={article.title}
                subtitle={`By ${article.speakerName}`}
                backgroundImage="https://images.unsplash.com/photo-1504711434969-e33886168f5c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                breadcrumbs={[
                    { label: 'Home', path: '/' },
                    { label: 'Articles', path: '/articles' },
                    { label: article.title }
                ]}
            />

            <div className="container mx-auto px-4 md:px-6 relative -mt-20 z-10">
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden max-w-4xl mx-auto">
                    {/* Article Image */}
                    {article.imageUrl && (
                        <div className="h-64 md:h-96 w-full overflow-hidden">
                            <img 
                                src={article.imageUrl} 
                                alt={article.title} 
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}

                    <div className="p-8 md:p-12">
                        {/* Meta Info */}
                        <div className="flex flex-wrap items-center gap-6 text-sm font-bold text-gray-500 uppercase tracking-widest mb-8 border-b border-gray-100 pb-8">
                            <span className="flex items-center gap-2">
                                <HiCalendar className="w-5 h-5 text-primary-500" />
                                {format(new Date(article.createdAt), 'MMMM d, yyyy')}
                            </span>
                            <span className="flex items-center gap-2">
                                <HiUser className="w-5 h-5 text-primary-500" />
                                {article.speakerName}
                            </span>
                        </div>

                        {/* Content */}
                        <div className="prose prose-lg max-w-none prose-primary prose-img:rounded-xl prose-headings:font-bold prose-headings:text-gray-900">
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {article.content}
                            </ReactMarkdown>
                        </div>

                        {/* Back Button */}
                        <div className="mt-12 pt-8 border-t border-gray-100">
                            <Link to="/articles">
                                <Button variant="outline" icon={<HiArrowLeft />}>
                                    Back to Articles
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArticleDetails;

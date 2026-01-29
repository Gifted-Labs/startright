import { brandInfo } from '../../data/brandInfo';

export const BrandStory = () => {
    return (
        <section className="py-20 bg-secondary-900 text-white">
            <div className="container mx-auto px-4 md:px-6">
                <div className="max-w-4xl mx-auto text-center mb-12">
                    <span className="inline-block py-1 px-3 rounded-full bg-white/10 text-white/80 text-sm font-semibold mb-6 backdrop-blur-sm">
                        Who We Are
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold mb-8 tracking-tight">
                        {brandInfo.story.title}
                    </h2>
                </div>

                <div className="max-w-3xl mx-auto space-y-6 text-lg text-gray-300 leading-relaxed text-center sm:text-left">
                    {brandInfo.story.content.map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                    ))}
                </div>
            </div>
        </section>
    );
};

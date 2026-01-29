import { brandInfo } from '../../data/brandInfo';

export const VisionMission = () => {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
                    {/* Mission */}
                    <div className="bg-primary-50 p-10 rounded-2xl border-l-4 border-primary-600">
                        <h3 className="text-primary-600 font-bold tracking-wider uppercase mb-4 text-sm">Our Mission</h3>
                        <p className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
                            {brandInfo.mission}
                        </p>
                    </div>

                    {/* Vision */}
                    <div className="flex flex-col justify-center">
                        <h3 className="text-secondary-900 font-bold tracking-wider uppercase mb-4 text-sm">Our Vision</h3>
                        <p className="text-xl md:text-2xl text-gray-600 leading-relaxed font-light">
                            "{brandInfo.vision}"
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

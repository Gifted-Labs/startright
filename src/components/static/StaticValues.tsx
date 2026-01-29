import { brandInfo } from '../../data/brandInfo';
import { HiLightBulb, HiUserGroup, HiStar } from 'react-icons/hi';

const icons: Record<string, any> = {
    HiLightBulb: HiLightBulb,
    HiUserGroup: HiUserGroup,
    HiStar: HiStar
};

export const StaticValues = () => {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-gray-900">Our Core Values</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {brandInfo.values.map((value, index) => {
                        const Icon = icons[value.icon] || HiStar;
                        return (
                            <div key={index} className="bg-gray-50 p-8 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300 border border-gray-100 text-center group">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 text-primary-600 mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <Icon className="w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {value.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

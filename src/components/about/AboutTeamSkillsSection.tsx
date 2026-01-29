import React from 'react';

const skills = [
    { name: "Consultants", percent: 85 },
    { name: "Speakers", percent: 92 },
    { name: "Workshops", percent: 78 },
];

export const AboutTeamSkillsSection: React.FC = () => {
    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Left: Image/Text */}
                    <div>
                        <span className="text-primary-600 font-bold uppercase text-xs tracking-wider mb-2 block">Our Expertise</span>
                        <h2 className="text-4xl font-black text-dark-950 mb-6">
                            Get the Most Out of <br /> Our Consultants
                        </h2>
                        <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                            Our team is composed of industry veterans who are passionate about sharing their knowledge. We meticulously curate every session to ensure maximum value for our attendees.
                        </p>
                        <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-md font-bold transition-all shadow-md">
                            Read More
                        </button>
                    </div>

                    {/* Right: Progress Bars */}
                    <div className="space-y-8">
                        {skills.map((skill) => (
                            <div key={skill.name}>
                                <div className="flex justify-between mb-2 font-bold text-dark-950">
                                    <span>{skill.name}</span>
                                    <span>{skill.percent}%</span>
                                </div>
                                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-orange-400 to-primary-500 rounded-full"
                                        style={{ width: `${skill.percent}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
};

import React from 'react';
import { Link } from 'react-router-dom';

const skills = [
    { name: "Career Readiness", percent: 95 },
    { name: "Student Satisfaction", percent: 98 },
    { name: "Networking Opportunities", percent: 90 },
];

export const AboutTeamSkillsSection: React.FC = () => {
    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Left: Image/Text */}
                    <div>
                        <span className="text-primary-600 font-bold uppercase text-xs tracking-wider mb-2 block">Why Start Right?</span>
                        <h2 className="text-4xl font-black text-dark-950 mb-6">
                            Maximize Your Potential <br /> With Industry Leaders
                        </h2>
                        <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                            We bring together the best minds to help you navigate your career path. From interactive workshops to inspiring keynotes, every moment is designed to equip you for success.
                        </p>
                        <Link to="/schedule" className="inline-block bg-primary-500 hover:bg-primary-600 text-white px-8 py-3 rounded-md font-bold transition-all shadow-md">
                            Explore Schedule
                        </Link>
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

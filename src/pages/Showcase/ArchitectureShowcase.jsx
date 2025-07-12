import React from 'react';
import { Link } from 'react-router-dom';
import ComponentArchitectureDiagram from './ComponentArchitectureDiagram';
import ArchitectureDiagram from './ArchitectureDiagram';
import { keyFeatures } from '../../context/KeyFeatures';
import { nextPhaseFeatures } from '../../context/NextPhaseFeatures';
import {
    phase1,
    phase2,
    phase3,
    phase4,
    phase1Line,
    phase2Line,
    phase3Line,
    phase4Line,
    techStack,
    stats
} from '../../context/Showcase.js';

const ArchitectureShowcase = () => {


    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-5">
            <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-800 to-blue-600 text-white p-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-2">
                        🎬 Video Streaming Platform
                    </h1>
                    <p className="text-xl opacity-90">
                        Phase 1 Complete - Full-Stack Architecture Overview
                    </p>
                </div>

                {/* Content */}
                <div className="p-8">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="bg-gray-50 p-6 rounded-xl text-center border-l-4 border-blue-500">
                                <div className="text-3xl font-bold text-blue-600 mb-2">
                                    {stat.number}
                                </div>
                                <div className="text-gray-600 text-sm">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Phase 1 Achievements */}
                    <div className="bg-green-50 p-6 rounded-xl border-l-4 border-green-500 mb-8">
                        <h3 className="text-xl font-bold text-green-700 mb-4">
                            {phase1Line}
                        </h3>
                        <ul className="space-y-2">
                            {phase1.map((achievement, index) => (
                                <li key={index} className="text-gray-700 flex items-start">
                                    <span className="text-green-500 mr-2">•</span>
                                    {achievement}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="bg-green-50 p-6 rounded-xl border-l-4 border-green-500 mb-8">
                        <h3 className="text-xl font-bold text-green-700 mb-4">
                            {phase2Line}
                        </h3>
                        <ul className="space-y-2">
                            {phase2.map((achievement, index) => (
                                <li key={index} className="text-gray-700 flex items-start">
                                    <span className="text-green-500 mr-2">•</span>
                                    {achievement}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="bg-green-50 p-6 rounded-xl border-l-4 border-green-500 mb-8">
                        <h3 className="text-xl font-bold text-green-700 mb-4">
                            {phase3Line}
                        </h3>
                        <ul className="space-y-2">
                            {phase3.map((achievement, index) => (
                                <li key={index} className="text-gray-700 flex items-start">
                                    <span className="text-green-500 mr-2">•</span>
                                    {achievement}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="bg-green-50 p-6 rounded-xl border-l-4 border-green-500 mb-8">
                        <h3 className="text-xl font-bold text-green-700 mb-4">
                            {phase4Line}
                        </h3>
                        <ul className="space-y-2">
                            {phase4.map((achievement, index) => (
                                <li key={index} className="text-gray-700 flex items-start">
                                    <span className="text-green-500 mr-2">•</span>
                                    {achievement}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Architecture Flow */}
                    <div className="mb-8">
                        <h3 className="text-2xl font-bold mb-4">🏗️ Architecture Flow</h3>
                        <div className="bg-gray-50 p-6 rounded-xl">
                            <ComponentArchitectureDiagram />
                        </div>
                    </div><div className="mb-8">
                        <h3 className="text-2xl font-bold mb-4">🏗️ Frontend Components Flow</h3>
                        <div className="bg-gray-50 p-6 rounded-xl">
                            <ArchitectureDiagram />
                        </div>
                    </div>

                    {/* Tech Stack */}
                    <div className="mb-8">
                        <h3 className="text-2xl font-bold mb-4">🛠️ Tech Stack</h3>
                        <div className="flex flex-wrap gap-3">
                            {techStack.map((tech, index) => (
                                <span
                                    key={index}
                                    className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-600 transition-colors"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Additional Features */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-blue-50 p-6 rounded-xl">
                            <h4 className="font-bold text-blue-700 mb-3">🎯 Key Features</h4>
                            {keyFeatures.map((section, i) => (
                                <div key={i} className="mb-6">
                                    <h3 className="text-xl font-semibold">{section.title}</h3>
                                    <ul className="list-disc list-inside text-gray-600 dark:text-gray-500 mt-2">
                                        {section.details.map((item, j) => (
                                            <li key={j}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>

                        <div className="bg-purple-50 p-6 rounded-xl">
                            <h4 className="font-bold text-purple-700 mb-3">🚀 Next Phase</h4>
                            {nextPhaseFeatures.map((feature, index) => (
                                <div key={index} className="p-4 rounded-lg bg-gray-50 dark:bg-gray-500 shadow-md mb-4">
                                    <h4 className="text-lg font-semibold flex items-center">
                                        <span className="mr-2 text-2xl">{feature.icon}</span>
                                        {feature.title}
                                    </h4>
                                    <p className="text-gray-600 dark:text-gray-300 mt-1">{feature.description}</p>
                                </div>
                            ))}

                            {/* <ul className="space-y-2 text-sm">
                                <li>• Real-time notifications</li>
                                <li>• Advanced search algorithms</li>
                                <li>• Video recommendations</li>
                                <li>• Performance optimizations</li>
                                <li>• Social features (likes, comments)</li>
                                <li>• Analytics dashboard</li>
                            </ul> */}
                        </div>
                    </div>

                    {/* Call to Action */}
                    <div className="mt-8 text-center bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-xl">
                        <h3 className="text-xl font-bold mb-2">Want to see it in action?</h3>
                        <p className="mb-4">Check out the live demo or explore the source code!</p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link target='1' to={'https://amanrajpoot-bugsy.vercel.app/'}>
                                <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                                    View Live Demo
                                </button>
                            </Link>

                            <Link target='1' to={'https://github.com/amanrajpoot5612/Video-Streaming-Platform-Full-Stack-'}>
                                <button className="bg-transparent border-2 border-white text-white px-6 py-2 rounded-lg font-medium hover:bg-white hover:text-blue-600 transition-colors">
                                    GitHub Repository
                                </button></Link>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArchitectureShowcase;
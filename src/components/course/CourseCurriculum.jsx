import React from 'react';
import { PlayCircle, Lock, CheckCircle } from 'lucide-react';

const CourseCurriculum = () => {
    // Mock curriculum data for visual purposes
    const sections = [
        {
            title: "Getting Started",
            duration: "45m",
            lessons: [
                { title: "Course Introduction", duration: "5:00", isFree: true, completed: true },
                { title: "Setting up the Environment", duration: "15:00", isFree: true, completed: false },
                { title: "First Steps", duration: "25:00", isFree: false, completed: false },
            ]
        },
        {
            title: "Core Concepts",
            duration: "2h 15m",
            lessons: [
                { title: "Understanding the Basics", duration: "45:00", isFree: false, completed: false },
                { title: "Advanced Theory", duration: "45:00", isFree: false, completed: false },
                { title: "Practical Application", duration: "45:00", isFree: false, completed: false },
            ]
        }
    ];

    return (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden sticky top-24">
            <div className="p-4 border-b border-gray-100 bg-gray-50">
                <h3 className="font-bold text-gray-900">Course Content</h3>
                <p className="text-xs text-gray-500 mt-1">12 Sections • 45 Lectures • 12h 30m Total Length</p>
            </div>

            <div className="divide-y divide-gray-100">
                {sections.map((section, idx) => (
                    <div key={idx} className="bg-white">
                        <div className="px-4 py-3 bg-gray-50/50 flex justify-between items-center text-sm font-medium text-gray-800">
                            <span>{section.title}</span>
                            <span className="text-xs text-gray-500">{section.duration}</span>
                        </div>
                        <ul className="divide-y divide-gray-50">
                            {section.lessons.map((lesson, fidx) => (
                                <li key={fidx} className="px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer group flex items-center justify-between">
                                    <div className="flex items-center">
                                        {lesson.completed ? (
                                            <CheckCircle className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                                        ) : lesson.isFree ? (
                                            <PlayCircle className="w-4 h-4 text-blue-600 mr-3 flex-shrink-0 group-hover:scale-110 transition-transform" />
                                        ) : (
                                            <Lock className="w-4 h-4 text-gray-400 mr-3 flex-shrink-0" />
                                        )}
                                        <span className={`text-sm ${lesson.completed ? 'text-gray-500 line-through' : 'text-gray-700'}`}>
                                            {lesson.title}
                                        </span>
                                    </div>
                                    <span className="text-xs text-gray-400">{lesson.duration}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CourseCurriculum;

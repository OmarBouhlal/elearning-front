import React from 'react';
import { FileText, CheckCircle, Download } from 'lucide-react';

const CourseCurriculum = () => {
    // Mock curriculum data for visual purposes
    const sections = [
        {
            title: "Getting Started",
            pages: "12 pages",
            lessons: [
                { title: "Course Introduction", pages: "3 pages", completed: true },
                { title: "Setting up the Environment", pages: "5 pages", completed: false },
                { title: "First Steps", pages: "4 pages", completed: false },
            ]
        },
        {
            title: "Core Concepts",
            pages: "45 pages",
            lessons: [
                { title: "Understanding the Basics", pages: "15 pages", completed: false },
                { title: "Advanced Theory", pages: "20 pages", completed: false },
                { title: "Practical Application", pages: "10 pages", completed: false },
            ]
        }
    ];

    return (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden sticky top-24">
            <div className="p-4 border-b border-gray-100 bg-gray-50">
                <h3 className="font-bold text-gray-900">Course Content</h3>
                <p className="text-xs text-gray-500 mt-1">2 Sections • 6 Chapters • 57 Pages Total</p>
            </div>

            <div className="divide-y divide-gray-100">
                {sections.map((section, idx) => (
                    <div key={idx} className="bg-white">
                        <div className="px-4 py-3 bg-gray-50/50 flex justify-between items-center text-sm font-medium text-gray-800">
                            <span>{section.title}</span>
                            <span className="text-xs text-gray-500">{section.pages}</span>
                        </div>
                        <ul className="divide-y divide-gray-50">
                            {section.lessons.map((lesson, fidx) => (
                                <li key={fidx} className="px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer group flex items-center justify-between">
                                    <div className="flex items-center">
                                        {lesson.completed ? (
                                            <CheckCircle className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                                        ) : (
                                            <FileText className="w-4 h-4 text-gray-400 mr-3 flex-shrink-0 group-hover:text-blue-600 transition-colors" />
                                        )}
                                        <span className={`text-sm ${lesson.completed ? 'text-gray-500 line-through' : 'text-gray-700'}`}>
                                            {lesson.title}
                                        </span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <span className="text-xs text-gray-400">{lesson.pages}</span>
                                        {!lesson.completed && (
                                            <Download className="w-3 h-3 text-gray-300 group-hover:text-blue-600 transition-colors" />
                                        )}
                                    </div>
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

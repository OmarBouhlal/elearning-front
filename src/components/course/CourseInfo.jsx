import React from 'react';
import { Check } from 'lucide-react';

const CourseInfo = ({ course }) => {
    return (
        <div className="space-y-8">
            {/* What you'll learn */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-4">What you'll learn</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[1, 2, 3, 4, 5, 6].map((item) => (
                        <div key={item} className="flex items-start">
                            <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-gray-600">Master fundamental concepts and advanced techniques in this field</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Description */}
            <div className="prose prose-blue max-w-none">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Description</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                    {course.description}
                </p>
                <p className="text-gray-600 leading-relaxed">
                    This comprehensive course is designed for students who want to master {course.major}.
                    Whether you are a beginner or looking to advance your skills, this course offers a structured learning path
                    with hands-on projects and real-world examples.
                </p>

                <h4 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Who is this course for?</h4>
                <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                    <li>Beginner to advanced students pursuing a degree in {course.major}</li>
                    <li>Professionals looking to update their skills</li>
                    <li>Anyone interested in {course.title}</li>
                </ul>
            </div>

            {/* Instructor */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Instructor</h3>
                <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                        {/* Placeholder for instructor image if not available in data */}
                        <div className="w-full h-full bg-blue-100 flex items-center justify-center text-blue-600 text-xl font-bold">
                            {course.instructor.charAt(0)}
                        </div>
                    </div>
                    <div>
                        <h4 className="text-lg font-bold text-blue-600 hover:text-blue-700 cursor-pointer">
                            {course.instructor}
                        </h4>
                        <p className="text-sm text-gray-500 mb-3">Senior Lecturer & Industry Expert</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                            <div className="flex items-center">
                                <span className="font-semibold text-gray-900 mr-1">4.8</span> Rating
                            </div>
                            <div className="flex items-center">
                                <span className="font-semibold text-gray-900 mr-1">12,453</span> Students
                            </div>
                            <div className="flex items-center">
                                <span className="font-semibold text-gray-900 mr-1">15</span> Courses
                            </div>
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed">
                            {course.instructor} is a passionate educator with over 10 years of experience in the field.
                            Known for explaining complex topics in a simple, understandable way.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseInfo;

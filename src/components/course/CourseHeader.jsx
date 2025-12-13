import React from 'react';
import { ArrowLeft, Clock, User, Star, Share2, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

const CourseHeader = ({ course }) => {
    return (
        <div className="bg-gray-900 text-white pt-8 pb-12">
            <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
                {/* Breadcrumb & Navigation */}
                <div className="flex items-center justify-between mb-8">
                    <Link
                        to="/Dashboard"
                        className="flex items-center text-gray-400 hover:text-white transition-colors text-sm font-medium"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Courses
                    </Link>
                    <div className="flex items-center space-x-4">
                        <span className="text-gray-400 text-sm">
                            {course.major} &gt; Year {course.year}
                        </span>
                    </div>
                </div>

                {/* Main Header Content */}
                <div className="max-w-4xl">
                    <div className="flex items-center space-x-2 mb-4">
                        <span className="px-3 py-1 bg-blue-600/20 text-blue-400 border border-blue-600/30 rounded-full text-xs font-semibold">
                            {course.level || 'All Levels'}
                        </span>
                        <span className="px-3 py-1 bg-purple-600/20 text-purple-400 border border-purple-600/30 rounded-full text-xs font-semibold">
                            {course.major}
                        </span>
                    </div>

                    <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                        {course.title}
                    </h1>

                    <p className="text-xl text-gray-400 mb-8 max-w-3xl leading-relaxed">
                        {course.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-6 text-sm text-gray-300">
                        <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-xs font-bold mr-3">
                                {course.instructor.charAt(0)}
                            </div>
                            <span>Created by <span className="text-blue-400 font-medium ml-1">{course.instructor}</span></span>
                        </div>

                        <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-2 text-gray-400" />
                            <span>Last updated May 2024</span>
                        </div>

                        <div className="flex items-center">
                            <BookOpen className="w-4 h-4 mr-2 text-gray-400" />
                            <span>English</span>
                        </div>

                        <div className="flex items-center text-yellow-400">
                            <Star className="w-4 h-4 mr-1 fill-current" />
                            <Star className="w-4 h-4 mr-1 fill-current" />
                            <Star className="w-4 h-4 mr-1 fill-current" />
                            <Star className="w-4 h-4 mr-1 fill-current" />
                            <Star className="w-4 h-4 mr-1 fill-current" />
                            <span className="ml-2 text-gray-300">(4.8 / 5.0)</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseHeader;

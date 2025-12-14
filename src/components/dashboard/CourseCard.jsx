import React from 'react';
import { Clock, User, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

const CourseCard = ({ course }) => {
    const { title, instructor, hours, description, image, level } = course;

    return (
        <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100 group z-0">
            {/* Thumbnail */}
            <div className="relative h-48 overflow-hidden">
                <img
                    src={image || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"}
                    alt={title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-semibold text-blue-600 shadow-sm">
                    {level || 'Beginner'}
                </div>
            </div>

            {/* Content */}
            <div className="p-5">
                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors">
                    {title}
                </h3>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2 h-10">
                    {description}
                </p>

                {/* Metadata */}
                <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-50">
                    <div className="flex items-center space-x-1">
                        <User className="h-4 w-4 text-gray-400" />
                        <span>{instructor}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                        <BookOpen className="h-4 w-4 text-gray-400" />
                        <span>{hours}h read</span>
                    </div>
                </div>

                {/* Action Button */}
                <Link to={`/course/${course.id}`} className="block w-full mt-4 text-center bg-blue-50 text-blue-600 py-2 rounded-lg font-medium hover:bg-blue-600 hover:text-white transition-all duration-300">
                    View Course
                </Link>
            </div>
        </div>
    );
};

export default CourseCard;

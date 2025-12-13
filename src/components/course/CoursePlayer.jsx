import React from 'react';
import { Play } from 'lucide-react';

const CoursePlayer = ({ course }) => {
    return (
        <div className="bg-white p-1 rounded-2xl shadow-xl border border-gray-200 -mt-20 relative z-10 w-full lg:w-[380px] lg:fixed lg:right-16 lg:top-28">
            <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-900 group cursor-pointer">
                <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <Play className="w-6 h-6 text-blue-600 fill-current ml-1" />
                    </div>
                </div>
            </div>

            <div className="p-6">
                <div className="flex items-baseline space-x-2 mb-4">
                    <span className="text-3xl font-bold text-gray-900">Free</span>
                    <span className="text-gray-500 line-through text-sm">$89.99</span>
                    <span className="text-sm font-semibold text-green-600 ml-auto">100% OFF</span>
                </div>

                <button className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30 mb-3">
                    Enroll Now
                </button>
                <button className="w-full bg-white text-gray-900 font-bold py-3 px-4 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors">
                    Add to Cart
                </button>

                <div className="mt-6 text-sm text-gray-500 space-y-3">
                    <p className="font-semibold text-gray-900 mb-2">This course includes:</p>
                    <div className="flex items-center">
                        <span className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center mr-3 text-blue-600">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        </span>
                        {course.hours} hours on-demand video
                    </div>
                    <div className="flex items-center">
                        <span className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center mr-3 text-blue-600">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                        </span>
                        Full lifetime access
                    </div>
                    <div className="flex items-center">
                        <span className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center mr-3 text-blue-600">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        </span>
                        Certificate of completion
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CoursePlayer;

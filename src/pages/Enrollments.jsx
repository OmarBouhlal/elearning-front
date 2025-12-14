import React, { useState, useEffect } from 'react';
import Navbar from '../components/dashboard/Navbar';
import CourseCard from '../components/dashboard/CourseCard';
import { getEnrolledCourses } from '../utils/enrollmentStorage';
import { courses } from '../data/courses';
import { BookMarked, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Enrollments = () => {
    const [enrolledCoursesList, setEnrolledCoursesList] = useState([]);

    useEffect(() => {
        const enrolledIds = getEnrolledCourses();
        const filtered = courses.filter(course => enrolledIds.includes(course.id));
        setEnrolledCoursesList(filtered);
    }, []);

    return (
        <div>
            <Navbar />
            <main className="pt-24 pb-12 px-4 sm:px-8">
                <div className="max-w-[1280px] mx-auto">
                    {/* Header */}
                    <div className="mb-10">
                        <div className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-100/50 text-indigo-700 text-sm font-medium mb-4 backdrop-blur-sm border border-indigo-200">
                            <BookMarked className="w-4 h-4 mr-2" />
                            My Learning
                        </div>
                        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                            Enrolled Courses
                        </h1>
                        <p className="mt-2 text-gray-600">
                            Continue where you left off.
                        </p>
                    </div>

                    {/* Content */}
                    {enrolledCoursesList.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                            {enrolledCoursesList.map(course => (
                                <CourseCard key={course.id} course={course} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-24 bg-white rounded-2xl border border-dashed border-gray-300 shadow-sm">
                            <div className="mx-auto h-16 w-16 text-gray-300 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                                <BookMarked className="h-8 w-8" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900">No enrollments yet</h3>
                            <p className="mt-2 text-gray-500 max-w-sm mx-auto mb-6">
                                You haven't enrolled in any courses yet. Explore our catalog to find something new.
                            </p>
                            <Link
                                to="/Dashboard"
                                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/30 transition-all duration-200"
                            >
                                Browse Courses
                                <ArrowRight className="ml-2 -mr-1 w-5 h-5" />
                            </Link>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default Enrollments;

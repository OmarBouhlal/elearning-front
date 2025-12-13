import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { courses } from '../data/courses';
import Navbar from '../components/dashboard/Navbar';
import CourseHeader from '../components/course/CourseHeader';
import CoursePlayer from '../components/course/CoursePlayer';
import CourseCurriculum from '../components/course/CourseCurriculum';
import CourseInfo from '../components/course/CourseInfo';

const Course = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const course = courses.find(c => c.id === parseInt(id));

    useEffect(() => {
        if (!course) {
            navigate('/Dashboard');
        }
        window.scrollTo(0, 0);
    }, [course, navigate]);

    if (!course) return null;

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <main className="pt-20">
                <CourseHeader course={course} />

                <div className="max-w-[1280px] mx-auto px-4 sm:px-8 py-12">
                    <div className="flex flex-col lg:flex-row gap-12 relative">
                        {/* Main Content */}
                        <div className="flex-1 max-w-4xl">
                            {/* Mobile only player position placeholder if needed, current design assumes desktop right sticky */}
                            <div className="lg:hidden mb-8">
                                <CoursePlayer course={course} />
                            </div>

                            <CourseInfo course={course} />

                            <div className="mt-12">
                                <CourseCurriculum />
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="hidden lg:block w-[380px] flex-shrink-0">
                            {/* The player is absolutely positioned relative to this container or fixed, handled in component CSS */}
                            <CoursePlayer course={course} />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Course;
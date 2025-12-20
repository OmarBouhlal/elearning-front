import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/dashboard/Navbar';
import CourseHeader from '../components/course/CourseHeader';
import CoursePlayer from '../components/course/CoursePlayer';
import CourseCurriculum from '../components/course/CourseCurriculum';
import CourseInfo from '../components/course/CourseInfo';
import courseService from '../services/courseService';
import { Loader2 } from 'lucide-react';

const Course = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                // Since we don't have a direct getById endpoint in the swagger summary for anonymous/public access easily visible
                // (or assuming we act as simple user), and we are enriching data:
                const courses = await courseService.getAllCourses();
                // Compare as strings because URL param is string, API ID is string (UUID)
                const foundCourse = courses.find(c => c.id.toString() === id);

                if (foundCourse) {
                    setCourse(foundCourse);
                } else {
                    navigate('/dashboard');
                }
            } catch (error) {
                console.error("Failed to fetch course", error);
                navigate('/dashboard');
            } finally {
                setLoading(false);
            }
        };

        fetchCourse();
        window.scrollTo(0, 0);
    }, [id, navigate]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
            </div>
        );
    }

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
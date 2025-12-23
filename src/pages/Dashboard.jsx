import React, { useState, useMemo, useEffect } from 'react';
import Navbar from '../components/dashboard/Navbar';
import CourseCard from '../components/dashboard/CourseCard';
import FilterBar from '../components/dashboard/FilterBar';
import { Filter, BookOpen, Sparkles, Loader2 } from 'lucide-react';
import courseService from '../services/courseService';

import authService from '../services/authService';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const [selectedYear, setSelectedYear] = useState(1);
    const [selectedMajor, setSelectedMajor] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const checkRole = authService.getUserRole();
    const isInstructor = checkRole === 'ROLE_INSTRUCTOR';

    const majors = ['Mechanical', 'Electromechanical', 'AI', 'Software', 'Civil'];

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                let data;
                if (isInstructor) {
                    data = await courseService.getMyCourses();
                } else {
                    data = await courseService.getAllCourses();
                }
                setCourses(data);
                setLoading(false);
            } catch (err) {
                console.error("Failed to load courses", err);
                setError("Failed to load courses. Please try again.");
                setLoading(false);
            }
        };

        fetchCourses();
    }, [isInstructor]);

    const filteredCourses = useMemo(() => {
        return courses.filter(course => {
            // Search filter
            if (searchTerm) {
                const term = searchTerm.toLowerCase();
                const matchesSearch =
                    course.title.toLowerCase().includes(term) ||
                    (course.description && course.description.toLowerCase().includes(term));

                if (!matchesSearch) return false;
            }

            if (isInstructor) return true; // Instructors just see all their courses, no year filtering needed

            // Year filter
            if (course.year !== selectedYear) return false;

            // Major filter - only apply if Year > 2
            if (selectedYear > 2) {
                if (selectedMajor !== 'All' && course.major !== selectedMajor) return false;
            }

            return true;
        });
    }, [selectedYear, selectedMajor, courses, searchTerm, isInstructor]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center text-red-500">
                {error}
            </div>
        );
    }

    return (
        <div className="">
            {/* Navigation Bar */}
            <Navbar />

            {/* Main Content Area */}
            <main className="pt-24 pb-12 px-4 sm:px-8">
                <div className="max-w-[1280px] mx-auto">

                    {/* Hero Header */}
                    <div className="mb-10 text-center md:text-left">
                        <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mb-4 backdrop-blur-sm border ${isInstructor ? 'bg-purple-100/50 text-purple-700 border-purple-200' : 'bg-blue-100/50 text-blue-700 border-blue-200'}`}>
                            <Sparkles className="w-4 h-4 mr-2" />
                            {isInstructor ? 'Instructor Dashboard' : 'Welcome Back, Student'}
                        </div>
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                            <div>
                                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
                                    {isInstructor ? (
                                        <>Manage Your <br className="hidden md:block" /><span>Courses</span></>
                                    ) : (
                                        <>Your Learning Journey <br className="hidden md:block" /><span>Starts Here</span></>
                                    )}
                                </h1>
                                <p className="mt-4 text-lg text-gray-600 max-w-2xl">
                                    {isInstructor
                                        ? "Create and manage your courses. Track your impact on student learning."
                                        : "Select your academic year to discover courses tailored to your curriculum. Unlock new skills and master your major."
                                    }
                                </p>
                            </div>

                            {isInstructor && (
                                <Link
                                    to="/create-course"
                                    className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/30 transition-all duration-200 shrink-0"
                                >
                                    <BookOpen className="w-5 h-5 mr-2" />
                                    Create New Course
                                </Link>
                            )}
                        </div>
                    </div>

                    {/* Integrated Filter Bar - Only for Students */}
                    {!isInstructor && (
                        <FilterBar
                            selectedYear={selectedYear}
                            setSelectedYear={setSelectedYear}
                            selectedMajor={selectedMajor}
                            setSelectedMajor={setSelectedMajor}
                            searchTerm={searchTerm}
                            setSearchTerm={setSearchTerm}
                            majors={majors}
                        />
                    )}

                    {/* Content Section */}
                    <section className="animate-fade-in-up">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-bold flex items-center text-gray-800">
                                <span className={`bg-gradient-to-br ${isInstructor ? 'from-purple-500 to-purple-600 shadow-purple-500/20' : 'from-blue-500 to-blue-600 shadow-blue-500/20'} text-white p-2 rounded-lg mr-3 shadow-md`}>
                                    <BookOpen className="w-5 h-5" />
                                </span>
                                {isInstructor
                                    ? "My Published Courses"
                                    : (selectedYear <= 2
                                        ? `Common Core Curriculum - Year ${selectedYear}`
                                        : `${selectedMajor === 'All' ? 'All' : selectedMajor} Courses - Year ${selectedYear}`
                                    )
                                }
                            </h2>
                            <span className="text-sm font-medium text-gray-500 bg-white px-3 py-1 rounded-full border border-gray-200 shadow-sm">
                                {filteredCourses.length} {filteredCourses.length === 1 ? 'Course' : 'Courses'} Found
                            </span>
                        </div>

                        {/* Course Grid */}
                        {filteredCourses.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 z-0">
                                {filteredCourses.map((course, index) => (
                                    <CourseCard key={course.id} course={course} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-24 bg-white rounded-2xl border border-dashed border-gray-300 shadow-sm">
                                <div className="mx-auto h-16 w-16 text-gray-300 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                                    <Filter className="h-8 w-8" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900">
                                    {isInstructor ? "You haven't created any courses yet" : "No courses found"}
                                </h3>
                                <p className="mt-2 text-gray-500 max-w-sm mx-auto mb-6">
                                    {isInstructor
                                        ? "Start by creating your first course to share your knowledge."
                                        : "We couldn't find any courses for the selected filter combination."
                                    }
                                </p>
                                {isInstructor && (
                                    <Link
                                        to="/create-course"
                                        className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold"
                                    >
                                        Create a Course &rarr;
                                    </Link>
                                )}
                            </div>
                        )}
                    </section>

                </div>
            </main>
        </div>
    );
};

export default Dashboard;
import React, { useState, useMemo } from 'react';
import Navbar from '../components/dashboard/Navbar';
import CourseCard from '../components/dashboard/CourseCard';
import FilterBar from '../components/dashboard/FilterBar';
import { Filter, BookOpen, Sparkles } from 'lucide-react';
import { courses } from '../data/courses';

const Dashboard = () => {
    const [selectedYear, setSelectedYear] = useState(1);
    const [selectedMajor, setSelectedMajor] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');

    const majors = ['Mechanical', 'Electromechanical', 'AI', 'Software', 'Civil'];


    const filteredCourses = useMemo(() => {
        return courses.filter(course => {
            // Search filter
            if (searchTerm) {
                const term = searchTerm.toLowerCase();
                const matchesSearch =
                    course.title.toLowerCase().includes(term) ||
                    course.instructor.toLowerCase().includes(term) ||
                    (course.description && course.description.toLowerCase().includes(term));

                if (!matchesSearch) return false;
            }

            // Year filter
            if (course.year !== selectedYear) return false;

            // Major filter - only apply if Year > 2
            if (selectedYear > 2) {
                if (selectedMajor !== 'All' && course.major !== selectedMajor) return false;
            }
            // For years 1 and 2, implicitly show 'Common' major courses (or all courses for that year).
            // Since we tagged them as 'Common' or just by year, filtering by year alone is sufficient
            // as specific majors don't technically exist yet.

            return true;
        });
    }, [selectedYear, selectedMajor, courses, searchTerm]);

    return (
        <div className="">
            {/* Navigation Bar */}
            <Navbar />

            {/* Main Content Area */}
            <main className="pt-24 pb-12 px-4 sm:px-8">
                <div className="max-w-[1280px] mx-auto">

                    {/* Hero Header */}
                    <div className="mb-10 text-center md:text-left">
                        <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100/50 text-blue-700 text-sm font-medium mb-4 backdrop-blur-sm border border-blue-200">
                            <Sparkles className="w-4 h-4 mr-2" />
                            Welcome Back, Student
                        </div>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
                            Your Learning Journey <br className="hidden md:block" />
                            <span className="">
                                Starts Here
                            </span>
                        </h1>
                        <p className="mt-4 text-lg text-gray-600 max-w-2xl">
                            Select your academic year to discover courses tailored to your curriculum.
                            Unlock new skills and master your major.
                        </p>
                    </div>

                    {/* Integrated Filter Bar */}
                    <FilterBar
                        selectedYear={selectedYear}
                        setSelectedYear={setSelectedYear}
                        selectedMajor={selectedMajor}
                        setSelectedMajor={setSelectedMajor}
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        majors={majors}
                    />

                    {/* Content Section */}
                    <section className="animate-fade-in-up">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-bold flex items-center text-gray-800">
                                <span className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-2 rounded-lg mr-3 shadow-md shadow-blue-500/20">
                                    <BookOpen className="w-5 h-5" />
                                </span>
                                {selectedYear <= 2
                                    ? `Common Core Curriculum - Year ${selectedYear}`
                                    : `${selectedMajor === 'All' ? 'All' : selectedMajor} Courses - Year ${selectedYear}`
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
                                    // Stagger animation delay based on index could be added here
                                    <CourseCard key={course.id} course={course} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-24 bg-white rounded-2xl border border-dashed border-gray-300 shadow-sm">
                                <div className="mx-auto h-16 w-16 text-gray-300 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                                    <Filter className="h-8 w-8" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900">No courses found</h3>
                                <p className="mt-2 text-gray-500 max-w-sm mx-auto">
                                    We couldn't find any courses for the selected filter combination.
                                    Try changing the major or year.
                                </p>
                            </div>
                        )}
                    </section>

                </div>
            </main>
        </div>
    );
};

export default Dashboard;
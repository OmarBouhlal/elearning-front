import React, { useState, useMemo } from 'react';
import Navbar from '../components/dashboard/Navbar';
import CourseCard from '../components/dashboard/CourseCard';
import FilterBar from '../components/dashboard/FilterBar';
import { Filter, BookOpen, Sparkles } from 'lucide-react';

const Dashboard = () => {
    const [selectedYear, setSelectedYear] = useState(1);
    const [selectedMajor, setSelectedMajor] = useState('All');

    const majors = ['Mechanical', 'Electromechanical', 'AI', 'Software', 'Civil'];

    const courses = [
        {
            id: 1,
            title: 'Complete Web Design: from Figma to Webflow to Freelancing',
            instructor: 'Vako Shvili',
            hours: 19.5,
            description: 'Learn Web Design in 2024. Build websites that stand out. Learn to design on Figma and build on Webflow.',
            image: 'https://images.unsplash.com/photo-1541462608143-67571c6738dd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            level: 'All Levels',
            year: 3,
            major: 'Software'
        },
        {
            id: 2,
            title: 'The Complete Python Pro Bootcamp for 2024',
            instructor: 'Angela Yu',
            hours: 100,
            description: 'Master Python by building 100 projects in 100 days. Learn data science, automation, build websites, games and apps!',
            image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            level: 'Beginner',
            year: 1,
            major: 'Common'
        },
        {
            id: 3,
            title: 'Machine Learning A-Z: AI, Python & R + ChatGPT Prize [2024]',
            instructor: 'Kirill Eremenko',
            hours: 42,
            description: 'Learn to create Machine Learning Algorithms in Python and R from two Data Science experts. Code templates included.',
            image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            level: 'Intermediate',
            year: 4,
            major: 'AI'
        },
        {
            id: 4,
            title: 'Ultimate Cloud Certified Solutions Architect Associate 2024',
            instructor: 'khalid',
            hours: 27,
            description: 'Full practice exam included + explanations | Learn Cloud Computing | Pass the AWS Certified Solutions Architect Associate Certification SAA-C03!',
            image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            level: 'Advanced',
            year: 5,
            major: 'Software'
        },
        {
            id: 5,
            title: 'Introduction to Engineering Mechanics',
            instructor: 'Dr. Smith',
            hours: 30,
            description: 'Fundamental concepts of mechanics for first-year engineering students.',
            image: 'https://images.unsplash.com/photo-1537432376769-00f5c2f4c8d2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            level: 'Beginner',
            year: 1,
            major: 'Common'
        },
        {
            id: 6,
            title: 'Civil Engineering Basics',
            instructor: 'Eng. Sarah',
            hours: 45,
            description: 'Overview of structures, materials, and fluid mechanics.',
            image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            level: 'Intermediate',
            year: 3,
            major: 'Civil'
        }
    ];

    const filteredCourses = useMemo(() => {
        return courses.filter(course => {
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
    }, [selectedYear, selectedMajor, courses]);

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
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
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
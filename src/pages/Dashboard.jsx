import React, { useState, useMemo } from 'react';
import Navbar from '../components/dashboard/Navbar';
import CourseCard from '../components/dashboard/CourseCard';
import { Filter, BookOpen } from 'lucide-react';

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
        <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
            {/* Navigation Bar */}
            <Navbar />

            {/* Main Content Area */}
            <main className="pt-20 pb-12 px-4 sm:px-8">
                <div className="max-w-[1280px] mx-auto">

                    {/* Page Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">Welcome Back, Student!</h1>
                        <p className="mt-2 text-gray-600">Select your academic year to view relevant courses.</p>
                    </div>

                    {/* Filters */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
                        <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-8">

                            {/* Year Selection */}
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Academic Year</label>
                                <div className="flex space-x-2 overflow-x-auto pb-2 md:pb-0">
                                    {[1, 2, 3, 4, 5].map(year => (
                                        <button
                                            key={year}
                                            onClick={() => setSelectedYear(year)}
                                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap ${selectedYear === year
                                                    ? 'bg-blue-600 text-white shadow-md'
                                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                                }`}
                                        >
                                            Year {year}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Major Selection - Only show for Year 3+ */}
                            {selectedYear > 2 && (
                                <div className="flex-1 animate-fadeIn">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Major</label>
                                    <div className="relative">
                                        <select
                                            value={selectedMajor}
                                            onChange={(e) => setSelectedMajor(e.target.value)}
                                            className="block w-full pl-3 pr-10 py-2.5 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-lg bg-gray-50 border transition-colors cursor-pointer"
                                        >
                                            <option value="All">All Majors</option>
                                            {majors.map(major => (
                                                <option key={major} value={major}>{major}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Content Section */}
                    <section>
                        <h2 className="text-xl font-semibold mb-6 flex items-center">
                            <span className="bg-blue-100 text-blue-600 p-1 rounded mr-2">
                                <BookOpen className="w-5 h-5" />
                            </span>
                            {selectedYear <= 2 ? `Common Core - Year ${selectedYear}` : `${selectedMajor === 'All' ? 'All' : selectedMajor} Courses - Year ${selectedYear}`}
                        </h2>

                        {/* Course Grid */}
                        {filteredCourses.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {filteredCourses.map(course => (
                                    <CourseCard key={course.id} course={course} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
                                <div className="mx-auto h-12 w-12 text-gray-400">
                                    <Filter className="h-12 w-12" />
                                </div>
                                <h3 className="mt-2 text-sm font-medium text-gray-900">No courses found</h3>
                                <p className="mt-1 text-sm text-gray-500">Try adjusting your filters.</p>
                            </div>
                        )}
                    </section>

                </div>
            </main>
        </div>
    );
};

export default Dashboard;
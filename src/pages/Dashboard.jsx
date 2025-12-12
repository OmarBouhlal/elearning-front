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
    },
    {
        id: 7,
        title: 'React - The Complete Guide 2024',
        instructor: 'Maximilian Schwarzmüller',
        hours: 68,
        description: 'Dive in and learn React.js from scratch! Learn React, Hooks, Redux, React Router, Next.js, Best Practices and way more!',
        image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        level: 'All Levels',
        year: 2,
        major: 'Software'
    },
    {
        id: 8,
        title: 'Deep Learning Specialization',
        instructor: 'Andrew Ng',
        hours: 55,
        description: 'Build and train neural network architectures such as CNNs, RNNs, LSTMs, and Transformers.',
        image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        level: 'Advanced',
        year: 5,
        major: 'AI'
    },
    {
        id: 9,
        title: 'Structural Analysis and Design',
        instructor: 'Prof. Ahmed',
        hours: 50,
        description: 'Advanced structural analysis methods including finite element analysis and design of steel and concrete structures.',
        image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        level: 'Advanced',
        year: 4,
        major: 'Civil'
    },
    {
        id: 10,
        title: 'Computer Vision and Image Processing',
        instructor: 'Dr. Chen',
        hours: 38,
        description: 'Master computer vision techniques including object detection, image segmentation, and facial recognition using OpenCV and TensorFlow.',
        image: '',
        level: 'Advanced',
        year: 4,
        major: 'AI'
    },
    {
        id: 11,
        title: 'Full Stack Web Development with MERN',
        instructor: 'Jonas Schmedtmann',
        hours: 85,
        description: 'Build full-stack applications using MongoDB, Express, React, and Node.js. Includes authentication, deployment, and best practices.',
        image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        level: 'Intermediate',
        year: 3,
        major: 'Software'
    },
    {
        id: 12,
        title: 'Mathematics for Engineers I',
        instructor: 'Dr. Williams',
        hours: 40,
        description: 'Calculus, linear algebra, and differential equations for engineering applications.',
        image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        level: 'Beginner',
        year: 1,
        major: 'Common'
    },
    {
        id: 13,
        title: 'Transportation Engineering',
        instructor: 'Eng. Mohamed',
        hours: 35,
        description: 'Highway design, traffic engineering, and transportation planning principles.',
        image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        level: 'Intermediate',
        year: 4,
        major: 'Civil'
    },
    {
        id: 14,
        title: 'Natural Language Processing with Python',
        instructor: 'Dr. Patel',
        hours: 48,
        description: 'Learn NLP techniques including sentiment analysis, text classification, and transformers like BERT and GPT.',
        image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        level: 'Advanced',
        year: 5,
        major: 'AI'
    },
    {
        id: 15,
        title: 'DevOps: CI/CD with Jenkins, Docker & Kubernetes',
        instructor: 'James Lee',
        hours: 32,
        description: 'Master continuous integration and deployment with industry-standard tools and containerization.',
        image: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        level: 'Advanced',
        year: 5,
        major: 'Software'
    },
    {
        id: 16,
        title: 'Engineering Physics',
        instructor: 'Prof. Johnson',
        hours: 35,
        description: 'Classical mechanics, thermodynamics, and wave phenomena for engineering students.',
        image: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        level: 'Beginner',
        year: 1,
        major: 'Common'
    },
    {
        id: 17,
        title: 'Geotechnical Engineering',
        instructor: 'Dr. Hassan',
        hours: 42,
        description: 'Soil mechanics, foundation design, and earth structures analysis.',
        image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        level: 'Intermediate',
        year: 3,
        major: 'Civil'
    },
    {
        id: 18,
        title: 'Mobile App Development with Flutter',
        instructor: 'Angela Yu',
        hours: 65,
        description: 'Build beautiful native apps for iOS and Android using Flutter and Dart.',
        image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        level: 'Intermediate',
        year: 2,
        major: 'Software'
    },
    {
        id: 19,
        title: 'Reinforcement Learning: From Basics to Advanced',
        instructor: 'Dr. Silver',
        hours: 52,
        description: 'Learn Q-learning, policy gradients, and deep reinforcement learning for game AI and robotics.',
        image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        level: 'Advanced',
        year: 5,
        major: 'AI'
    },
    {
        id: 20,
        title: 'Database Design and SQL Mastery',
        instructor: 'Mosh Hamedani',
        hours: 28,
        description: 'Master database design, normalization, and SQL queries for real-world applications.',
        image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        level: 'Beginner',
        year: 2,
        major: 'Software'
    },
    {
        id: 21,
        title: 'Water Resources Engineering',
        instructor: 'Eng. Fatima',
        hours: 38,
        description: 'Hydrology, hydraulics, and water distribution systems design.',
        image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        level: 'Advanced',
        year: 4,
        major: 'Civil'
    },
    {
        id: 22,
        title: 'Technical Communication for Engineers',
        instructor: 'Dr. Brown',
        hours: 20,
        description: 'Develop technical writing, presentation, and documentation skills.',
        image: 'https://images.unsplash.com/photo-1456324504439-367cee3b3c32?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        level: 'Beginner',
        year: 2,
        major: 'Common'
    },
    {
        id: 23,
        title: 'Cybersecurity Fundamentals',
        instructor: 'Jason Dion',
        hours: 36,
        description: 'Learn network security, cryptography, and ethical hacking essentials.',
        image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        level: 'Intermediate',
        year: 3,
        major: 'Software'
    },
    {
        id: 24,
        title: 'Robotics and Autonomous Systems',
        instructor: 'Dr. Kumar',
        hours: 60,
        description: 'Build and program robots using ROS, computer vision, and path planning algorithms.',
        image: 'https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        level: 'Advanced',
        year: 5,
        major: 'AI'
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
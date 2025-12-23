import React, { useState, useRef, useEffect } from 'react';
import { Search, User, Bell, LogOut, Settings, BookMarked, Book, House } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../../services/authService';

const Navbar = () => {
    const navigate = useNavigate();
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const profileRef = useRef(null);
    const user = authService.getCurrentUser();
    const isInstructor = user.role === 'ROLE_INSTRUCTOR';

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setIsProfileOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleLogout = () => {
        authService.logout();
        navigate('/login');
    };

    return (
        <nav className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-50">
            <div className="max-w-[1280px] mx-auto px-4 sm:px-8 h-full flex items-center justify-between">
                {/* Logo/Brand */}
                <div className="flex-shrink-0 flex items-center">
                    <Link to="/Dashboard" className="text-2xl font-bold text-blue-600">E-Learn</Link>
                </div>

                {/* Right Section: Notifications & Profile */}
                <div className="flex items-center space-x-4">
                    <Link
                        to="/Dashboard"
                        className="p-2 text-gray-500 hover:text-blue-600 transition-colors duration-150 rounded-full hover:bg-blue-50"
                        title={isInstructor ? "My Created Courses" : "All Courses"}
                    >
                        <House className="h-6 w-6" />
                    </Link>

                    {isInstructor ? (
                        <Link
                            to="/create-course"
                            className="hidden md:flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30 text-sm font-medium"
                        >
                            <Book className="h-4 w-4" />
                            Create Course
                        </Link>
                    ) : (
                        <Link
                            to="/enrollments"
                            className="p-2 text-gray-500 hover:text-blue-600 transition-colors duration-150 rounded-full hover:bg-blue-50"
                            title="My Enrollments"
                        >
                            <BookMarked className="h-6 w-6" />
                        </Link>
                    )}

                    <div className="relative" ref={profileRef}>
                        <div
                            className={`flex items-center space-x-3 cursor-pointer p-2 rounded-lg transition-colors duration-150 ${isProfileOpen ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
                            onClick={() => setIsProfileOpen(!isProfileOpen)}
                        >
                            <div className={`h-8 w-8 rounded-full flex items-center justify-center ${isInstructor ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'}`}>
                                <User className="h-5 w-5" />
                            </div>
                            <span className="hidden sm:block text-sm font-medium text-gray-700">
                                {isInstructor ? 'Instructor' : 'Student'}
                            </span>
                        </div>

                        {/* Profile Dropdown */}
                        {isProfileOpen && (
                            <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100/50 py-1 ring-1 ring-black/5 transform origin-top-right transition-all duration-200 ease-out z-50">
                                {/* Header Section */}
                                <div className="px-5 py-4 border-b border-gray-50 bg-gradient-to-b from-gray-50/50 to-white rounded-t-2xl">
                                    <div className="flex items-center space-x-3 mb-1">
                                        <div className={`h-10 w-10 rounded-full flex items-center justify-center ${isInstructor ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'}`}>
                                            <User className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-gray-900 leading-tight">{user.sub.split('@')[0]}</p>
                                            <p className="text-xs text-gray-500 font-medium">{isInstructor ? 'Instructor' : 'Student'}</p>
                                        </div>
                                    </div>
                                    <p className="text-xs text-gray-400 mt-2 truncate bg-gray-50 py-1 px-2 rounded-lg border border-gray-100">
                                        {user.sub}
                                    </p>
                                </div>

                                {/* Menu Items */}
                                <div className="p-2 space-y-1">
                                    <button className="w-full text-left px-3 py-2.5 text-sm text-gray-700 font-medium hover:bg-gray-50 hover:text-blue-600 rounded-xl flex items-center transition-all duration-200 group">
                                        <div className="p-2 rounded-lg bg-gray-50 text-gray-400 group-hover:bg-blue-50 group-hover:text-blue-500 mr-3 transition-colors">
                                            <Settings className="w-4 h-4" />
                                        </div>
                                        Settings
                                    </button>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left px-3 py-2.5 text-sm text-gray-700 font-medium hover:bg-red-50 hover:text-red-600 rounded-xl flex items-center transition-all duration-200 group"
                                    >
                                        <div className="p-2 rounded-lg bg-gray-50 text-gray-400 group-hover:bg-red-100 group-hover:text-red-500 mr-3 transition-colors">
                                            <LogOut className="w-4 h-4" />
                                        </div>
                                        Log Out
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

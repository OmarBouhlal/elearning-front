import React from 'react';
import { Search, User, Bell } from 'lucide-react';

const Navbar = () => {
    return (
        <nav className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-50">
            <div className="max-w-[1280px] mx-auto px-4 sm:px-8 h-full flex items-center justify-between">
                {/* Logo/Brand */}
                <div className="flex-shrink-0 flex items-center">
                    <span className="text-2xl font-bold text-blue-600">E-Learn</span>
                </div>

                {/* Search Bar - Hidden on mobile, visible on tablet+ */}
                <div className="hidden md:flex flex-1 max-w-lg mx-8">
                    <div className="relative w-full">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 sm:text-sm transition duration-150 ease-in-out"
                            placeholder="Search for courses..."
                        />
                    </div>
                </div>

                {/* Right Section: Notifications & Profile */}
                <div className="flex items-center space-x-4">
                    <button className="p-2 text-gray-500 hover:text-blue-600 transition-colors duration-150 rounded-full hover:bg-blue-50">
                        <Bell className="h-6 w-6" />
                    </button>

                    <div className="flex items-center space-x-3 cursor-pointer p-2 rounded-lg hover:bg-gray-50 transition-colors duration-150">
                        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                            <User className="h-5 w-5" />
                        </div>
                        <span className="hidden sm:block text-sm font-medium text-gray-700">Student</span>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

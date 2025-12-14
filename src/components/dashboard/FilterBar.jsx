import React, { useState, useRef, useEffect } from 'react';
import { Filter, ChevronDown, GraduationCap, BookOpen, Check, Search } from 'lucide-react';

const FilterBar = ({ selectedYear, setSelectedYear, selectedMajor, setSelectedMajor, searchTerm, setSearchTerm, majors }) => {
    const years = [1, 2, 3, 4, 5];
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleMajorSelect = (major) => {
        setSelectedMajor(major);
        setIsDropdownOpen(false);
    };

    const isYearDisabled = selectedYear <= 2;

    return (
        <div className="relative z-30 bg-white p-6 rounded-2xl shadow-sm border border-gray-100/80 mb-8 transition-all duration-300 hover:shadow-md">

            {/* Search Input */}
            <div className="mb-6 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                    type="text"
                    className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 sm:text-sm"
                    placeholder="Search courses by title, instructor, or keywords..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="flex flex-col md:flex-row md:items-start space-y-6 md:space-y-0 md:space-x-12">

                {/* Year Selection */}
                <div className="flex-1">
                    <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                        <GraduationCap className="w-4 h-4 mr-2 text-blue-500" />
                        Academic Year
                    </label>
                    <div className="flex flex-wrap gap-2">
                        {years.map(year => (
                            <button
                                key={year}
                                onClick={() => setSelectedYear(year)}
                                className={`
                                    relative px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer
                                    ${selectedYear === year
                                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 translate-y-[-1px]'
                                        : 'bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-gray-900 border border-transparent hover:border-gray-200'}
                                `}
                            >
                                Year {year}
                                {selectedYear === year && (
                                    <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1 w-1 h-1 bg-white rounded-full opacity-50"></span>
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Major Selection - Animated Presence */}
                <div className={`
                    flex-1 transition-all duration-500 ease-in-out transform origin-top-left
                    ${!isYearDisabled
                        ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
                        : 'opacity-50 translate-y-2 scale-95 pointer-events-none grayscale blur-[1px]'}
                `}>
                    <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                        <BookOpen className="w-4 h-4 mr-2 text-sky-500" />
                        Specialization Major
                    </label>

                    <div className="relative group" ref={dropdownRef}>
                        {/* Custom Dropdown Trigger */}
                        <button
                            onClick={() => !isYearDisabled && setIsDropdownOpen(!isDropdownOpen)}
                            disabled={isYearDisabled}
                            className={`
                                relative w-full pl-4 pr-10 py-3 text-left text-base border rounded-xl transition-all duration-200
                                ${isDropdownOpen
                                    ? 'border-sky-500 ring-2 ring-sky-500/20 bg-white'
                                    : 'border-gray-200 bg-gray-50 hover:border-gray-300 hover:bg-white'}
                                ${isYearDisabled ? 'cursor-not-allowed bg-gray-100 text-gray-400' : 'cursor-pointer text-gray-900'}
                            `}
                        >
                            <span className="block truncate">
                                {selectedMajor === 'All' ? 'All Majors' : selectedMajor}
                            </span>
                            <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                <ChevronDown
                                    className={`h-5 w-5 text-gray-500 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`}
                                />
                            </span>
                        </button>

                        {/* Custom Dropdown Menu */}
                        {isDropdownOpen && (
                            <div className="absolute z-50 w-full mt-2 bg-white rounded-xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden ring-1 ring-black ring-opacity-5 focus:outline-none animate-in fade-in zoom-in-95 duration-200">
                                <ul className="py-1 max-h-60 overflow-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
                                    <li
                                        onClick={() => handleMajorSelect('All')}
                                        className={`
                                            group flex items-center justify-between px-4 py-3 text-sm cursor-pointer transition-colors duration-150
                                            ${selectedMajor === 'All' ? 'bg-sky-50 text-sky-700' : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'}
                                        `}
                                    >
                                        <span className={`block truncate ${selectedMajor === 'All' ? 'font-medium' : 'font-normal'}`}>
                                            All Majors
                                        </span>
                                        {selectedMajor === 'All' && (
                                            <Check className="w-4 h-4 text-sky-600" />
                                        )}
                                    </li>

                                    {majors.map((major) => (
                                        <li
                                            key={major}
                                            onClick={() => handleMajorSelect(major)}
                                            className={`
                                                group flex items-center justify-between px-4 py-3 text-sm cursor-pointer transition-colors duration-150
                                                ${selectedMajor === major ? 'bg-sky-50 text-sky-700' : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'}
                                            `}
                                        >
                                            <span className={`block truncate ${selectedMajor === major ? 'font-medium' : 'font-normal'}`}>
                                                {major}
                                            </span>
                                            {selectedMajor === major && (
                                                <Check className="w-4 h-4 text-sky-600" />
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    {isYearDisabled && (
                        <p className="mt-2 text-xs text-gray-400 font-medium italic animate-pulse">
                            * Majors are available starting from Year 3
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FilterBar;

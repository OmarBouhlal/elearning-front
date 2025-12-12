import React from 'react';
import { Filter, ChevronDown, GraduationCap, BookOpen } from 'lucide-react';

const FilterBar = ({ selectedYear, setSelectedYear, selectedMajor, setSelectedMajor, majors }) => {
    const years = [1, 2, 3, 4, 5];

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100/80 mb-8 transition-all duration-300 hover:shadow-md">
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
                                    relative px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 outline-none focus:ring-2 focus:ring-blue-500/20
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
                    ${selectedYear > 2
                        ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
                        : 'opacity-50 translate-y-2 scale-95 pointer-events-none grayscale blur-[1px]'}
                `}>
                    <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                        <BookOpen className="w-4 h-4 mr-2 text-sky-500" />
                        Specialization Major
                    </label>

                    <div className="relative group">
                        <select
                            value={selectedMajor}
                            onChange={(e) => setSelectedMajor(e.target.value)}
                            disabled={selectedYear <= 2}
                            className="appearance-none block w-full pl-4 pr-10 py-3 text-base border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 bg-gray-50 text-gray-900 transition-all cursor-pointer hover:border-gray-300 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
                        >
                            <option value="All">All Majors</option>
                            {majors.map(major => (
                                <option key={major} value={major}>{major}</option>
                            ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500 group-hover:text-gray-700 transition-colors">
                            <ChevronDown className="h-5 w-5" />
                        </div>
                    </div>
                    {selectedYear <= 2 && (
                        <p className="mt-2 text-xs text-gray-400 font-medium italic">
                            * Majors are available starting from Year 3
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FilterBar;

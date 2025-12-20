import React, { useState, useEffect } from 'react';
import { Check, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import authenticationService from '../../services/authService'; // Check if user logged in
import courseService from '../../services/courseService';
import enrollmentService from '../../services/enrollmentService';

const CoursePlayer = ({ course }) => {
    const navigate = useNavigate();
    const [enrolled, setEnrolled] = useState(false);
    const [loading, setLoading] = useState(false);
    const [initialCheckDone, setInitialCheckDone] = useState(false);

    useEffect(() => {
        const checkEnrollment = async () => {
            const user = authenticationService.getCurrentUser();
            if (!user) {
                setInitialCheckDone(true);
                return;
            }

            try {
                const myEnrollments = await enrollmentService.getMyEnrollments();
                // Check if course.id is in myEnrollments
                // The API returns EnrollmentResponseDTO which contains 'course' object
                const isEnrolled = myEnrollments.some(e => e.course.id.toString() === course.id.toString());
                setEnrolled(isEnrolled);
            } catch (err) {
                console.error("Failed to check enrollment", err);
            } finally {
                setInitialCheckDone(true);
            }
        };
        checkEnrollment();
    }, [course.id]);

    const handleEnroll = async () => {
        const user = authenticationService.getCurrentUser();
        if (!user) {
            navigate('/login');
            return;
        }

        if (enrolled) return; // Already enrolled

        setLoading(true);
        try {
            await courseService.enrollInCourse(course.id);
            setEnrolled(true);
        } catch (err) {
            console.error("Enrollment failed", err);
            alert("Failed to enroll. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white p-1 rounded-2xl shadow-xl border border-gray-200 relative z-10 w-full lg:w-[380px] lg:fixed lg:right-6 lg:top-40">
            <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-100 group cursor-pointer border border-gray-100">
                <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <svg className="w-6 h-6 text-red-600 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                    </div>
                </div>
                <div className="absolute bottom-3 left-4 right-4 text-white">
                    <p className="text-sm font-medium opacity-90">Preview Document</p>
                </div>
            </div>

            <div className="p-5">
                <div className="flex items-baseline space-x-2 mb-4">
                    <span className="text-2xl font-bold text-gray-900">Free</span>
                    <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">Open Access</span>
                </div>

                <div className="flex gap-2 mb-5">
                    <button
                        onClick={handleEnroll}
                        disabled={loading || enrolled || !initialCheckDone}
                        className={`flex-1 font-bold py-2.5 px-4 rounded-xl transition-colors flex items-center justify-center text-sm shadow-sm
                            ${enrolled
                                ? 'bg-green-100 text-green-700 hover:bg-green-200 border border-green-200 cursor-default'
                                : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/30'
                            } ${loading || !initialCheckDone ? 'opacity-70 cursor-wait' : ''}`}
                    >
                        {(loading || !initialCheckDone) ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : enrolled ? (
                            <>
                                <Check className="w-4 h-4 mr-2" />
                                Enrolled
                            </>
                        ) : (
                            <>
                                <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                Enroll Now
                            </>
                        )}
                    </button>
                    <a
                        href={course.pdfUrl}
                        download
                        className="flex-1 bg-white text-gray-900 font-bold py-2.5 px-4 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors flex items-center justify-center text-sm"
                    >
                        <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        Download PDF
                    </a>
                </div>

                <div className="text-sm text-gray-500 space-y-2">
                    <p className="font-semibold text-gray-900 mb-1.5">This course includes:</p>
                    <div className="flex items-center">
                        <span className="w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center mr-2.5 text-blue-600">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
                        </span>
                        Comprehensive PDF Textbook
                    </div>
                    <div className="flex items-center">
                        <span className="w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center mr-2.5 text-blue-600">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        </span>
                        {course.hours} hours estimated reading time
                    </div>
                    <div className="flex items-center">
                        <span className="w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center mr-2.5 text-blue-600">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                        </span>
                        Downloadable resources
                    </div>
                    <div className="flex items-center">
                        <span className="w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center mr-2.5 text-blue-600">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        </span>
                        Certificate of completion
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CoursePlayer;

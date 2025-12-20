import React, { useState } from 'react';
import Navbar from '../components/dashboard/Navbar';
import Input from '../components/signup/Input';
import Button from '../components/login/Button'; // Assuming we can reuse this
import courseService from '../services/courseService';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, BookPlus } from 'lucide-react';

const CreateCourse = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        courseName: '',
        description: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        if (!formData.courseName.trim() || !formData.description.trim()) {
            setError('Please fill in all fields');
            setIsLoading(false);
            return;
        }

        try {
            await courseService.createCourse(formData);
            navigate('/dashboard'); // Redirect to dashboard to see the new course
        } catch (err) {
            console.error(err);
            setError('Failed to create course. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="pt-24 pb-12 px-4 sm:px-8">
                <div className="max-w-2xl mx-auto">

                    {/* Header */}
                    <div className="mb-8">
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="flex items-center text-gray-500 hover:text-gray-700 transition-colors mb-4"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Dashboard
                        </button>
                        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
                                <BookPlus className="w-6 h-6" />
                            </div>
                            Create New Course
                        </h1>
                        <p className="mt-2 text-gray-600 ml-14">
                            Share your knowledge with the world. Verify your content before publishing.
                        </p>
                    </div>

                    {/* Form Card */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-8">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {error && (
                                    <div className="bg-red-50 text-red-500 p-4 rounded-xl text-sm flex items-center">
                                        <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        {error}
                                    </div>
                                )}

                                <Input
                                    label="Course Title"
                                    name="courseName"
                                    type="text"
                                    placeholder="e.g. Advanced React Patterns"
                                    value={formData.courseName}
                                    onChange={handleChange}
                                />

                                <div className="space-y-1">
                                    <label className="block text-sm font-medium text-gray-700">Description</label>
                                    <textarea
                                        name="description"
                                        rows={6}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all resize-none text-gray-900 placeholder-gray-400"
                                        placeholder="Detailed description of what students will learn..."
                                        value={formData.description}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="pt-4 flex items-center justify-end gap-3">
                                    <button
                                        type="button"
                                        onClick={() => navigate('/dashboard')}
                                        className="px-6 py-2.5 text-gray-700 font-medium hover:bg-gray-50 rounded-xl transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <Button
                                        type="submit"
                                        size="lg"
                                        isLoading={isLoading}
                                        className="min-w-[140px]"
                                    >
                                        Publish Course
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default CreateCourse;

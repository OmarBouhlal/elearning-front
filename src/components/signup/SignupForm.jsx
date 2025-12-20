import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from './Card';
import Input from './Input';
import Button from '../login/Button';
import authService from '../../services/authService';

const SignupForm = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: ''
    });
    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user types
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
        setServerError('');
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
        if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';

        if (!formData.password) newErrors.password = 'Password is required';
        else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';

        if (formData.confirmPassword !== formData.password) newErrors.confirmPassword = 'Passwords do not match';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setServerError('');

        if (validate()) {
            try {
                const registerData = {
                    firstname: formData.firstName,
                    lastname: formData.lastName,
                    email: formData.email,
                    password: formData.password,
                    role: formData.role
                };
                await authService.register(registerData);
                navigate('/login');
            } catch (err) {
                console.error(err);
                setServerError('Registration failed. Please try again.');
            } finally {
                setIsLoading(false);
            }
        } else {
            setIsLoading(false);
        }
    };

    return (
        <Card className="w-full max-w-md mx-auto">
            <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Create an Account</h1>
                <p className="text-gray-600 mt-2">Join us to start your learning journey</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {serverError && (
                    <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm text-center">
                        {serverError}
                    </div>
                )}
                <div className="flex gap-4">
                    <Input
                        label="First Name"
                        name="firstName"
                        type="text"
                        placeholder="John"
                        value={formData.firstName}
                        onChange={handleChange}
                        error={errors.firstName}
                        className="w-1/2"
                    />
                    <Input
                        label="Last Name"
                        name="lastName"
                        type="text"
                        placeholder="Doe"
                        value={formData.lastName}
                        onChange={handleChange}
                        error={errors.lastName}
                        className="w-1/2"
                    />
                </div>

                <Input
                    label="Email Address"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    error={errors.email}
                />

                <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700">I am a</label>
                    <div className="flex gap-4 mt-2">
                        <label className={`flex-1 relative border rounded-xl p-4 cursor-pointer transition-all ${formData.role === 'STUDENT' ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-500' : 'border-gray-200 hover:border-gray-300'}`}>
                            <input
                                type="radio"
                                name="role"
                                value="STUDENT"
                                checked={formData.role === 'STUDENT'}
                                onChange={handleChange}
                                className="sr-only"
                            />
                            <div className="text-center">
                                <span className={`block text-sm font-semibold ${formData.role === 'STUDENT' ? 'text-blue-700' : 'text-gray-900'}`}>Student</span>
                            </div>
                        </label>
                        <label className={`flex-1 relative border rounded-xl p-4 cursor-pointer transition-all ${formData.role === 'INSTRUCTOR' ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-500' : 'border-gray-200 hover:border-gray-300'}`}>
                            <input
                                type="radio"
                                name="role"
                                value="INSTRUCTOR"
                                checked={formData.role === 'INSTRUCTOR'}
                                onChange={handleChange}
                                className="sr-only"
                            />
                            <div className="text-center">
                                <span className={`block text-sm font-semibold ${formData.role === 'INSTRUCTOR' ? 'text-blue-700' : 'text-gray-900'}`}>Instructor</span>
                            </div>
                        </label>
                    </div>
                </div>

                <Input
                    label="Password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    error={errors.password}
                />

                <Input
                    label="Confirm Password"
                    name="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    error={errors.confirmPassword}
                />

                <Button
                    type="submit"
                    className="w-full"
                    size="md"
                    isLoading={isLoading}
                >
                    Sign Up
                </Button>

                <div className="text-center text-sm text-gray-600">
                    Already have an account?{' '}
                    <a href="/login" className="text-blue-500 hover:text-blue-700 font-medium">
                        Log in
                    </a>
                </div>
            </form>
        </Card>
    );
};

export default SignupForm;

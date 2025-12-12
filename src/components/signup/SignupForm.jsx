import React, { useState } from 'react';
import Card from './Card';
import Input from './Input';
import Button from '../login/Button';

const SignupForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});

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

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        if (validate()) {
            console.log('Form submitted:', formData);
            // Handle signup logic here
        }
        setTimeout(() => {
            setIsLoading(false);
        }, 1500);
    };

    return (
        <Card className="w-full max-w-md mx-auto">
            <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Create an Account</h1>
                <p className="text-gray-600 mt-2">Join us to start your learning journey</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
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

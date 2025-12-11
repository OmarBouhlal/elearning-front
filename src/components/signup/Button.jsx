import React from 'react';

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
    const baseStyles = "px-6 py-3 rounded-lg font-medium transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
        primary: "bg-blue-500 text-white hover:bg-blue-700 focus:ring-blue-500",
        secondary: "bg-white text-blue-500 border border-blue-500 hover:bg-blue-50 focus:ring-blue-500",
        ghost: "bg-transparent text-blue-500 hover:bg-blue-50 focus:ring-blue-500",
        fullWidth: "w-full bg-blue-500 text-white hover:bg-blue-700 focus:ring-blue-500"
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;

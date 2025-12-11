import React from 'react';

const Input = ({ label, error, className = '', ...props }) => {
    return (
        <div className={`flex flex-col gap-1 ${className}`}>
            {label && (
                <label className="text-sm font-medium text-gray-700">
                    {label}
                </label>
            )}
            <input
                className={`
          w-full px-3 py-3 rounded-lg border transition-all duration-150 outline-none
          ${error
                        ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                        : 'border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
                    }
          disabled:bg-gray-50 disabled:text-gray-500
        `}
                {...props}
            />
            {error && (
                <span className="text-xs text-red-500">{error}</span>
            )}
        </div>
    );
};

export default Input;

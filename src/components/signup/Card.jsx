import React from 'react';

const Card = ({ children, className = '', ...props }) => {
    return (
        <div
            className={`bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow duration-300 ${className}`}
            {...props}
        >
            {children}
        </div>
    );
};

export default Card;

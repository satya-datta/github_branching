import React from 'react';

const Card = ({ 
  children, 
  className = '', 
  hover = true, 
  padding = 'large',
  ...props 
}) => {
  const baseClasses = 'bg-white rounded-2xl border border-gray-200 transition-all duration-300';
  const hoverClasses = hover ? 'hover:shadow-xl hover:-translate-y-1' : '';
  
  const paddings = {
    small: 'p-4',
    medium: 'p-6',
    large: 'p-8',
    none: '',
  };

  return (
    <div 
      className={`
        ${baseClasses}
        ${hoverClasses}
        ${paddings[padding]}
        shadow-lg
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
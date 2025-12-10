import React from 'react';

const SectionHeading = ({ 
  title, 
  subtitle, 
  centered = true, 
  className = '' 
}) => {
  return (
    <div className={`${centered ? 'text-center' : ''} ${className}`}>
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;
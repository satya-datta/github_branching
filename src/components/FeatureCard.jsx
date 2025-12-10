import React from 'react';

const FeatureCard = ({ 
  icon, 
  title, 
  description, 
  learnMoreHref, 
  className = '',
  variant = 'default'
}) => {
  const variants = {
    default: 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700',
    gradient: 'bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border border-indigo-200 dark:border-indigo-700',
    highlight: 'bg-indigo-600 text-white border border-indigo-600'
  };

  return (
    <div className={`
      ${variants[variant]}
      rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1
      group ${className}
    `}>
      <div className={`
        inline-flex items-center justify-center w-12 h-12 rounded-2xl mb-4
        ${variant === 'highlight' 
          ? 'bg-white/20' 
          : 'bg-indigo-100 dark:bg-indigo-900/30 group-hover:bg-indigo-200 dark:group-hover:bg-indigo-900/50'
        }
        transition-colors
      `}>
        {React.cloneElement(icon, { 
          className: `h-6 w-6 ${
            variant === 'highlight' 
              ? 'text-white' 
              : 'text-indigo-600 dark:text-indigo-400'
          }` 
        })}
      </div>
      
      <h3 className={`
        text-xl font-bold mb-3
        ${variant === 'highlight' 
          ? 'text-white' 
          : 'text-gray-900 dark:text-white'
        }
      `}>
        {title}
      </h3>
      
      <p className={`
        leading-relaxed mb-4
        ${variant === 'highlight' 
          ? 'text-indigo-100' 
          : 'text-gray-600 dark:text-gray-400'
        }
      `}>
        {description}
      </p>
      
      {learnMoreHref && (
        <a 
          href={learnMoreHref}
          className={`
            text-sm font-medium hover:underline transition-colors
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded
            ${variant === 'highlight' 
              ? 'text-indigo-200 hover:text-white' 
              : 'text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300'
            }
          `}
        >
          Learn more →
        </a>
      )}
    </div>
  );
};

export default FeatureCard;
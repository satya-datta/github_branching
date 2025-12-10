import React from 'react';
import { Link } from 'react-router-dom';

const PrimaryButton = ({ 
  children, 
  to, 
  href, 
  onClick, 
  size = 'medium', 
  className = '', 
  disabled = false,
  ...props 
}) => {
  const baseClasses = `
    inline-flex items-center justify-center font-semibold rounded-xl 
    bg-indigo-600 hover:bg-indigo-700 text-white 
    transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2
    dark:focus-visible:ring-offset-gray-900
    disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none
  `;

  const sizes = {
    small: 'px-4 py-2 text-sm',
    medium: 'px-6 py-3 text-base',
    large: 'px-8 py-4 text-lg',
  };

  const classes = `${baseClasses} ${sizes[size]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button 
      className={classes} 
      onClick={onClick} 
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;